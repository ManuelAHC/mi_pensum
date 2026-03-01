import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Moon,
  Rocket,
  ShieldCheck,
  Sparkles,
  Sun,
} from "lucide-react";
import { Link } from "react-router-dom";

function LandingPage({ isDark, onToggleTheme }) {
  const panelTone = isDark
    ? "border-slate-700 bg-slate-900/70 text-slate-100"
    : "border-slate-200 bg-white/85 text-slate-900";

  const mutedText = isDark ? "text-slate-300" : "text-slate-600";

  return (
    <div className="min-h-screen animate-fade-in px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                isDark ? "bg-sky-500/20 text-sky-300" : "bg-sky-100 text-sky-700"
              }`}
            >
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className={`text-sm font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Mi Pensum</p>
              <p className={`text-xs ${mutedText}`}>Planifica tu ruta academica</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition ${
              isDark
                ? "border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-800"
                : "border-slate-300 text-slate-700 hover:bg-white"
            }`}
            aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
            title={isDark ? "Modo claro" : "Modo oscuro"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>

        <section className={`rounded-3xl border p-8 shadow-sm backdrop-blur md:p-12 ${panelTone}`}>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-5">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                  isDark ? "bg-sky-500/20 text-sky-200" : "bg-sky-100 text-sky-700"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Plataforma academica
              </span>

              <h1
                className={`text-3xl font-black leading-tight md:text-5xl ${
                  isDark ? "text-slate-100" : "text-slate-900"
                }`}
              >
                Organiza tu carrera con control total de tu pensum.
              </h1>

              <p className={`max-w-xl text-sm md:text-base ${mutedText}`}>
                Marca materias aprobadas, monitorea tus creditos y visualiza tu progreso semestre a semestre
                en una interfaz clara y moderna.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
                >
                  Entrar al panel
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <span className={`inline-flex items-center gap-2 text-xs font-medium ${mutedText}`}>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Sin configuraciones complicadas
                </span>
              </div>
            </div>

            <div
              className={`rounded-2xl border p-6 ${
                isDark ? "border-slate-700 bg-slate-950/50" : "border-slate-200 bg-white/90"
              }`}
            >
              <div className="space-y-4">
                <div
                  className={`rounded-xl border p-4 ${
                    isDark ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-indigo-500" />
                    <p className="text-sm font-semibold">Inicio rapido</p>
                  </div>
                  <p className={`text-xs ${mutedText}`}>
                    Elige tu pensum y empieza a registrar avances en segundos.
                  </p>
                </div>

                <div
                  className={`rounded-xl border p-4 ${
                    isDark ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <p className="text-sm font-semibold">Progreso persistente</p>
                  </div>
                  <p className={`text-xs ${mutedText}`}>
                    Tu avance se guarda automaticamente para continuar cuando quieras.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LandingPage;