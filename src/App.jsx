import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import LandingPage from "./components/LandingPage";

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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
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

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            isDark={isDark}
            onToggleTheme={handleToggleTheme}
            selectedPensum={selectedPensum}
            onSelectPensum={setSelectedPensum}
            pensumOptions={PENSUM_OPTIONS}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <DashboardPage
            isDark={isDark}
            selectedPensum={selectedPensum}
            setSelectedPensum={setSelectedPensum}
            pensumOptions={PENSUM_OPTIONS}
            totals={totals}
            isLoading={isLoading}
            error={error}
            pensumData={pensumData}
            expandedSemesters={expandedSemesters}
            savedState={savedState}
            onToggleSemester={handleToggleSemester}
            onToggleSubject={handleToggleSubject}
            isSidebarCollapsed={isSidebarCollapsed}
            onSidebarMouseEnter={() => setIsSidebarCollapsed(false)}
            onSidebarMouseLeave={() => setIsSidebarCollapsed(true)}
            onToggleTheme={handleToggleTheme}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

