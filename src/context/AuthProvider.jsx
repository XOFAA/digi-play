// AuthContext.jsx
import React from "react";
import api from "../service/api";

export const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [loading, setLoading] = React.useState(true);
  const [isAuthed, setIsAuthed] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const checkAuth = React.useCallback(async () => {
    const token = localStorage.getItem("@token");

    if (!token) {
      setIsAuthed(false);
      setUser(null);
      setLoading(false);
      return false; // <-- importante
    }

    try {
      const res = await api.get("/auth/check");
      setIsAuthed(true);
      setUser(res?.data?.user ?? null); // <-- pega o user de verdade
      return true; // <-- importante
    } catch (err) {
      localStorage.removeItem("@token");
      localStorage.removeItem("@precisaCompletarPerfil");
      setIsAuthed(false);
      setUser(null);
      return false; // <-- importante
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = () => {
    localStorage.removeItem("@token");
    localStorage.removeItem("@precisaCompletarPerfil");
    setIsAuthed(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ loading, isAuthed, user, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
