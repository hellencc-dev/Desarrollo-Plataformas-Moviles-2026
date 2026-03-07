import { useState, useEffect } from 'react'
import './App.css'

import type { Paciente, Usuario } from "./types"
import LoginForm from "./components/LoginForm"
import HeaderBar from "./components/HeaderBr"
import PerfilUsuario from "./components/PerfilUser"
import Dashboard from "./components/Dashboard"

import { clearUser, getUser, setUser } from "./storage/auth"
import { getPacientes, savePacientes } from "./storage/pacients"


function App() {
  const [user, setUserState] = useState<Usuario | null>(null);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacienteAEditar, setPacienteAEditar] = useState<Paciente | null>(null);
  const [showPerfil, setShowPerfil] = useState(false);

  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUserState(savedUser);
    }

    const savedPacientes = getPacientes();
    setPacientes(savedPacientes);
  }, []);

  const handleLogin = (u: Usuario) => {
    setUser(u);
    setUserState(u);
  };

  const handleLogout = () => {
    clearUser();
    setUserState(null);
    setShowPerfil(false);
    setPacienteAEditar(null);
  };

  const handleSavePerfil = (u: Usuario) => {
    setUser(u);
    setUserState(u);
  };

  const handleGuardarPaciente = (p: Paciente) => {
    const next = pacientes.some((x) => x.id === p.id)
      ? pacientes.map((x) => (x.id === p.id ? p : x))
      : [...pacientes, p];

    setPacientes(next);
    savePacientes(next);
    setPacienteAEditar(null);
  };

  const handleEditarPaciente = (p: Paciente) => {
    setPacienteAEditar(p);
  };

  const handleEliminarPaciente = (id: number) => {
    const next = pacientes.filter((p) => p.id !== id);
    setPacientes(next);
    savePacientes(next);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div style={{ padding: 12 }}>
      <HeaderBar
        user={user}
        onOpenPerfil={() => setShowPerfil(true)}
        onLogout={handleLogout}
      />

      {showPerfil && (
        <PerfilUsuario
          user={user}
          onSave={handleSavePerfil}
          onClose={() => setShowPerfil(false)}
        />
      )}

      <Dashboard
        user={user}
        pacientes={pacientes}
        pacienteAEditar={pacienteAEditar}
        onGuardarPaciente={handleGuardarPaciente}
        onEditarPaciente={handleEditarPaciente}
        onEliminarPaciente={handleEliminarPaciente}
      />
    </div>
  )
}

export default App
