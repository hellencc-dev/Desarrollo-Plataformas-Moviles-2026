import { IonButton, IonContent, IonPage, IonText } from "@ionic/react";
import useNetwork from "../hooks/useNetwork";

export default function Home() {
  const { isOnline, connectionType } = useNetwork();

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Challenge 06</h2>

        <IonText color={isOnline ? "success" : "danger"}>
          <p>
            {isOnline ? "Conectado" : "Sin conexión"} - {connectionType ?? "desconocido"}
          </p>
        </IonText>

        <IonButton expand="block" routerLink="/contacts">
          Contacts
        </IonButton>

        <IonButton expand="block" routerLink="/tasks">
          Tasks
        </IonButton>

        <IonButton expand="block" routerLink="/fruits">
          Fruits
        </IonButton>
      </IonContent>
    </IonPage>
  );
}
