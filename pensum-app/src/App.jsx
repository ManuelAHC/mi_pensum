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
const THEME_KEY = "themePreference";

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function getInitialTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function App() {
  const [selectedPensum, setSelectedPensum] = useState(PENSUM_OPTIONS[0].url);
  const [pensumData, setPensumData] = useState([]);
  const [expandedSemesters, setExpandedSemesters] = useState({});
  const [savedState, setSavedState] = useState(loadSavedState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  const isDark = theme === "dark";

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
  }, [savedState]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.classList.toggle("dark", isDark);
  }, [theme, isDark]);

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

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavigatePensum = () => {
    scrollToElement("pensum-section");
  };

  const handleNavigateProgress = () => {
    const isDesktop = window.innerWidth >= 1024;
    scrollToElement(isDesktop ? "progress-desktop" : "progress-mobile");
  };

  const basePanel = isDark ? "border-slate-700 bg-slate-900/70" : "border-slate-200/80 bg-white/85";

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="flex min-h-screen">
        <Header
          isCollapsed={isSidebarCollapsed}
          isDark={isDark}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
          onToggleTheme={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          onNavigatePensum={handleNavigatePensum}
          onNavigateProgress={handleNavigateProgress}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <header
            className={`border-b px-4 py-4 shadow-sm backdrop-blur lg:hidden ${
              isDark ? "border-slate-700 bg-slate-900/80" : "border-slate-200 bg-white/80"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${
                    isDark ? "bg-sky-500/20 text-sky-300" : "bg-sky-100 text-sky-700"
                  }`}
                >
                  M
                </div>
                <div>
                  <h1 className={`text-base font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                    Mi Pensum
                  </h1>
                  <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    Panel academico
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
                className={`rounded-lg border px-2 py-1 text-xs font-medium ${
                  isDark ? "border-slate-600 text-slate-200" : "border-slate-300 text-slate-700"
                }`}
              >
                {isDark ? "Sol" : "Luna"}
              </button>
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-[1500px] flex-1 items-start gap-8 px-4 py-6 md:px-8 lg:py-8">
            <main id="pensum-section" className="w-full max-w-4xl scroll-mt-6">
              <div id="progress-mobile" className="scroll-mt-6 animate-fade-up" style={{ animationDelay: "60ms" }}>
                <PensumSelectorCard
                  className="mb-4 lg:hidden"
                  value={selectedPensum}
                  options={PENSUM_OPTIONS}
                  onChange={setSelectedPensum}
                  isDark={isDark}
                />
                <ProgressCard className="mb-6 lg:hidden" totals={totals} isDark={isDark} />
              </div>

              <section
                className={`animate-fade-up mb-6 rounded-2xl border p-6 shadow-sm backdrop-blur ${basePanel}`}
                style={{ animationDelay: "110ms" }}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Resumen
                </p>
                <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                  <h2
                    className={`text-2xl font-black tracking-tight md:text-3xl ${
                      isDark ? "text-slate-100" : "text-slate-900"
                    }`}
                  >
                    Pensum academico
                  </h2>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      isDark ? "bg-sky-500/20 text-sky-200" : "bg-sky-100 text-sky-700"
                    }`}
                  >
                    {Math.round(totals.percentage)}% completado
                  </span>
                </div>
              </section>

              {isLoading && (
                <p
                  className={`animate-fade-up rounded-2xl border p-4 shadow-sm ${
                    isDark ? "border-slate-700 bg-slate-900 text-slate-200" : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  Cargando pensum...
                </p>
              )}
              {!isLoading && error && (
                <p
                  className={`animate-fade-up rounded-2xl border p-4 shadow-sm ${
                    isDark ? "border-red-900 bg-red-950/50 text-red-200" : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {error}
                </p>
              )}

              {!isLoading && !error && (
                <div className="space-y-4">
                  {pensumData.map((semester, index) => {
                    const isExpanded = expandedSemesters[semester.semestre] ?? true;

                    return (
                      <div
                        key={semester.semestre}
                        className="animate-fade-up"
                        style={{ animationDelay: `${Math.min(index * 40 + 140, 520)}ms` }}
                      >
                        <SemesterSection
                          semester={semester}
                          isExpanded={isExpanded}
                          selectedPensum={selectedPensum}
                          savedState={savedState}
                          onToggleSemester={handleToggleSemester}
                          onToggleSubject={handleToggleSubject}
                          isDark={isDark}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </main>

            <div
              id="progress-desktop"
              className="sticky top-6 hidden scroll-mt-6 flex-col gap-4 lg:flex animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              <PensumSelectorCard
                className="w-80"
                value={selectedPensum}
                options={PENSUM_OPTIONS}
                onChange={setSelectedPensum}
                isDark={isDark}
              />
              <ProgressCard className="w-80" totals={totals} isDark={isDark} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;