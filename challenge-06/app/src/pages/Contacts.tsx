import { useEffect, useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useCollection from "../hooks/useCollection";
import useNetwork from "../hooks/useNetwork";

type Contact = {
  nombre: string;
  telefono: string;
  email: string;
};

export default function Contacts() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [editando, setEditando] = useState<string | null>(null);

  const { results, getAll, add, update, remove, error } =
    useCollection<Contact>("contacts");

  const { isOnline } = useNetwork();

  useEffect(() => {
    getAll();
  }, []);

  const limpiarFormulario = () => {
    setNombre("");
    setTelefono("");
    setEmail("");
    setEditando(null);
  };

  const guardarContacto = async () => {
    if (!nombre.trim()) return;

    if (editando) {
      await update(editando, { nombre, telefono, email });
    } else {
      await add({ nombre, telefono, email });
    }

    limpiarFormulario();
    await getAll();
  };

  const cargarEdicion = (item: Contact & { id: string }) => {
    setEditando(item.id);
    setNombre(item.nombre);
    setTelefono(item.telefono);
    setEmail(item.email);
  };

  const eliminarContacto = async (id: string) => {
    await remove(id);
    await getAll();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Contacts</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!isOnline && (
          <IonText color="danger">
            <p>Sin conexión. No puedes agregar, editar ni eliminar contactos.</p>
          </IonText>
        )}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonInput
          label="Nombre"
          labelPlacement="stacked"
          value={nombre}
          onIonInput={(e) => setNombre(e.detail.value ?? "")}
        />

        <IonInput
          label="Teléfono"
          labelPlacement="stacked"
          value={telefono}
          onIonInput={(e) => setTelefono(e.detail.value ?? "")}
        />

        <IonInput
          label="Email"
          labelPlacement="stacked"
          value={email}
          onIonInput={(e) => setEmail(e.detail.value ?? "")}
        />

        <IonButton expand="block" disabled={!isOnline} onClick={guardarContacto}>
          {editando ? "Actualizar contacto" : "Agregar contacto"}
        </IonButton>

        {editando && (
          <IonButton expand="block" color="medium" onClick={limpiarFormulario}>
            Cancelar edición
          </IonButton>
        )}

        <IonList>
          {results.length === 0 ? (
            <IonItem>
              <IonLabel>No hay contactos todavía.</IonLabel>
            </IonItem>
          ) : (
            results.map((item) => (
              <IonItem key={item.id}>
                <IonLabel>
                  <h3>{item.nombre}</h3>
                  <p>{item.telefono}</p>
                  <p>{item.email}</p>
                </IonLabel>

                <IonButton
                  disabled={!isOnline}
                  onClick={() => cargarEdicion(item)}
                >
                  Editar
                </IonButton>

                <IonButton
                  color="danger"
                  disabled={!isOnline}
                  onClick={() => eliminarContacto(item.id)}
                >
                  Eliminar
                </IonButton>
              </IonItem>
            ))
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
}