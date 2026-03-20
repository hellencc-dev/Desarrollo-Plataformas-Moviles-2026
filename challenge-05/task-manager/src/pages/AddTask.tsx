import { useState } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonTextarea,
  IonInput,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useTasksContext } from "../context/TasksContext";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const history = useHistory();
  const { addTask } = useTasksContext();

  const handleSave = () => {
    addTask(title, description);
    history.push("/tasks");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>Agregar tarea</IonTitle>
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
          Guardar
        </IonButton>
      </IonContent>
    </IonPage>
  );
}