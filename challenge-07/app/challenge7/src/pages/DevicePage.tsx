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
import useDevice from "../hooks/useDevice";

export default function DevicePage() {
  const { battery, info, deviceId, loading, error, refresh } = useDevice();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Device</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={refresh}>
          Refrescar
        </IonButton>

        {loading && <p>Cargando...</p>}

        {!loading && (
          <>
            <p>Batería: {battery?.batteryLevel != null ? battery.batteryLevel * 100 : 0}%</p>
            <p>Cargando: {battery?.isCharging ? "Sí" : "No"}</p>
            <p>Modelo: {info?.model}</p>
            <p>Plataforma: {info?.platform}</p>
            <p>Sistema: {info?.operatingSystem}</p>
            <p>Versión OS: {info?.osVersion}</p>
            <p>ID: {deviceId}</p>
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