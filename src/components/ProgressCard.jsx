import { BarChart3 } from "lucide-react";

function ProgressCard({ totals, className = "", isDark = false }) {
  return (
    <aside
      className={`w-full rounded-2xl border p-6 shadow-sm backdrop-blur ${className} ${
        isDark ? "border-slate-700 bg-slate-900/70" : "border-slate-200/80 bg-white/90"
      }`.trim()}
    >
      <div className="mb-3 flex items-center gap-2">
        <BarChart3 className={`h-4 w-4 ${isDark ? "text-indigo-300" : "text-indigo-600"}`} />
        <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          Rendimiento
        </p>
      </div>

      <h3 className={`mb-3 text-lg font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Tu progreso</h3>

      <div className="mb-4 flex items-end gap-2">
        <p className="text-3xl font-black text-sky-600">{Math.round(totals.percentage)}%</p>
        <span className={`mb-1 text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          completado
        </span>
      </div>

      <div className={`h-2.5 w-full rounded-full ${isDark ? "bg-slate-700" : "bg-slate-200"}`}>
        <div
          className="h-2.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all"
          style={{ width: `${totals.percentage}%` }}
        />
      </div>

      <div
        className={`mt-4 rounded-xl px-3 py-2 text-sm ${
          isDark ? "bg-slate-800 text-slate-200" : "bg-slate-50 text-slate-700"
        }`}
      >
        <span className="font-semibold">{totals.completedCredits}</span> de{" "}
        <span className="font-semibold">{totals.totalCredits}</span> creditos completados
      </div>
    </aside>
  );
}

export default ProgressCard;