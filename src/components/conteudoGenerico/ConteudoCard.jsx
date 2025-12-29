import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";

export function ConteudoCard({ item, onClick }) {
  const thumb = item?.thumbnailMobile;
  const imgSrc = thumb ? `https://api.digitaleduca.com.vc/public/${thumb}` : "";
  console.log(item)
  const [loaded, setLoaded] = React.useState(false);

  // ✅ importante pra quando trocar o item no mesmo card (swiper recicla)
  React.useEffect(() => {
    setLoaded(false);
  }, [imgSrc]);

  return (
    <Box
      onClick={() => onClick?.(item)}
      sx={{
        cursor: onClick ? "pointer" : "default",
        width: { xs: 280, md: 280 },
      }}
    >
      
      <Box
        sx={{
          width: {xs:"78%",md:"100%"},
          height: { xs: "auto"},
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "rgba(255,255,255,0.06)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          transition: "transform 200ms ease, box-shadow 200ms ease, filter 200ms ease",
          "&:hover": {
            transform: { xs: "unset", md: "scale(1.04)" },
            boxShadow: "0 16px 45px rgba(0,0,0,0.55)",
            filter: "brightness(1.06)",
          },
        }}
      >
        {/* ✅ Skeleton enquanto a thumb carrega */}
        {!loaded && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              width: "100%",
              height: "100%",
              transform: "none",
              bgcolor: "rgba(255,255,255,0.08)",
            }}
          />
        )}

        {imgSrc ? (
          <>
               <img
            src={imgSrc}
            alt={item?.titulo || ""}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: loaded ? 1 : 0,
              transition: "opacity 200ms ease",
            }}
          />
          
             
             </>
     
       
        ) : (
          // se não tem imagem, não deixa skeleton infinito
          <Box sx={{ width: "100%", height: "100%" }} />
        )}
      </Box>
    </Box>
  );
}
