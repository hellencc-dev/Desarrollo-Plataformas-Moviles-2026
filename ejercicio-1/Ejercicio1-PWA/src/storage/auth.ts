import type {Usuario} from "../types";

const KEY = "medicare_user";

export function getUser(): Usuario | null {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Usuario) : null;
}

export function setUser(user: Usuario) {
    localStorage.setItem(KEY, JSON.stringify(user));
}

export function clearUser() {
    localStorage.removeItem(KEY);
}