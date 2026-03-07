import { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { setLoggedTrue } from "../storage/authStorage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleLogin = () => {
    if (email === "user@mail.com" && password === "123") {
      setLoggedTrue();
      history.push("/home");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonInput
          label="Email"
          labelPlacement="stacked"
          value={email}
          onIonInput={(e) => setEmail(e.detail.value ?? "")}
        />

        <IonInput
          label="Password"
          labelPlacement="stacked"
          type="password"
          value={password}
          onIonInput={(e) => setPassword(e.detail.value ?? "")}
        />

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
}