export type Rol = "recepcionista" | "medico";

export interface Usuario{
    email: string;
    nombre: string;
    rol: Rol;
    avatarDataUrl?: string;
}

export interface Paciente {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    telefono: string;
}