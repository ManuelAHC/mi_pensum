import { BookOpen } from "lucide-react";

function PensumSelectorCard({ value, options, onChange, className = "", isDark = false }) {
  return (
    <aside
      className={`w-full rounded-2xl border p-6 shadow-sm backdrop-blur ${className} ${
        isDark ? "border-slate-700 bg-slate-900/70" : "border-slate-200/80 bg-white/90"
      }`.trim()}
    >
      <div className="mb-3 flex items-center gap-2">
        <BookOpen className={`h-4 w-4 ${isDark ? "text-sky-300" : "text-sky-600"}`} />
        <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          Configuracion
        </p>
      </div>
      <h3 className={`mb-4 text-lg font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
        Selecciona un pensum
      </h3>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-xl border px-3 py-2 text-sm font-medium outline-none transition ${
          isDark
            ? "border-slate-600 bg-slate-800 text-slate-100 focus:border-sky-400"
            : "border-slate-300 bg-slate-50 text-slate-800 focus:border-sky-400 focus:bg-white"
        }`}
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