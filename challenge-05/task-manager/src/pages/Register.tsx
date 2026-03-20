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

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();
  const { register } = useAuthContext();

  const handleRegister = async () => {
    try {
      setError("");
      await register(email, password);
      history.push("/tasks");
    } catch {
      setError("No se pudo registrar el usuario");
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Registro</h2>

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

        <IonButton expand="block" onClick={handleRegister}>
          Crear cuenta
        </IonButton>

        <IonButton fill="clear" expand="block" routerLink="/login">
          Regresar al login
        </IonButton>
      </IonContent>
    </IonPage>
  );
}