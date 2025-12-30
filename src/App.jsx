import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Home } from "./pages/home/Home";
import { ProtectedRoute } from "./components/protectedRoute/ProtectedRoute";
import { DetalhesConteudos } from "./pages/detalhesConteudo/DetalhesConteudos";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
     <Route path="/conteudo/:id" element={<DetalhesConteudos />} />
      </Route>
    </Routes>
  );
}
