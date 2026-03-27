import { useState } from "react";
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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useDexie from "../hooks/useDexie";

type FruitItem = {
  id?: number;
  nombre: string;
  createdAt: string;
};

export default function Fruits() {
  const [nombre, setNombre] = useState("");
  const [editando, setEditando] = useState<number | null>(null);

  const { results, add, update, deleteItem } = useDexie();

  const limpiarFormulario = () => {
    setNombre("");
    setEditando(null);
  };

  const guardarFruta = async () => {
    if (!nombre.trim()) return;

    if (editando !== null) {
      await update(editando, { nombre });
    } else {
      await add(nombre);
    }

    limpiarFormulario();
  };

  const cargarEdicion = (fruit: FruitItem) => {
    setEditando(fruit.id ?? null);
    setNombre(fruit.nombre);
  };

  const eliminarFruta = async (id: number) => {
    await deleteItem(id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Fruits</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonInput
          label="Nombre de la fruta"
          labelPlacement="stacked"
          value={nombre}
          onIonInput={(e) => setNombre(e.detail.value ?? "")}
        />

        <IonButton expand="block" onClick={guardarFruta}>
          {editando !== null ? "Actualizar fruta" : "Agregar fruta"}
        </IonButton>

        {editando !== null && (
          <IonButton expand="block" color="medium" onClick={limpiarFormulario}>
            Cancelar edición
          </IonButton>
        )}

        <IonList>
          {results.length === 0 ? (
            <IonItem>
              <IonLabel>No hay frutas todavía.</IonLabel>
            </IonItem>
          ) : (
            results.map((fruit) => (
              <IonItem key={fruit.id}>
                <IonLabel>
                  <h3>{fruit.nombre}</h3>
                  <p>{fruit.createdAt}</p>
                </IonLabel>

                <IonButton onClick={() => cargarEdicion(fruit)}>
                  Editar
                </IonButton>

                <IonButton
                  color="danger"
                  onClick={() => eliminarFruta(fruit.id!)}
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