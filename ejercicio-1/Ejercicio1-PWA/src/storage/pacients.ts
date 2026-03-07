import type {Paciente} from "../types";

const KEY = "medicare_pacientes";

export function getPacientes(): Paciente[] {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Paciente[]) : [];
}

export function savePacientes(pacientes: Paciente[]) {
    localStorage.setItem(KEY, JSON.stringify(pacientes));
}