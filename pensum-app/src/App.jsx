import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import PensumSelectorCard from "./components/PensumSelectorCard";
import ProgressCard from "./components/ProgressCard";
import SemesterSection from "./components/SemesterSection";

const PENSUM_OPTIONS = [
  {
    label: "Informatica",
    key: "informatica",
    url: "/Pensums/pensumInformatica.json",
  },
  {
    label: "Arquitectura",
    key: "arquitectura",
    url: "/Pensums/pensumArquitectura.json",
  },
];

const STORAGE_KEY = "subjectsStateV1";

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function App() {
  const [selectedPensum, setSelectedPensum] = useState(PENSUM_OPTIONS[0].url);
  const [pensumData, setPensumData] = useState([]);
  const [expandedSemesters, setExpandedSemesters] = useState({});
  const [savedState, setSavedState] = useState(loadSavedState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
  }, [savedState]);

  useEffect(() => {
    let isMounted = true;

    async function fetchPensum() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(selectedPensum);
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        if (!isMounted) {
          return;
        }

        const semesters = Array.isArray(data.pensum) ? data.pensum : [];
        setPensumData(semesters);
        setExpandedSemesters(
          semesters.reduce((acc, semester) => {
            acc[semester.semestre] = true;
            return acc;
          }, {})
        );
      } catch (fetchError) {
        if (isMounted) {
          setPensumData([]);
          setError(fetchError.message || "No se pudo cargar el pensum.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPensum();

    return () => {
      isMounted = false;
    };
  }, [selectedPensum]);

  const totals = useMemo(() => {
    let totalCredits = 0;
    let completedCredits = 0;

    for (const semester of pensumData) {
      for (const subject of semester.materias || []) {
        const credits = Number(subject.cr) || 0;
        totalCredits += credits;

        if (savedState[`${selectedPensum}:${subject.codigo}`]) {
          completedCredits += credits;
        }
      }
    }

    const percentage = totalCredits === 0 ? 0 : (completedCredits / totalCredits) * 100;

    return {
      totalCredits,
      completedCredits,
      percentage,
    };
  }, [pensumData, savedState, selectedPensum]);

  const handleToggleSubject = (subjectCode) => {
    const storageKey = `${selectedPensum}:${subjectCode}`;

    setSavedState((prev) => ({
      ...prev,
      [storageKey]: !prev[storageKey],
    }));
  };

  const handleToggleSemester = (semesterNumber) => {
    setExpandedSemesters((prev) => ({
      ...prev,
      [semesterNumber]: !prev[semesterNumber],
    }));
  };

  return (
    <div className="min-h-screen bg-blue-300">
      <div className="flex min-h-screen flex-col">
        <Header />

        <div className="flex flex-1 items-start justify-center gap-8 px-4 py-6 md:px-10">
          <main className="w-full max-w-3xl">
            <PensumSelectorCard
              className="mb-6 lg:hidden"
              value={selectedPensum}
              options={PENSUM_OPTIONS}
              onChange={setSelectedPensum}
            />
            <ProgressCard className="mb-6 lg:hidden" totals={totals} />

            <h2 className="mb-4 text-2xl font-bold text-gray-800">Pensum Academico</h2>

            {isLoading && <p className="rounded-lg bg-white p-4 shadow">Cargando pensum...</p>}
            {!isLoading && error && (
              <p className="rounded-lg bg-red-100 p-4 text-red-700 shadow">{error}</p>
            )}

            {!isLoading && !error && (
              <div className="space-y-4">
                {pensumData.map((semester) => {
                  const isExpanded = expandedSemesters[semester.semestre] ?? true;

                  return (
                    <SemesterSection
                      key={semester.semestre}
                      semester={semester}
                      isExpanded={isExpanded}
                      selectedPensum={selectedPensum}
                      savedState={savedState}
                      onToggleSemester={handleToggleSemester}
                      onToggleSubject={handleToggleSubject}
                    />
                  );
                })}
              </div>
            )}
          </main>

          <div className="sticky top-4 hidden flex-col gap-4 lg:flex">
            <PensumSelectorCard
              className="w-80"
              value={selectedPensum}
              options={PENSUM_OPTIONS}
              onChange={setSelectedPensum}
            />
            <ProgressCard className="w-80" totals={totals} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;