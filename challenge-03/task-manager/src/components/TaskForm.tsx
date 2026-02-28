import { useState } from "react";
import { IonButton, IonInput } from "@ionic/react";

interface Props {
  onAdd: (title: string) => void;
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  const add = () => {
    onAdd(title);
    setTitle("");
  };

  return (
    <>
      <IonInput
        label="Nueva tarea"
        labelPlacement="stacked"
        value={title}
        onIonInput={(e) => setTitle(e.detail.value ?? "")}
        placeholder="Escribe una tarea..."
      />
      <IonButton expand="block" onClick={add}>
        Agregar
      </IonButton>
    </>
  );
}