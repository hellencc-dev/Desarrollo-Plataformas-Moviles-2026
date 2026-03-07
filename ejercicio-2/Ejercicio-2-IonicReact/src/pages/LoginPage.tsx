import { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { setLoggedTrue } from "../storage/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const history = useHistory();

  const handleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (email === "hellencuenu@mail.com" && password === "0123") {
        setLoggedTrue();
        history.replace("/tabs/visitas");
      } else {
        setShowToast(true);
      }
    }, 1500);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MediCare+</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Ingreso del médico</h2>

        <IonInput
          label="Email"
          labelPlacement="stacked"
          value={email}
          onIonInput={(e) => setEmail(e.detail.value ?? "")}
          placeholder="user@mail.com"
        />

        <IonInput
          label="Contraseña"
          labelPlacement="stacked"
          type={showPass ? "text" : "password"}
          value={password}
          onIonInput={(e) => setPassword(e.detail.value ?? "")}
          placeholder="123"
        />

        <IonButton
          fill="clear"
          size="small"
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
        </IonButton>

        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>

        <IonLoading
          isOpen={loading}
          message="Verificando credenciales..."
        />

        <IonToast
          isOpen={showToast}
          message="Credenciales incorrectas"
          duration={1500}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
}