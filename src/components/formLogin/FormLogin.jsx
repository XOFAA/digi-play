import React, { useContext, useState } from "react";
import {
    Box,
    Button,
    Link,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import api from "../../service/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export const FormLogin = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleTogglePassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (e) => e.preventDefault();
    const navigate=useNavigate()
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
const { checkAuth } = useContext(AuthContext);
    const clearError = () => {
        if (errorMsg) setErrorMsg("");
    };

const handleEntrar = async (e) => {
  e.preventDefault();
  setErrorMsg("");

  try {
    const response = await api.post("/auth/login", { email, senha });

    const token = response?.data?.access_token;
    if (!token) {
      setErrorMsg("Token não veio na resposta.");
      return;
    }

    localStorage.setItem("@token", token);
    localStorage.setItem(
      "@precisaCompletarPerfil",
      String(response?.data?.precisaCompletarPerfil)
    );

    const ok = await checkAuth(); // <-- valida no /auth/check e seta isAuthed/user
    if (ok) navigate("/home", { replace: true });
    else setErrorMsg("Sessão inválida. Faça login novamente.");
  } catch (error) {
    const msg =
      error?.response?.data?.message ||
      "Não foi possível entrar. Verifique suas credenciais.";
    setErrorMsg(msg);
  }
};

    const inputGlassSx = {
        bgcolor: "transparent",
        my: 2,
        "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "rgba(255,255,255,0.10)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
        },
        "& .MuiOutlinedInput-input": { color: "#fff" },
        "& .MuiInputLabel-root": { color: "#FFFFFF" },
        "& .MuiInputLabel-root.Mui-focused": { color: "#14BADE" },
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#14BADE" },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#14BADE",
        },
        "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.10) inset",
            WebkitTextFillColor: "#fff",
            transition: "background-color 9999s ease-out 0s",
        },
        "& .MuiIconButton-root": { color: "#fff" },
        "& .MuiSvgIcon-root": { color: "#fff" },
    };

    return (
        <Box
            sx={{
                bgcolor: "#002D4069",
                width: { xs: "100%", sm: "55%", md: "45%", xl: "35%" },
                height: { xs: "100%", sm: "55%", md: "55%" },
                backdropFilter: { xs: "blur(1px)", md: "blur(10px)" },
                WebkitBackdropFilter: { xs: "blur(1px)", md: "blur(10px)" },
            }}
        >
            <Box
                component={"form"}
                onSubmit={handleEntrar}
                sx={{
                    px: { xs: 2, sm: 5, md: 10 },
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    flexDirection: "column",
                }}
            >
                <Typography sx={{ color: "#ffff", fontSize: 24, fontWeight: "600" }}>
                    Acesse sua conta
                </Typography>

                <TextField
                    fullWidth
                    label="email"
                    variant="outlined"
                    sx={inputGlassSx}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={clearError}
                />
                {errorMsg && (
                    <Typography sx={{ mt: 1, color: "#ff4d4f", fontWeight: 600 }}>
                        {errorMsg}
                    </Typography>
                )}
                <TextField
                    fullWidth
                    label="senha"
                    variant="outlined"
                    sx={inputGlassSx}
                    type={showPassword ? "text" : "password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    onFocus={clearError}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleTogglePassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* ERRO DO BACK */}


                <Link
                    sx={{
                        color: "#F3A005",
                        fontSize: "16px",
                        fontWeight: "600",
                        textDecoration: "none",
                        mt: 1,
                    }}
                >
                    Esqueci minha senha
                </Link>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: 2,
                        bgcolor: "#F3A005",
                        border: 2,
                        borderColor: "#fff",
                        color: "#05182D",
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "23px",
                        borderRadius: "10px",
                        width: "fit-content",
                    }}
                >
                    ENTRAR{" "}
                    <img
                        src="src/assets/button-entrar.svg"
                        style={{ marginLeft: 10, width: "32px", height: "32px" }}
                    />
                </Button>

                <Typography sx={{ my: 2, fontWeight: "bolder", color: "#fff", fontSize: 16 }}>
                    Primeira vez aqui ?
                </Typography>

                <Button
                    variant="outlined"
                    sx={{
                        fontSize: 18,
                        color: "#fff",
                        borderColor: "#fff",
                        width: "fit-content",
                        borderRadius: "10px",
                        fontWeight: "bolder",
                        border: 2,
                        px: 5,
                    }}
                >
                    CRIE SUA CONTA
                </Button>
            </Box>
        </Box>
    );
};
