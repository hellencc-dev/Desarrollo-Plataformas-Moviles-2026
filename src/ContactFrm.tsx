import { useState } from "react";

interface Props {
  onAdd: (nombre: string, telefono: string) => void;
}

function ContactForm({ onAdd }: Props) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  const agregar = () => {
    onAdd(nombre, telefono);
    setNombre("");
    setTelefono("");
  };

  return (
    <>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <button onClick={agregar}>Agregar</button>
    </>
  );
}

export default ContactForm;