function SemesterSection({
  semester,
  isExpanded,
  selectedPensum,
  savedState,
  onToggleSemester,
  onToggleSubject,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur">
      <button
        type="button"
        onClick={() => onToggleSemester(semester.semestre)}
        className="flex w-full items-center justify-between bg-slate-50/80 px-5 py-4 text-left transition hover:bg-slate-100"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Bloque academico</p>
          <span className="text-lg font-bold text-slate-900">Semestre {semester.semestre}</span>
        </div>
        <span className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm font-bold text-sky-600">
          {isExpanded ? "-" : "+"}
        </span>
      </button>

      {isExpanded && (
        <div className="space-y-3 p-4 md:p-5">
          {(semester.materias || []).map((subject) => {
            const isCompleted = !!savedState[`${selectedPensum}:${subject.codigo}`];

            return (
              <div
                key={subject.codigo}
                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition ${
                  isCompleted
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">{subject.nombre}</p>
                  <p className="text-xs text-slate-500">
                    {subject.codigo} · {subject.cr} creditos
                  </p>
                </div>

                <label className="flex shrink-0 items-center gap-2 text-xs font-medium text-slate-600">
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
      )}
    </section>
  );
}

export default SemesterSection;