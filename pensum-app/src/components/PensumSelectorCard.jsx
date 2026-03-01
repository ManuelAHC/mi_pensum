function PensumSelectorCard({ value, options, onChange, className = "" }) {
  return (
    <aside className={`w-full rounded-lg bg-white p-6 shadow-lg ${className}`.trim()}>
      <h3 className="mb-4 text-lg font-bold text-gray-800">Selecciona un Pensum</h3>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded border border-gray-300 p-2"
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