import { useState } from "react";
import type { Usuario } from "../types";

interface Props {
    onLogin: (u: Usuario) => void;
}

export default function LoginForm({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "user@mail.com" && password === "123") {
      setError("");
      onLogin({
        email,
        nombre: "Carlos Castro",
        rol: "recepcionista",
      });
      return;
    }

    if (email === "medico@mail.com" && password === "123") {
      setError("");
      onLogin({
        email,
        nombre: "Hellen",
        rol: "medico",
      });
      return;
    }

    setError("Usuario o contraseña incorrectos");
  };

  return (
    <div style={{ maxWidth: 360, margin: "40px auto", padding: 16 }}>
      <h2>MediCare+ Admin</h2>

      <div style={{ display: "grid", gap: 8 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "crimson", margin: 0 }}>{error}</p>}

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}