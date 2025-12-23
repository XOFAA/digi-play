import React from "react";
import { Box, Skeleton } from "@mui/material";

export const Top10Card = ({ item, rank, isLast }) => {
  const [loaded, setLoaded] = React.useState(false);

  const thumb =
    item.thumbnailMobile ||
    item.thumbnailDestaque ||
    item.thumbnailDesktop ||
    item.thumbnailDestaque;

  const imgSrc = thumb ? `https://api.digitaleduca.com.vc/public/${thumb}` : "";

  return (
    <Box sx={{ position: "relative", height: { xs: 350, md: 350 }, width: { md: 350, xs: 320 } }}>
      {/* número gigante */}
      <Box
        sx={{
          position: "absolute",
          left: { xs: rank === 1 ? -5 : rank === 10 ? -22 : -10, md: rank === 1 ? 30 : rank === 10 ? 5 : 16 },
          bottom: { xs: -5, md: -18 },
          fontSize: { xs: 90, md: 150 },
          fontWeight: 900,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          color: "rgba(255,255,255,0.92)",
          textShadow: { xs: "0 6px 18px rgba(0,0,0,0.7)", md: "none" },
        
        }}
      >
        {rank}
      </Box>

      {/* poster */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: { xs: 280, md: 280 },
          height: { xs: 320, md: 320 },
          borderRadius: "14px",
          overflow: "hidden",

          transformOrigin: "center bottom",
          transition: "transform 200ms ease, box-shadow 200ms ease, filter 200ms ease",
   
          zIndex: 1,

          "&:hover": {
            transform: { xs: "unset", md: "scale(1.08)" },
            zIndex: 999,
    
            filter: "brightness(1.06)",
          },
        }}
      >
        {/* ✅ Skeleton enquanto a imagem não terminou */}
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
          <img
            src={imgSrc}
            alt={item.titulo || ""}
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
        ) : (
          <Box sx={{ width: "100%", height: "100%", bgcolor: "rgba(255,255,255,0.06)" }} />
        )}
      </Box>
    </Box>
  );
};
