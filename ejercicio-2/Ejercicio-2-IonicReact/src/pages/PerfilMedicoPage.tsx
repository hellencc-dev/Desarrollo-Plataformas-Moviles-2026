import { useEffect, useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { logout } from "../storage/auth";

interface MedicoPerfil {
  nombre: string;
  avatarDataUrl?: string;
}

const KEY = "medico_perfil";

export default function PerfilMedicoPage() {
  const [perfil, setPerfil] = useState<MedicoPerfil>({
    nombre: "Hellen Cuenu",
  });

  const history = useHistory();

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      setPerfil(JSON.parse(raw));
    }
  }, []);

  const handleFile = (file?: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const updated = {
        ...perfil,
        avatarDataUrl: String(reader.result),
      };
      setPerfil(updated);
      localStorage.setItem(KEY, JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  };

  const initials = perfil.nombre
    .split(" ")
    .map((p) => p[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  const handleLogout = () => {
    logout();
    history.replace("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil médico</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ display: "grid", gap: 16, justifyItems: "center" }}>
          <IonAvatar style={{ width: 90, height: 90 }}>
            {perfil.avatarDataUrl ? (
              <IonImg src={perfil.avatarDataUrl} alt="avatar" />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "#0C2340",
                  color: "white",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: "bold",
                }}
              >
                {initials}
              </div>
            )}
          </IonAvatar>

          <p>{perfil.nombre}</p>

          <IonButton color="danger" onClick={handleLogout}>
            Logout
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}