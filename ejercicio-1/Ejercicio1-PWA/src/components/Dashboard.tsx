import {useMemo, useState} from "react";
import type { Paciente, Usuario } from "../types";
import BuscadorPacientes from "./SearchPacients";
import FormularioPaciente  from "./FormPacients";
import TablaPacientes from "./TablePacients";

interface Props {
  user: Usuario;
  pacientes: Paciente[];
  pacienteAEditar: Paciente | null;
  onGuardarPaciente: (p: Paciente) => void;
  onEditarPaciente: (p: Paciente) => void;
  onEliminarPaciente: (id: number) => void;
}

export default function Dashboard({
  user,
  pacientes,
  pacienteAEditar,
  onGuardarPaciente,
  onEditarPaciente,
  onEliminarPaciente,
}: Props) {
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const pacientesFiltrados = useMemo(() => {
    const texto = textoBusqueda.trim().toLowerCase();

    if (!texto) return pacientes;

    return pacientes.filter((p) => {
      const nombreCompleto = `${p.nombre} ${p.apellido}`.toLowerCase();

      return (
        nombreCompleto.includes(texto) ||
        p.dni.toLowerCase().includes(texto)
      );
    });
  }, [textoBusqueda, pacientes]);

  return (
    <div style={{ marginTop: 16 }}>
      <h2>Dashboard</h2>

      {user.rol !== "recepcionista" && (
        <section
          style={{
            border: "1px solid #ddd",
            padding: 12,
            marginBottom: 16,
          }}
        >
          <h3>Estadísticas</h3>
          <p>Resumen diario de atención.</p>
        </section>
      )}

      <BuscadorPacientes
        value={textoBusqueda}
        onChange={setTextoBusqueda}
      />

      {user.rol !== "medico" && (
        <FormularioPaciente
          pacienteAEditar={pacienteAEditar}
          onGuardar={onGuardarPaciente}
        />
      )}

      <TablaPacientes
        pacientes={pacientesFiltrados}
        onEditar={onEditarPaciente}
        onEliminar={onEliminarPaciente}
      />

      <div
        style={{
          marginTop: 16,
          border: "1px dashed #aaa",
          padding: 12,
        }}
      >
        <h3>Turnos y resumen diario</h3>
      </div>
    </div>
  );
}