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

  React.useEffect(() => {
    setLoaded(false);
  }, [imgSrc]);

  return (
    <Box sx={{ position: "relative", height: { xs: 350, md: 350 }, width: { md: 350, xs: 320 }, userSelect: "none" }}>
      {/* número gigante */}
      <Box
        sx={{
          position: "absolute",
          left: { xs: rank === 1 ? 0 : rank === 10 ? -20 : -5, md: rank === 1 ? -15 : rank === 10 ? -50 : -25 },
          right:0,
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
         right:{xs:45},
          bottom: 0,
          width: { xs: 250, md: 280 },
          height: { xs:"auto"},
          borderRadius: "14px",
          overflow: "hidden",

          userSelect: "none",
          WebkitUserDrag: "none",

          transformOrigin: "center bottom",
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
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: loaded ? 1 : 0,
              transition: "opacity 200ms ease",
              userSelect: "none",
              WebkitUserDrag: "none",
            }}
          />
        ) : (
          <Box sx={{ width: "100%", height: "100%", bgcolor: "rgba(255,255,255,0.06)" }} />
        )}
      </Box>
    </Box>
  );
};
