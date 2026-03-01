function ProgressCard({ totals, className = "" }) {
  return (
    <aside className={`w-full rounded-lg bg-white p-6 shadow-lg ${className}`.trim()}>
      <h3 className="mb-4 text-lg font-bold text-gray-800">Tu progreso</h3>
      <p className="text-2xl font-bold text-blue-600">{Math.round(totals.percentage)}%</p>
      <div className="mt-2 h-4 w-full rounded-full bg-gray-200">
        <div
          className="h-4 rounded-full bg-blue-600 transition-all"
          style={{ width: `${totals.percentage}%` }}
        />
      </div>
      <p className="mt-4 text-gray-600">
        {totals.completedCredits} de {totals.totalCredits} creditos completados
      </p>
    </aside>
  );
}

export default ProgressCard;