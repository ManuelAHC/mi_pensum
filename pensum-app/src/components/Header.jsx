function Header({
  isCollapsed,
  onToggleCollapse,
  onNavigatePensum,
  onNavigateProgress,
}) {
  return (
    <aside
      className={`sticky top-0 hidden h-screen flex-col bg-white p-4 shadow-md transition-all lg:flex ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="mb-8 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="h-8 w-8 shrink-0 rounded-full bg-blue-500" />
          {!isCollapsed && <h1 className="text-lg font-bold text-gray-800">Mi Pensum</h1>}
        </div>

        <button
          type="button"
          onClick={onToggleCollapse}
          className="rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-600 hover:bg-gray-50"
          aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          title={isCollapsed ? "Expandir" : "Colapsar"}
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>

      <nav className="flex flex-col gap-2 text-sm font-medium text-gray-700">
        <button
          type="button"
          onClick={onNavigatePensum}
          className="rounded-md bg-blue-50 px-3 py-2 text-left text-blue-700 hover:bg-blue-100"
          title="Ir a Pensum"
        >
          {isCollapsed ? "P" : "Pensum"}
        </button>
        <button
          type="button"
          onClick={onNavigateProgress}
          className="rounded-md px-3 py-2 text-left hover:bg-gray-100"
          title="Ir a Progreso"
        >
          {isCollapsed ? "R" : "Progreso"}
        </button>
      </nav>
    </aside>
  );
}

export default Header;