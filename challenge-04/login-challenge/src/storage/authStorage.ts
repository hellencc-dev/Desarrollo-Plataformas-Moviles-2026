const KEY = "logged";

export function setLoggedTrue() {
  localStorage.setItem(KEY, "true");
}

export function isLogged(): boolean {
  return localStorage.getItem(KEY) === "true";
}

export function logout() {
  localStorage.removeItem(KEY);
}