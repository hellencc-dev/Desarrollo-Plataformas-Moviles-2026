const API_KEY = import.meta.env.VITE_OPENCAGE_KEY;

export const getAddress = async (lat: number, lng: number) => {
  if (!API_KEY) {
    throw new Error("Falta la API key de OpenCage en .env");
  }

  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}&language=es&pretty=1`
  );

  if (!response.ok) {
    throw new Error("No se pudo obtener la dirección");
  }

  return await response.json();
};