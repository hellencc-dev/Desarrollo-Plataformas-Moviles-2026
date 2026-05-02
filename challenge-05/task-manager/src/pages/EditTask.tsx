import { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonInput,
  IonTextarea,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { useTasksContext } from "../context/TasksContext";

export default function EditTask() {
  const { id } = useParams<{ id: string }>();
  const taskId = Number(id);

  const history = useHistory();
  const { getTaskById, updateTask } = useTasksContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const loadTask = async () => {
      const task = await getTaskById(taskId);

      if (task) {
        setTitle(task.title ?? "");
        setDescription(task.description ?? "");
      }
    };

    loadTask();
  }, [taskId, getTaskById]);

  const handleSave = async () => {
    await updateTask(taskId, title, description);
    history.push("/tasks");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>Editar tarea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonInput
          label="Título"
          labelPlacement="stacked"
          value={title}
          onIonInput={(e) => setTitle(e.detail.value ?? "")}
        />

        <IonTextarea
          label="Descripción"
          labelPlacement="stacked"
          value={description}
          onIonInput={(e) => setDescription(e.detail.value ?? "")}
        />

        <IonButton expand="block" onClick={handleSave} style={{ marginTop: "16px" }}>
          Guardar cambios
        </IonButton>
      </IonContent>
    </IonPage>
  );
}