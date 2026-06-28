import axios from "axios";

// En producción (Railway): VITE_BACKEND_URL=https://tu-backend.railway.app
// En Docker/dev: vacío → usa el proxy de Vite en /api
function resolveBaseURL() {
  let raw = (import.meta.env.VITE_BACKEND_URL || "").trim();
  if (!raw) return "/api";
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  return `${raw.replace(/\/$/, "")}/api`;
}

const baseURL = resolveBaseURL();

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export default api;
