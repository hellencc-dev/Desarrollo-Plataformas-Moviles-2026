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
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useRealtimeCollection from "../hooks/useRealtimeCollection";
import useNetwork from "../hooks/useNetwork";

type Task = {
  title: string;
  done: boolean;
};

export default function Tasks() {
  const [title, setTitle] = useState("");
  const [editando, setEditando] = useState<string | null>(null);

  const { results, add, update, deleteItem, error } =
    useRealtimeCollection<Task>("tasks");

  const { isOnline } = useNetwork();

  const limpiarFormulario = () => {
    setTitle("");
    setEditando(null);
  };

  const guardarTarea = async () => {
    if (!title.trim()) return;

    if (editando) {
      await update(editando, { title });
    } else {
      await add({ title, done: false });
    }

    limpiarFormulario();
  };

  const cargarEdicion = (task: Task & { id: string }) => {
    setEditando(task.id);
    setTitle(task.title);
  };

  const eliminarTarea = async (id: string) => {
    await deleteItem(id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!isOnline && (
          <IonText color="danger">
            <p>Sin conexión. No puedes agregar, editar ni eliminar tareas.</p>
          </IonText>
        )}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonInput
          label="Título de la tarea"
          labelPlacement="stacked"
          value={title}
          onIonInput={(e) => setTitle(e.detail.value ?? "")}
        />

        <IonButton expand="block" disabled={!isOnline} onClick={guardarTarea}>
          {editando ? "Actualizar tarea" : "Agregar tarea"}
        </IonButton>

        {editando && (
          <IonButton expand="block" color="medium" onClick={limpiarFormulario}>
            Cancelar edición
          </IonButton>
        )}

        <IonList>
          {results.length === 0 ? (
            <IonItem>
              <IonLabel>No hay tareas todavía.</IonLabel>
            </IonItem>
          ) : (
            results.map((task) => (
              <IonItem key={task.id}>
                <IonLabel>
                  <h3>{task.title}</h3>
                  <p>{task.done ? "Completada" : "Pendiente"}</p>
                </IonLabel>

                <IonButton
                  disabled={!isOnline}
                  onClick={() => update(task.id, { done: !task.done })}
                >
                  {task.done ? "Desmarcar" : "Completar"}
                </IonButton>

                <IonButton
                  disabled={!isOnline}
                  onClick={() => cargarEdicion(task)}
                >
                  Editar
                </IonButton>

                <IonButton
                  color="danger"
                  disabled={!isOnline}
                  onClick={() => eliminarTarea(task.id)}
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