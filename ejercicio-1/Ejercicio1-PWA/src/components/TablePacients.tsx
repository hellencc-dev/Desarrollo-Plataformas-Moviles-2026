import { useState } from "react";
import type { Paciente } from "../types";
import ModalConfirm from "./ModalConfirm";

interface Props {
  pacientes: Paciente[];
  onEditar: (p: Paciente) => void;
  onEliminar: (id: number) => void;
}

export default function TablaPacientes({
  pacientes,
  onEditar,
  onEliminar,
}: Props) {
  const [idAEliminar, setIdAEliminar] = useState<number | null>(null);

  return (
    <>
      <table
        border={1}
        cellPadding={8}
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Nombre completo</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id}>
              <td>
                {p.nombre} {p.apellido}
              </td>
              <td>{p.dni}</td>
              <td>{p.telefono}</td>
              <td>
                <button onClick={() => onEditar(p)}>Editar</button>{" "}
                <button onClick={() => setIdAEliminar(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {idAEliminar !== null && (
        <ModalConfirm
          texto="¿Seguro que deseas eliminar este paciente?"
          onCancelar={() => setIdAEliminar(null)}
          onConfirmar={() => {
            onEliminar(idAEliminar);
            setIdAEliminar(null);
          }}
        />
      )}
    </>
  );
}