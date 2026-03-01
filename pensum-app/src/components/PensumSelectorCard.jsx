function PensumSelectorCard({ value, options, onChange, className = "" }) {
  return (
    <aside
      className={`w-full rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur ${className}`.trim()}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Configuracion</p>
      <h3 className="mb-4 text-lg font-bold text-slate-900">Selecciona un pensum</h3>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white"
      >
        {options.map((option) => (
          <option key={option.key} value={option.url}>
            {option.label}
          </option>
        ))}
      </select>
    </aside>
  );
}

export default PensumSelectorCard;