function Header({
  isCollapsed,
  onToggleCollapse,
  onNavigatePensum,
  onNavigateProgress,
}) {
  return (
    <aside
      className={`sticky top-0 hidden h-screen flex-col border-r border-slate-800 bg-slate-900 p-4 text-slate-100 shadow-2xl transition-all lg:flex ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="mb-8 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-lg font-bold text-sky-300">
            M
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-base font-bold tracking-wide text-white">Mi Pensum</h1>
              <p className="text-xs text-slate-400">Panel academico</p>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleCollapse}
          className="rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
          aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          title={isCollapsed ? "Expandir" : "Colapsar"}
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>

      <nav className="flex flex-col gap-2 text-sm">
        <button
          type="button"
          onClick={onNavigatePensum}
          className="rounded-lg bg-sky-500/20 px-3 py-2 text-left font-semibold text-sky-200 transition hover:bg-sky-500/30"
          title="Ir a Pensum"
        >
          {isCollapsed ? "P" : "Pensum"}
        </button>
        <button
          type="button"
          onClick={onNavigateProgress}
          className="rounded-lg px-3 py-2 text-left font-medium text-slate-200 transition hover:bg-slate-800"
          title="Ir a Progreso"
        >
          {isCollapsed ? "R" : "Progreso"}
        </button>
      </nav>

      <div className="mt-auto rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-xs text-slate-400">
        {!isCollapsed ? "Marca materias y monitorea tu avance en tiempo real." : ""}
      </div>
    </aside>
  );
}

export default Header;