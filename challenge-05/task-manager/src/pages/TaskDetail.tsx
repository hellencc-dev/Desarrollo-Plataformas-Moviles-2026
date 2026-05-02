import { useEffect, useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { useTasksContext, type Task } from "../context/TasksContext";

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const taskId = Number(id);
  const { getTaskById } = useTasksContext();

  const [task, setTask] = useState<Task | undefined>(undefined);

  useEffect(() => {
    const loadTask = async () => {
      const foundTask = await getTaskById(taskId);
      setTask(foundTask);
    };

    loadTask();
  }, [taskId, getTaskById]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>Detalle de tarea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {task ? (
          <>
            <h3>{task.title}</h3>
            <p>{task.description || "Sin descripción"}</p>
            <p>Estado: {task.done ? "Completada" : "Pendiente"}</p>
          </>
        ) : (
          <p>No se encontró la tarea.</p>
        )}
      </IonContent>
    </IonPage>
  );
}