import React from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ConteudoCard } from "./ConteudoCard";

const TIPO_ICON = {
  AULA: "/assets/icon-aulas.svg",
  PODCAST: "/assets/icon-podcast.svg",
  PALESTRA: "/assets/icon-mic.svg",
};

export const ConteudoRail = ({ title, tipo, items = [], onOpen }) => {
  if (!items?.length) return null;

  const MAX_VIEW = 8; // seu breakpoint vai até 7.5
  const enableLoop = items.length >= MAX_VIEW + 2;

  const iconSrc = tipo ? TIPO_ICON[String(tipo).toUpperCase()] : null;

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: { xs: 18, md: 24 } }}>
          {title}
        </Typography>
        {iconSrc && (
          <Box
            component="img"
            src={iconSrc}
            alt=""
            sx={{ width: { xs: 18, md: 22 }, height: { xs: 18, md: 22 }, opacity: 0.95 }}
          />
        )}


      </Box>

      <Box
        sx={{
          position: "relative",
          "& .swiper": { overflow: "visible" },
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: { xs: 18, md: 40 },
            pointerEvents: "none",
            zIndex: 2,

          },
          "&::after": {
            content: '""',
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: { xs: 18, md: 40 },
            pointerEvents: "none",
            zIndex: 2,

          },
        }}
      >
        <Swiper
          modules={[Navigation]}
          loop={enableLoop}
          speed={650}
          resistanceRatio={0.85}
          threshold={8}
          longSwipesRatio={0.25}
          longSwipesMs={250}
          followFinger
          grabCursor
          watchSlidesProgress
          slidesPerView={"auto"}     // ✅ automático
          spaceBetween={0}
          breakpoints={{
            900: { spaceBetween: 70 },
            1280: { spaceBetween: 70 }, // >= 1280px
          }}
        >
          {items.map((item, idx) => (
            <SwiperSlide
              key={item.id ?? idx}
              style={{
                width: "clamp(160px, 12vw, 270px)", // ✅ cresce com a tela
              }}
            >
              <ConteudoCard item={item} onClick={onOpen} />
            </SwiperSlide>
          ))}
        </Swiper>

      </Box>
    </Box>
  );
};
