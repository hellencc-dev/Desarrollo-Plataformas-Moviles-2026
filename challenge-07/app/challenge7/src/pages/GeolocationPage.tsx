import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useGeolocation from "../hooks/useGeolocation";

export default function GeolocationPage() {
  const {
    position,
    error,
    getCurrentLocation,
    startTracking,
    stopTracking,
  } = useGeolocation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Geolocation</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={getCurrentLocation}>
          Obtener ubicación
        </IonButton>

        <IonButton expand="block" onClick={startTracking}>
          Iniciar seguimiento
        </IonButton>

        <IonButton expand="block" color="medium" onClick={stopTracking}>
          Detener seguimiento
        </IonButton>

        {position && (
          <>
            <p>Latitud: {position.latitude}</p>
            <p>Longitud: {position.longitude}</p>
            <p>Precisión: {position.accuracy}</p>
          </>
        )}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
}