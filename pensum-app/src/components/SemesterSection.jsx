function SemesterSection({
  semester,
  isExpanded,
  selectedPensum,
  savedState,
  onToggleSemester,
  onToggleSubject,
}) {
  return (
    <section className="rounded-lg bg-white p-4 shadow">
      <button
        type="button"
        onClick={() => onToggleSemester(semester.semestre)}
        className="mb-4 flex w-full items-center justify-between text-left text-lg font-bold text-gray-800"
      >
        <span>Semestre {semester.semestre}</span>
        <span className="text-blue-500">{isExpanded ? "-" : "+"}</span>
      </button>

      {isExpanded && (
        <div className="space-y-3">
          {(semester.materias || []).map((subject) => {
            const isCompleted = !!savedState[`${selectedPensum}:${subject.codigo}`];

            return (
              <div
                key={subject.codigo}
                className={`flex items-center justify-between rounded-lg border p-4 ${
                  isCompleted ? "border-green-300 bg-green-100" : "border-gray-100 bg-white"
                }`}
              >
                <div>
                  <p className="font-medium text-gray-800">{subject.nombre}</p>
                  <p className="text-sm text-gray-600">
                    Codigo: {subject.codigo} | Creditos: {subject.cr}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => onToggleSubject(subject.codigo)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-500"
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default SemesterSection;