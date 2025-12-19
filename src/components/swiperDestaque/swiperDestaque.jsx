import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./swiperDestaque.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";

export const SwiperDestaque = ({ destaques }) => {


  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}

      pagination={{ clickable: true }}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      loop
      spaceBetween={16}
      slidesPerView={1}
      style={{ width: "100%", overflow: "hidden" }}
    >
      {destaques.map((destaque, idx) => (
        <SwiperSlide key={idx}>
          <Box sx={{ width: "100%", aspectRatio: "16 / 9",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Box sx={{ position: "absolute", border:2,mx:"auto",maxWidth:"xl"}}>
              <Box sx={{}}>
                {destaque.instrutores.map((instrutor, index) => (
                  <Box sx={{
                    bgcolor: "#15ECEC2B", px:2,py:1, width: "30%", textAlign: "center", borderRadius: "14px", mb: 2
                  }}>
                    <Typography key={index} sx={{ fontSize: {md:15,xl:24}, color: "#fff", fontWeight: "bolder" }}>{instrutor.instrutor.nome}</Typography>
                  </Box>
                ))}
                <Box sx={{border:3,borderColor:"#fff",width:"70%"}}>
                <Typography
                  variant="titleAlt"
                  component="div"
                  sx={{
                    fontSize: { xl: 110, md: 70,lg:80},
                    color: "#fff",
                    lineHeight: { md: "70px", xl: "100px",lg:"80px"},
                    fontWeight: "bolder",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3, // ✅ máximo 3 linhas
                    overflow: "hidden",
                  }}
                >
                  {destaque.titulo}
                </Typography>
                    </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box sx={{
                  bgcolor: destaque.tipo ==="AULA"? "#02495DA6" : destaque.tipo==="PALESTRA"? "#F3A0052B": destaque.tipo==="PODCAST" ? "#025D13A6":"#000", px: 1, textAlign: "center", borderRadius: "20px", width: "8%", mt: 2
                }}>
                  <Typography sx={{ fontSize: {xl:16,md:12}, color: "#fff", p: 1, fontWeight: "bolder" }}>{destaque.tipo}</Typography>
                </Box>
                <Box sx={{
                  bgcolor: "#15ECEC2B", px: 1, textAlign: "center", borderRadius: "20px", width: "8%a", mt: 2
                }}>
                  <Typography sx={{ fontSize: {xl:16,md:12}, color: "#fff", p: 1, fontWeight: "bolder" }}>{destaque.subcategoria.nome}</Typography>
                </Box>
              </Box>
              <Box sx={{display:"flex",alignItems:"center",gap:2,mt:3}}>
       <Button sx={{ bgcolor: "#FFA40A", width:"20%",height:"auto",color: "#000", fontSize: 22, fontWeight: "bolder", gap: 1, borderRadius: "10px" }}><img src="/src/assets/play.svg" />Assistir</Button>
              <IconButton sx={{bgcolor:"#333",borderRadius:"10px",width:"65px",height:"65px"}}>
                <img src="src/assets/save.svg"/>
              </IconButton>
              </Box>
       
            </Box>
            <img
              src={"http://localhost:3000/public/" + destaque.thumbnailDestaque}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
