function MateriaCard({ materia, aprobadas, toggleAprobada }) {
  const estaAprobada = aprobadas.includes(materia.codigo);

  return (
    <div>
      <h3>{materia.nombre}</h3>

      <button onClick={() => toggleAprobada(materia.codigo)}>
        {estaAprobada ? "Aprobada" : "Marcar"}
      </button>
    </div>
  );
}

export default MateriaCard;
