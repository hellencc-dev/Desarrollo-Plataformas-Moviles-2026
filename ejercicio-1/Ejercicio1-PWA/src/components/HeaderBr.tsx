import type { Usuario } from "../types";

interface Props {
  user: Usuario;
  onOpenPerfil: () => void;
  onLogout: () => void;
}

export default function HeaderBar({
  user,
  onOpenPerfil,
  onLogout,
}: Props) {
  const initials = user.nombre
    .split(" ")
    .map((parte) => parte[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderBottom: "1px solid #ddd",
      }}
    >
      <h3 style={{ margin: 0 }}>MediCare+ Admin</h3>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          onClick={onOpenPerfil}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            overflow: "hidden",
            background: "#0C2340",
            color: "white",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          title="Abrir perfil"
        >
          {user.avatarDataUrl ? (
            <img
              src={user.avatarDataUrl}
              alt="avatar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            initials
          )}
        </div>

        <span>{user.nombre}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}