import React from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ConteudoCard } from "./ConteudoCard";

const TIPO_ICON = {
  AULA: "src/assets/icon-aulas.svg",
  PODCAST: "src/assets/icon-podcast.svg",
  PALESTRA: "src/assets/icon-mic.svg",
};

export const ConteudoRail = ({ title, tipo, items = [], onItemClick }) => {
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
          loopAdditionalSlides={20}
          speed={500}
          resistanceRatio={0}
          grabCursor
          watchSlidesProgress
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          breakpoints={{
            0: { slidesPerView: 1.3, spaceBetween: 18 },
            480: { slidesPerView: 2.1, spaceBetween: 18 },
            768: { slidesPerView: 3.2, spaceBetween: 22 },
            1024: { slidesPerView: 4.2, spaceBetween: 26 },
            1280: { slidesPerView: 5.2, spaceBetween: 28 },
            1440: { slidesPerView: 5.5, spaceBetween: 30 },
            2200: { slidesPerView: 7.5, spaceBetween: 30 },
          }}
        >
          {items.map((item, idx) => (
            <SwiperSlide key={item.id ?? idx}>
              <ConteudoCard item={item} onClick={onItemClick} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};
