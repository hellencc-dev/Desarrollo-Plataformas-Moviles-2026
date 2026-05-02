import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useTasksContext } from "../context/TasksContext";

export default function TasksList() {
  const history = useHistory();
  const { tasks, toggleTask, deleteTask } = useTasksContext();
  const { logout, user } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    history.push("/login");
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Mis tareas</h2>
        <p>{user?.email}</p>

        <IonButton expand="block" routerLink="/tasks/add">
          Agregar tarea
        </IonButton>

        <IonButton color="medium" expand="block" onClick={handleLogout}>
          Logout
        </IonButton>

        <IonList>
          {tasks.map((task) => (
            <IonItem key={task.id}>
              <IonLabel>
                <h3>{task.title}</h3>
                <p>{task.done ? "Completada" : "Pendiente"}</p>
              </IonLabel>

              <IonButton onClick={() => toggleTask(task.id)}>
                {task.done ? "Desmarcar" : "Completar"}
              </IonButton>

              <IonButton routerLink={`/tasks/detail/${task.id}`}>
                Detalle
              </IonButton>

              <IonButton routerLink={`/tasks/edit/${task.id}`}>
                Editar
              </IonButton>

              <IonButton color="danger" onClick={() => deleteTask(task.id)}>
                Eliminar
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}