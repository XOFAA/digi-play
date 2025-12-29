import axios from "axios";

const api = axios.create({
  baseURL: "https://api.digitaleduca.com.vc/",
  headers: { "Content-Type": "application/json" },
});

// Anexa token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Opcional: se tomar 401, limpa e joga pro login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("@token");
      localStorage.removeItem("@precisaCompletarPerfil");
      // se quiser: window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
