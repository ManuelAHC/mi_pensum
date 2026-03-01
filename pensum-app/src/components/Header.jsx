function Header({
  isCollapsed,
  isDark,
  onToggleCollapse,
  onToggleTheme,
  onNavigatePensum,
  onNavigateProgress,
}) {
  return (
    <aside
      className={`sticky top-0 hidden h-screen flex-col border-r p-4 shadow-2xl transition-all lg:flex ${
        isCollapsed ? "w-20" : "w-72"
      } ${
        isDark ? "border-slate-800 bg-slate-900 text-slate-100" : "border-slate-200 bg-white text-slate-800"
      }`}
    >
      <div className="mb-8 flex items-center justify-between gap-2">
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

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onToggleTheme}
            className={`rounded-lg border px-2 py-1 text-xs transition ${
              isDark
                ? "border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-800"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
            title={isDark ? "Modo claro" : "Modo oscuro"}
            aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
          >
            {isDark ? "Sol" : "Luna"}
          </button>
          <button
            type="button"
            onClick={onToggleCollapse}
            className={`rounded-lg border px-2 py-1 text-xs transition ${
              isDark
                ? "border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-800"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
            aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
            title={isCollapsed ? "Expandir" : "Colapsar"}
          >
            {isCollapsed ? ">" : "<"}
          </button>
        </div>
      </div>

      <nav className="flex flex-col gap-2 text-sm">
        <button
          type="button"
          onClick={onNavigatePensum}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left font-semibold transition ${
            isDark ? "bg-sky-500/20 text-sky-200 hover:bg-sky-500/30" : "bg-sky-100 text-sky-700 hover:bg-sky-200"
          }`}
          title="Ir a Pensum"
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 0 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z" />
          </svg>
          {isCollapsed ? "P" : "Pensum"}
        </button>

        <button
          type="button"
          onClick={onNavigateProgress}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left font-medium transition ${
            isDark ? "text-slate-200 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Ir a Progreso"
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18" />
            <path d="M7 14l4-4 3 3 5-6" />
          </svg>
          {isCollapsed ? "R" : "Progreso"}
        </button>
      </nav>

      <div
        className={`mt-auto rounded-xl border p-3 text-xs ${
          isDark ? "border-slate-800 bg-slate-950/40 text-slate-400" : "border-slate-200 bg-slate-50 text-slate-600"
        }`}
      >
        {!isCollapsed ? "Marca materias y monitorea tu avance en tiempo real." : ""}
      </div>
    </aside>
  );
}

export default Header;