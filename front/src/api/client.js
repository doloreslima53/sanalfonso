import axios from "axios";

// En producción (Railway): VITE_BACKEND_URL=https://tu-backend.railway.app
// En Docker/dev: vacío → usa el proxy de Vite en /api
const baseURL = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/api`
  : "/api";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export default api;
