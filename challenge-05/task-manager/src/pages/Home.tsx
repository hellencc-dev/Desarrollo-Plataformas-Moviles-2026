import { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";


export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks([
      { id: 1, title: "Hacer el Challenge 03", done: false },
      { id: 2, title: "Probar en Android", done: false },
    ]);
  }, []);

  const addTask = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: Date.now(),
      title: trimmed,
      done: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: number, checked: boolean) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: checked } : t))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task Manager</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
      </IonContent>
    </IonPage>
  );
}
