import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useGameProgress } from "../hooks/useGameProgress";
import { saveProgressToFirebase } from "../firebase/saveProgress";
import { useEffect } from "react";

export default function Home() {
  const history = useHistory();
  const { user, logout } = useAuthContext();

  const {
    missions,
    points,
    progress,
    completedCount,
    resetProgress,
  } = useGameProgress(user?.uid);

  useEffect(() => {
    if (!user) return;

    saveProgressToFirebase(user.uid, user.email || "", points, missions);
  }, [user, points, missions]);

  const handleLogout = async () => {
    await logout();
    history.push("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Parcial 2 Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Bienvenid@</h2>
        <p>{user?.email}</p>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Puntos totales: {points}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p>
              Progreso: {completedCount} / {missions.length}
            </p>
            <IonProgressBar value={progress}></IonProgressBar>
            <p style={{ marginTop: "8px" }}>
              {Math.round(progress * 100)}% completado
            </p>
          </IonCardContent>
        </IonCard>

        {missions.map((mission) => (
          <IonCard key={mission.id}>
            <IonCardHeader>
              <IonCardTitle>{mission.title}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <p>{mission.description}</p>
              <p>Puntos: {mission.points}</p>
              <p>
                Estado:{" "}
                {mission.completed
                  ? "Completada"
                  : mission.unlocked
                    ? "Pendiente"
                    : "Bloqueada"}
              </p>

              {mission.id === 1 && mission.unlocked && (
                <IonButton
                  expand="block"
                  style={{ marginTop: "12px" }}
                  routerLink="/mission-photo"
                >
                  Ir a misión 1
                </IonButton>
              )}

              {mission.id === 2 && mission.unlocked && (
                <IonButton
                  expand="block"
                  style={{ marginTop: "12px" }}
                  routerLink="/mission-distance"
                >
                  Ir a misión 2
                </IonButton>
              )}

              {mission.id === 3 && mission.unlocked && (
                <IonButton
                  expand="block"
                  style={{ marginTop: "12px" }}
                  routerLink="/mission-still"
                >
                  Ir a misión 3
                </IonButton>
              )}
            </IonCardContent>
          </IonCard>
        ))}

        <IonButton expand="block" color="medium" onClick={resetProgress}>
          Reiniciar progreso
        </IonButton>

        <IonButton expand="block" color="danger" onClick={handleLogout}>
          Cerrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
}