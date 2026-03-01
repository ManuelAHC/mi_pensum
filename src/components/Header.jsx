import { BarChart3, BookOpen, ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";

function Header({
  isCollapsed,
  isDark,
  onToggleCollapse,
  onToggleTheme,
  onNavigatePensum,
  onNavigateProgress,
}) {
  const sidebarTone = isDark
    ? "border-slate-800 bg-slate-900 text-slate-100"
    : "border-slate-200 bg-white text-slate-800";

  const controlTone = isDark
    ? "border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-800"
    : "border-slate-200 text-slate-700 hover:bg-slate-50";

  return (
    <aside
      className={`sticky top-0 hidden h-screen flex-col border-r p-4 shadow-2xl transition-all lg:flex ${
        isCollapsed ? "w-20" : "w-72"
      } ${sidebarTone}`}
    >
      <div
        className={`mb-8 flex ${
          isCollapsed ? "flex-col items-center gap-3" : "items-center justify-between gap-2"
        }`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
              isDark ? "bg-sky-500/20 text-sky-300" : "bg-sky-100 text-sky-700"
            }`}
          >
            M
          </div>
          {!isCollapsed && (
            <div>
              <h1 className={`text-base font-bold tracking-wide ${isDark ? "text-white" : "text-slate-900"}`}>
                Mi Pensum
              </h1>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Panel academico</p>
            </div>
          )}
        </div>

        <div className={`flex ${isCollapsed ? "flex-col" : "items-center"} gap-1`}>
          <button
            type="button"
            onClick={onToggleTheme}
            className={`grid h-10 w-10 place-items-center rounded-lg border text-xs transition ${controlTone}`}
            title={isDark ? "Modo claro" : "Modo oscuro"}
            aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={onToggleCollapse}
            className={`grid h-10 w-10 place-items-center rounded-lg border text-xs transition ${controlTone}`}
            aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
            title={isCollapsed ? "Expandir" : "Colapsar"}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <nav className={`flex flex-col gap-2 text-sm ${isCollapsed ? "items-center" : ""}`}>
        <button
          type="button"
          onClick={onNavigatePensum}
          className={`flex items-center rounded-lg font-semibold transition ${
            isCollapsed ? "h-12 w-12 justify-center" : "gap-2 px-3 py-2 text-left"
          } ${isDark ? "bg-sky-500/20 text-sky-200 hover:bg-sky-500/30" : "bg-sky-100 text-sky-700 hover:bg-sky-200"}`}
          title="Ir a Pensum"
        >
          <BookOpen className="h-4 w-4 shrink-0" />
          {!isCollapsed && <span>Pensum</span>}
        </button>

        <button
          type="button"
          onClick={onNavigateProgress}
          className={`flex items-center rounded-lg font-medium transition ${
            isCollapsed ? "h-12 w-12 justify-center" : "gap-2 px-3 py-2 text-left"
          } ${isDark ? "text-slate-200 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-100"}`}
          title="Ir a Progreso"
        >
          <BarChart3 className="h-4 w-4 shrink-0" />
          {!isCollapsed && <span>Progreso</span>}
        </button>
      </nav>

      {!isCollapsed && (
        <div
          className={`mt-auto rounded-xl border p-3 text-xs ${
            isDark ? "border-slate-800 bg-slate-950/40 text-slate-400" : "border-slate-200 bg-slate-50 text-slate-600"
          }`}
        >
          Marca materias y monitorea tu avance en tiempo real.
        </div>
      )}
    </aside>
  );
}

export default Header;