interface Contacto {
  nombre: string;
  telefono: string;
}

interface Props {
  contactos: Contacto[];
  onDelete: (index: number) => void;
}

function ContactList({ contactos, onDelete }: Props) {
  return (
    <ol>
      {contactos.map((c, index) => (
        <li key={index}>
          {c.nombre} - {c.telefono}
          <button onClick={() => onDelete(index)}>Eliminar</button>
        </li>
      ))}
    </ol>
  );
}

export default ContactList;
