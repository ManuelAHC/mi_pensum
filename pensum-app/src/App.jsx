import { useState } from "react";
import MateriaCard from "./components/MateriaCard";

function App() {
  const [materias, setMaterias] = useState([
    { codigo: "MAT-101", nombre: "Cálculo I" },
    { codigo: "PRO-101", nombre: "Programación I" },
  ]);

  const [aprobadas, setAprobadas] = useState([]);

  function toggleAprobada(codigo) {
    if (aprobadas.includes(codigo)) {
      setAprobadas(aprobadas.filter((m) => m !== codigo));
    } else {
      setAprobadas([...aprobadas, codigo]);
    }
  }

  return (
    <div>
      <h1>Mi Pensum</h1>

      {materias.map((materia) => (
        <MateriaCard
          key={materia.codigo}
          materia={materia}
          aprobadas={aprobadas}
          toggleAprobada={toggleAprobada}
        />
      ))}
    </div>
  );
}

export default App;
