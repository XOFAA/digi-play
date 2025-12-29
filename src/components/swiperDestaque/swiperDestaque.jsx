import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./swiperDestaque.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { useNavbarColor } from "../../context/NavbarColorContext";
import { FastAverageColor } from "fast-average-color";

export const SwiperDestaque = ({ destaques = [] }) => {
  const { setNavbarColor } = useNavbarColor();
  const facRef = React.useRef(new FastAverageColor());

  const setColorFromImage = React.useCallback(
    async (imgEl) => {
      if (!imgEl) return;

      try {
        const color = await facRef.current.getColorAsync(imgEl, {
          algorithm: "simple",
        });

        const rgba = `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, 0.75)`;
        setNavbarColor(rgba);
      } catch (e) {
        setNavbarColor("rgba(0,0,0,0.0)");
      }
    },
    [setNavbarColor]
  );

  const handleSlideColor = React.useCallback(
    (swiper) => {
      const activeSlide = swiper.slides[swiper.activeIndex];
      const imgEl = activeSlide?.querySelector("img[data-average-color]");
      if (!imgEl) return;

      if (imgEl.complete) {
        setColorFromImage(imgEl);
      } else {
        imgEl.addEventListener("load", () => setColorFromImage(imgEl), { once: true });
      }
    },
    [setColorFromImage]
  );

  React.useEffect(() => {
    return () => facRef.current?.destroy?.();
  }, []);

  // ✅ loop só com 2+ slides (evita warning)
  const enableLoop = destaques.length >= 2;

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4500, disableOnInteraction: false }}
      loop={enableLoop}
      spaceBetween={16}
      slidesPerView={1}
      style={{ width: "100%", overflow: "hidden" }}
      onSwiper={handleSlideColor}
      onSlideChange={handleSlideColor}
    >
      {destaques.map((destaque) => (
        <SwiperSlide key={destaque.id}>
          <Box
            sx={{
              width: "100%",
              aspectRatio: "16 / 9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
              <Box sx={{ px: { xs: 2, md: 6 },position:"absolute"}}>
              {(destaque.instrutores || []).map((instrutorPivot) => (
                <Box
                  key={instrutorPivot?.instrutor?.id ?? instrutorPivot?.id}
                  sx={{
                    bgcolor: "#15ECEC2B",
                    px: 4,
                    py: 1,
                    width: "fit-content",
                    textAlign: "center",
                    borderRadius: "14px",
                    mb: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 12, md: 15, xl: 24 },
                      color: "#fff",
                      fontWeight: "bolder",
                    }}
                  >
                    {instrutorPivot?.instrutor?.nome}
                  </Typography>
                </Box>
              ))}

              <Box sx={{ borderColor: "#fff", width: "70%" }}>
                <Typography
                  variant="titleAlt"
                  component="div"
                  sx={{
                    fontSize: { xs: 20, xl: 110, md: 50, lg: 80 },
                    color: "#fff",
                    lineHeight: { xs: "20px", md: "50px", xl: "100px", lg: "80px" },
                    fontWeight: "bolder",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                  }}
                >
                  {destaque.titulo}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    bgcolor:
                      destaque.tipo === "AULA"
                        ? "#02495DA6"
                        : destaque.tipo === "PALESTRA"
                        ? "#F3A0052B"
                        : destaque.tipo === "PODCAST"
                        ? "#025D13A6"
                        : "#000",
                    px: 1,
                    textAlign: "center",
                    borderRadius: "20px",
                    mt: 2,
                  }}
                >
                  <Typography sx={{ fontSize: { xl: 16, md: 12, xs: 12 }, color: "#fff", p: 1, fontWeight: "bolder" }}>
                    {destaque.tipo}
                  </Typography>
                </Box>

                <Box sx={{ bgcolor: "#15ECEC2B", px: 1, textAlign: "center", borderRadius: "20px", width: "fit-content", mt: 2 }}>
                  <Typography sx={{ fontSize: { xl: 16, md: 12, xs: 12 }, color: "#fff", p: 1, fontWeight: "bolder" }}>
                    {destaque.subcategoria?.nome}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Button
                  sx={{
                    bgcolor: "#FFA40A",
                    height: "auto",
                    color: "#000",
                    fontSize: { lg: 22, xs: 14 },
                    fontWeight: "bolder",
                    gap: 1,
                    borderRadius: "10px",
                  }}
                >
                  <img src="/assets/play.svg" alt="" />
                  Assistir
                </Button>

                <IconButton sx={{ bgcolor: "#333", borderRadius: "10px" }}>
                  <img src="/assets/save.svg" alt="" />
                </IconButton>
              </Box>
            </Box>

            <img
              data-average-color
              crossOrigin="anonymous"
              src={"https://api.digitaleduca.com.vc/public/" + destaque.thumbnailDestaque}
              alt={destaque.titulo || ""}
              loading="eager" fetchpriority="high" decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
