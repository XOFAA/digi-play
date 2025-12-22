import React from "react";
import api from "../../service/api";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export function Top10Rail({ categoriaId, tipo }) {
  const [items, setItems] = React.useState([]);

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
        console.log(res)
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

  <Swiper
  modules={[Navigation]}
  spaceBetween={50} // default (mobile bem pequeno)
  slidesPerView={1.1}
   slidesOffsetAfter={50}   // ✅ dá espaço no final no mobile
  breakpoints={{
    480:  { slidesPerView: 1.8, spaceBetween: 24 },
    768:  { slidesPerView: 2.5, spaceBetween: 36 },
    800:  { slidesPerView: 2.5, spaceBetween: 40 },
    1024: { slidesPerView: 2.7, spaceBetween: 46 },
    1100: { slidesPerView: 3.5, spaceBetween: 54 },
    1280: { slidesPerView: 3.8, spaceBetween: 62 },
    1440: { slidesPerView: 4.6, spaceBetween: 72 },
  }}
>
        {items.map((item, idx) => (
          <SwiperSlide key={item.id ?? idx}>
            <Top10Card
              item={item}
              rank={idx + 1}
              isLast={idx === items.length - 1} // ✅ aqui
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

function Top10Card({ item, rank, isLast }) {
  const thumb =
    item.thumbnailMobile ||
    item.thumbnailDestaque ||
    item.thumbnailDesktop ||
    item.thumbnailDestaque;

  // ajuste se teu backend servir diferente
  const imgSrc = thumb ? `https://api.digitaleduca.com.vc/public/${thumb}` : "";

  return (
    <Box sx={{ position: "relative", height: { xs: 350, md: 350 }, width: {md:350,xs:320},border:2}}>
      {/* número gigante */}
<Box
  sx={{
    position: "absolute",
    left: { xs:rank === 1 ? -5 : rank === 10 ? -22 : -10, md: rank === 1 ? 30 : rank === 10 ? 5 : 16 },
    bottom: { xs: -5, md: -18 },
    fontSize: { xs: 90, md: 150 },
    fontWeight: 900,
    lineHeight: 1,
    userSelect: "none",
    pointerEvents: "none",

    color: "rgba(255,255,255,0.92)",
    textShadow: { xs: "0 6px 18px rgba(0,0,0,0.7)", md: "none" }, // (opcional)
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
          width: { xs:280,md: 280 },
          height: { xs: 320, md: 320 },
          borderRadius: "14px",
          overflow: "hidden",

          // netflix vibe
          transformOrigin: "center bottom",
          transition: "transform 200ms ease, box-shadow 200ms ease, filter 200ms ease",
          boxShadow: "0 10px 30px rgba(0,0,0,0.55)",

          // pra aparecer por cima dos outros quando zoom
          zIndex: 1,

          "&:hover": {
            transform: {xs:"unset",md:"scale(1.08)"},
            zIndex: 999, // sobe acima dos vizinhos
            boxShadow: "0 18px 50px rgba(0,0,0,0.75)",
            filter: "brightness(1.06)",
          },
        }}
      >

        {imgSrc ? (
          <img
            src={imgSrc}
            alt={item.titulo}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
       
          />
        ) : (
          <Box sx={{ width: "100%", height: "100%", bgcolor: "rgba(255,255,255,0.06)" }} />
        )}



        {/* título */}

      </Box>
    </Box>
  );
}
