import { useEffect, useState } from "react";
import type { Paciente } from "../types";

interface Props {
  pacienteAEditar: Paciente | null;
  onGuardar: (p: Paciente) => void;
}

export default function FormularioPaciente({
  pacienteAEditar,
  onGuardar,
}: Props) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (pacienteAEditar) {
      setNombre(pacienteAEditar.nombre);
      setApellido(pacienteAEditar.apellido);
      setDni(pacienteAEditar.dni);
      setTelefono(pacienteAEditar.telefono);
    } else {
      setNombre("");
      setApellido("");
      setDni("");
      setTelefono("");
    }

    setError("");
  }, [pacienteAEditar]);

  const validar = () => {
    if (!nombre.trim() || !apellido.trim() || !dni.trim()) {
      return "Nombre, apellido y DNI son obligatorios";
    }

    if (!/^\d{7,8}$/.test(dni.trim())) {
      return "El DNI debe tener entre 7 y 8 números";
    }

    return "";
  };

  const handleGuardar = () => {
    const mensaje = validar();

    if (mensaje) {
      setError(mensaje);
      return;
    }

    const paciente: Paciente = {
      id: pacienteAEditar ? pacienteAEditar.id : Date.now(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      dni: dni.trim(),
      telefono: telefono.trim(),
    };

    onGuardar(paciente);

    if (!pacienteAEditar) {
      setNombre("");
      setApellido("");
      setDni("");
      setTelefono("");
    }

    setError("");
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
      }}
    >
      <h3>{pacienteAEditar ? "Editar paciente" : "Alta de paciente"}</h3>

      <div style={{ display: "grid", gap: 8 }}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />

        <input
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />

        <input
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <button onClick={handleGuardar} style={{ marginTop: 8 }}>
        Guardar
      </button>
    </div>
  );
}