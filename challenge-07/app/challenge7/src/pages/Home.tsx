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
          <IonTitle>Challenge 07</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Sensores y funciones nativas</h2>

        <IonButton expand="block" routerLink="/network">
          Network
        </IonButton>

        <IonButton expand="block" routerLink="/geolocation">
          Geolocation
        </IonButton>

        <IonButton expand="block" routerLink="/camera">
          Camera
        </IonButton>

        <IonButton expand="block" routerLink="/motion">
          Motion
        </IonButton>

        <IonButton expand="block" routerLink="/device">
          Device
        </IonButton>

        <IonButton expand="block" routerLink="/haptics">
          Haptics
        </IonButton>

        <IonButton expand="block" routerLink="/filesystem">
          Filesystem
        </IonButton>

        <IonButton expand="block" routerLink="/local-notifications">
          Local Notifications
        </IonButton>

        <IonButton expand="block" routerLink="/push-notifications">
          Push Notifications
        </IonButton>
      </IonContent>
    </IonPage>
  );
}