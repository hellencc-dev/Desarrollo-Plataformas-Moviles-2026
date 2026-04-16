import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function Home() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Challenge 08</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Maps App</h2>
        <p>Mapa inteligente usando sensores y funciones nativas.</p>

        <IonButton expand="block" routerLink="/map">
          Ir al mapa
        </IonButton>

        <IonButton expand="block" color="medium" routerLink="/history">
          Ver historial
        </IonButton>
      </IonContent>
    </IonPage>
  );
}