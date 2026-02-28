import { IonList } from "@ionic/react";
import TaskItem from "./TaskItem";
import type { Task } from "../pages/Home";

interface Props {
  tasks: Task[];
  onToggle: (id: number, checked: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  return (
    <IonList>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </IonList>
  );
}