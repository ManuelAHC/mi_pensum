function ProgressCard({ totals, className = "" }) {
  return (
    <aside
      className={`w-full rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur ${className}`.trim()}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Rendimiento</p>
      <h3 className="mb-3 text-lg font-bold text-slate-900">Tu progreso</h3>

      <div className="mb-4 flex items-end gap-2">
        <p className="text-3xl font-black text-sky-600">{Math.round(totals.percentage)}%</p>
        <span className="mb-1 text-xs font-semibold text-slate-500">completado</span>
      </div>

      <div className="h-2.5 w-full rounded-full bg-slate-200">
        <div
          className="h-2.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all"
          style={{ width: `${totals.percentage}%` }}
        />
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
        <span className="font-semibold">{totals.completedCredits}</span> de{" "}
        <span className="font-semibold">{totals.totalCredits}</span> creditos completados
      </div>
    </aside>
  );
}

export default ProgressCard;