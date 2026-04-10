import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useNetwork from "../hooks/useNetwork";

export default function NetworkPage() {
  const { isOnline, connectionType } = useNetwork();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Network</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>
            <h2>Estado</h2>
            <IonText color={isOnline ? "success" : "danger"}>
              <p>{isOnline ? "Conectado" : "Sin conexión"}</p>
            </IonText>
            <p>Tipo: {connectionType}</p>
          </IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
}