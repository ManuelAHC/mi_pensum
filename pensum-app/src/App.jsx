import { useEffect, useMemo, useState } from "react";

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

  const renderProgressCard = (extraClassName = "") => (
    <aside className={`w-full rounded-lg bg-white p-6 shadow-lg ${extraClassName}`.trim()}>
      <h3 className="mb-4 text-lg font-bold text-gray-800">Tu progreso</h3>
      <p className="text-2xl font-bold text-blue-600">{Math.round(totals.percentage)}%</p>
      <div className="mt-2 h-4 w-full rounded-full bg-gray-200">
        <div
          className="h-4 rounded-full bg-blue-600 transition-all"
          style={{ width: `${totals.percentage}%` }}
        />
      </div>
      <p className="mt-4 text-gray-600">
        {totals.completedCredits} de {totals.totalCredits} creditos completados
      </p>
    </aside>
  );

  const renderPensumCard = (extraClassName = "") => (
    <aside className={`w-full rounded-lg bg-white p-6 shadow-lg ${extraClassName}`.trim()}>
      <h3 className="mb-4 text-lg font-bold text-gray-800">Selecciona un Pensum</h3>
      <select
        value={selectedPensum}
        onChange={(event) => setSelectedPensum(event.target.value)}
        className="w-full rounded border border-gray-300 p-2"
      >
        {PENSUM_OPTIONS.map((option) => (
          <option key={option.key} value={option.url}>
            {option.label}
          </option>
        ))}
      </select>
    </aside>
  );

  return (
    <div className="min-h-screen bg-blue-300">
      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md md:px-10">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-blue-500" />
            <h1 className="text-lg font-bold text-gray-800">Mi Pensum</h1>
          </div>
        </header>

        <div className="flex flex-1 items-start justify-center gap-8 px-4 py-6 md:px-10">
          <main className="w-full max-w-3xl">
            {renderPensumCard("mb-6 lg:hidden")}
            {renderProgressCard("mb-6 lg:hidden")}

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
                    <section key={semester.semestre} className="rounded-lg bg-white p-4 shadow">
                      <button
                        type="button"
                        onClick={() => handleToggleSemester(semester.semestre)}
                        className="mb-4 flex w-full items-center justify-between text-left text-lg font-bold text-gray-800"
                      >
                        <span>Semestre {semester.semestre}</span>
                        <span className="text-blue-500">{isExpanded ? "-" : "+"}</span>
                      </button>

                      {isExpanded && (
                        <div className="space-y-3">
                          {(semester.materias || []).map((subject) => {
                            const isCompleted = !!savedState[`${selectedPensum}:${subject.codigo}`];

                            return (
                              <div
                                key={subject.codigo}
                                className={`flex items-center justify-between rounded-lg border p-4 ${
                                  isCompleted ? "border-green-300 bg-green-100" : "border-gray-100 bg-white"
                                }`}
                              >
                                <div>
                                  <p className="font-medium text-gray-800">{subject.nombre}</p>
                                  <p className="text-sm text-gray-600">
                                    Codigo: {subject.codigo} | Creditos: {subject.cr}
                                  </p>
                                </div>
                                <input
                                  type="checkbox"
                                  checked={isCompleted}
                                  onChange={() => handleToggleSubject(subject.codigo)}
                                  className="h-5 w-5 rounded border-gray-300 text-blue-500"
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            )}
          </main>

          <div className="sticky top-4 hidden flex-col gap-4 lg:flex">
            {renderPensumCard("w-80")}
            {renderProgressCard("w-80")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;