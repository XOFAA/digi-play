import { Box } from "@mui/material";
import { FormLogin } from "../../components/formLogin/FormLogin";

export const Login = () => {



  return (
    <Box sx={{
            position: "relative",
        minHeight: "100vh",
        backgroundImage: "url(src/assets/bgcolor.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
    }}>

   
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: "url(src/assets/bg-login.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",

        // 1) overlay escuro geral
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.65)",
          zIndex: 0,
        },

        // 2) “luz” azul com blur no canto inferior esquerdo
        "&::after": {
          content: '""',
          position: "absolute",
          left: "-200px",
          bottom: "-220px",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, #14BADE80 0%, rgba(20,186,222,0.35) 35%, rgba(20,186,222,0) 70%)",
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
        },
      }}
    >
      {/* conteúdo acima das camadas */}
          <Box sx={{position:"absolute",px: { xs: 2, md: 6 },zIndex:2}}>
     <Box sx={{width:"138px",height:"88px"}}>
            <Box component={"img"} src="src/assets/logo-brilhante.png" style={{width:"100%",height:"100%"}}/>
        </Box>
        </Box>
      <Box sx={{ position: "relative", zIndex: 1}}>
 
   
        <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",width:"100vw",height:"100vh"}}>
             <FormLogin/>
        </Box>
       
      </Box>
    </Box>
     </Box>
  );
};
