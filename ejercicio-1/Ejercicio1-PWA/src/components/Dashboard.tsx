import type { Paciente, Usuario } from "../types";

interface Props {
  user: Usuario;
  pacientes: Paciente[];
  pacienteAEditar: Paciente | null;
  onGuardarPaciente: (p: Paciente) => void;
  onEditarPaciente: (p: Paciente) => void;
  onEliminarPaciente: (id: number) => void;
}

export default function Dashboard({ user }: Props) {
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
          <p>Sección visible para personal medico</p>
        </section>
      )}

      {user.rol !== "medico" && (
        <section style={{border: "1px solid #ddd", padding: 12, marginBottom: 16}}>
          <h3>Formulario de alta de pacientes</h3>
        </section>
      )}

      <section style={{ border: "1px solid #ddd", padding: 12 }}>
        <h3>Resumen diario</h3>
      </section>
    </div>
  );
}