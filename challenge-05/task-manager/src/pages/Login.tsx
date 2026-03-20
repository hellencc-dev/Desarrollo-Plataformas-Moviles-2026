import { useState } from "react";
import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();
  const { login } = useAuthContext();

  const handleLogin = async () => {
    try {
      setError("");
      await login(email, password);
      history.push("/tasks");
    } catch {
      setError("No se pudo iniciar sesión");
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Login</h2>

        <IonInput
          placeholder="Email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value ?? "")}
        />

        <IonInput
          type="password"
          placeholder="Password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value ?? "")}
        />

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton expand="block" onClick={handleLogin}>
          Ingresar
        </IonButton>

        <IonButton fill="clear" expand="block" routerLink="/register">
          Registrarse
        </IonButton>
      </IonContent>
    </IonPage>
  );
}