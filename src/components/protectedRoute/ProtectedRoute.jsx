import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";


export function ProtectedRoute() {
  const { loading, isAuthed } = React.useContext(AuthContext);

  if (loading) return null; // ou um Loader bonitinho
  if (!isAuthed) return <Navigate to="/" replace />;

  return <Outlet />;
}
