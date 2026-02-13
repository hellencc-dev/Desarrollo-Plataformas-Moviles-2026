import { useEffect, useState } from "react";
import Loader from "./Loader";
import ContactForm from "./ContactFrm";
import ContactList from "./ContactLst";

interface Contacto {
  nombre: string;
  telefono: string;
}

function ContactsPage() {
  const [loading, setLoading] = useState(true);
  const [contactos, setContactos] = useState<Contacto[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setContactos([
        { nombre: "Laura", telefono: "3001234567" },
        { nombre: "Carlos", telefono: "3107654321" },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

const agregarContacto = (nombre: string, telefono: string) => {
  const nuevo = { nombre, telefono };
  console.log("Se agregó contacto:", nuevo); 

  setContactos((prev) => [...prev, nuevo]);
};

const eliminarContacto = (index: number) => {
  const eliminado = contactos[index];
  console.log("Se eliminó contacto:", eliminado);

  setContactos((prev) => prev.filter((_, i) => i !== index));
};


  if (loading) return <Loader />;

  return (
    <>
      <h2>Contactos</h2>
      <ContactForm onAdd={agregarContacto} />
      <ContactList contactos={contactos} onDelete={eliminarContacto} />
    </>
  );
}

export default ContactsPage;
