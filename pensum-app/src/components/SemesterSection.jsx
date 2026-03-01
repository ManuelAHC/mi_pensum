import { useLayoutEffect, useRef, useState } from "react";

function SemesterSection({
  semester,
  isExpanded,
  selectedPensum,
  savedState,
  onToggleSemester,
  onToggleSubject,
  isDark = false,
}) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    if (!contentRef.current) {
      return;
    }

    const nextHeight = contentRef.current.scrollHeight;
    setContentHeight(nextHeight);
  }, [isExpanded, semester.materias?.length]);

  return (
    <section
      className={`overflow-hidden rounded-2xl border shadow-sm backdrop-blur ${
        isDark ? "border-slate-700 bg-slate-900/70" : "border-slate-200/80 bg-white/90"
      }`}
    >
      <button
        type="button"
        onClick={() => onToggleSemester(semester.semestre)}
        className={`flex w-full items-center justify-between px-5 py-4 text-left transition ${
          isDark ? "bg-slate-800/70 hover:bg-slate-800" : "bg-slate-50/80 hover:bg-slate-100"
        }`}
      >
        <div className="flex items-center gap-2">
          <svg
            className={`h-4 w-4 ${isDark ? "text-sky-300" : "text-sky-600"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2l4 7h-8l4-7z" />
            <path d="M5 10h14v10H5z" />
          </svg>
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Bloque academico
            </p>
            <span className={`text-lg font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
              Semestre {semester.semestre}
            </span>
          </div>
        </div>
        <span
          className={`rounded-md border px-2 py-1 text-sm font-bold ${
            isDark ? "border-slate-600 bg-slate-900 text-sky-300" : "border-slate-200 bg-white text-sky-600"
          }`}
        >
          {isExpanded ? "-" : "+"}
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isExpanded ? `${contentHeight}px` : "0px",
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="animate-fade-in space-y-3 p-4 md:p-5">
          {(semester.materias || []).map((subject, index) => {
            const isCompleted = !!savedState[`${selectedPensum}:${subject.codigo}`];

            return (
              <div
                key={subject.codigo}
                style={{ animationDelay: `${Math.min(index * 35, 260)}ms` }}
                className={`stagger-item flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition ${
                  isCompleted
                    ? isDark
                      ? "border-emerald-500/40 bg-emerald-500/10"
                      : "border-emerald-200 bg-emerald-50"
                    : isDark
                    ? "border-slate-700 bg-slate-900 hover:border-slate-600"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="min-w-0">
                  <p className={`truncate font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                    {subject.nombre}
                  </p>
                  <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {subject.codigo} · {subject.cr} creditos
                  </p>
                </div>

                <label
                  className={`flex shrink-0 items-center gap-2 text-xs font-medium ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => onToggleSubject(subject.codigo)}
                    className="h-5 w-5 rounded border-slate-300 text-sky-500"
                  />
                  {isCompleted ? "Aprobada" : "Pendiente"}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SemesterSection;