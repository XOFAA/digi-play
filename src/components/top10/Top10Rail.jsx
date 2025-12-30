import React from "react";
import api from "../../service/api";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Top10Card } from "./Top10Card";

export function Top10Rail({ categoriaId, tipo }) {
  const [items, setItems] = React.useState([]);
const looped = Math.min(items.length, 10);
  React.useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const params = new URLSearchParams();
        if (categoriaId) params.set("categoriaId", String(categoriaId));
        if (tipo) params.set("tipo", String(tipo));

        const url = params.toString()
          ? `conteudos/top10?${params.toString()}`
          : "conteudos/top10";

        const res = await api.get(url);
        if (!mounted) return;
        setItems(res.data?.data || []);
      } catch (e) {
        console.error("[Top10Rail] erro:", e);
        if (mounted) setItems([]);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [categoriaId, tipo]);

  if (!items?.length) return null;

  const enableLoop = items.length >= 10;

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
        <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: { xs: 28, md: 44 } }}>
          TOP 10
        </Typography>
        <Typography sx={{ color: "#cfcfcf", fontWeight: 700, fontSize: 12, letterSpacing: "3px" }}>
          HOJE
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          "& .swiper": { overflow: "visible" },

          // fade esquerdo (um pouco maior por causa do rank)
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: { xs: 28, md: 70 },
            pointerEvents: "none",
            zIndex: 2,
        
          },

          // fade direito
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

  // 🔥 evita teletransporte no loop + slidesPerView="auto"
  loopedSlides={looped}
  loopAdditionalSlides={0}

  // mesmas configs do rail que ficou perfeito
  speed={650}
  resistanceRatio={0.85}
  threshold={8}
  longSwipesRatio={0.25}
  longSwipesMs={250}
  followFinger
  grabCursor
  watchSlidesProgress

  slidesPerView={"auto"}
  spaceBetween={0}



  // ✅ garante que drag funcione quando você começa em cima do card (principalmente se tem botão/link)
  touchStartPreventDefault={false}
  preventClicks={true}
  preventClicksPropagation={true}
>
  {items.map((item, idx) => (
    <SwiperSlide
      key={item.id ?? idx}
      style={{ width: "clamp(300px, 18vw, 520px)" }}
    >
      <Top10Card item={item} rank={idx + 1} isLast={idx === items.length - 1} />
    </SwiperSlide>
  ))}
</Swiper>

      </Box>
    </Box>
  );
}
