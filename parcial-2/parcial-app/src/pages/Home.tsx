import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Home() {
  const history = useHistory();
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    history.push("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Bienvenid@</h2>
        <p>{user?.email}</p>

        <IonButton expand="block" color="danger" onClick={handleLogout}>
          Cerrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
}