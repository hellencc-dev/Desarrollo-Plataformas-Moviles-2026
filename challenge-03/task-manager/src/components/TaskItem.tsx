import { IonButton, IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import type { Task } from "../pages/Home";

interface Props {
  task: Task;
  onToggle: (id: number, checked: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <IonItem>
      <IonCheckbox
        slot="start"
        checked={task.done}
        onIonChange={(e) => onToggle(task.id, e.detail.checked)}
      />

      <IonLabel>
        {task.done ? `✅ ${task.title}` : task.title}
      </IonLabel>

      <IonButton slot="end" color="danger" onClick={() => onDelete(task.id)}>
        Eliminar
      </IonButton>
    </IonItem>
  );
}