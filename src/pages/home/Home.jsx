import { useEffect, useState } from "react";
import { NavBar } from "../../components/navBar/NavBar";
import { SwiperDestaque } from "../../components/swiperDestaque/swiperDestaque";
import api from "../../service/api";
import { Box, Container } from "@mui/material";
import { useNavbarColor } from "../../context/NavbarColorContext";
import { Top10Rail } from "../../components/top10/Top10Rail";

export const Home = () => {
  const [destaques, setDestaques] = useState([]);
  const { navbarColor } = useNavbarColor();

  const getConteudos = () => {
    api.get("conteudos?destaque=true&page=1&limit=5")
      .then((response) => {
        const lista = response.data.data || [];
        const somenteComThumbDestaque = lista.filter(
          (item) => item.thumbnailDestaque && item.thumbnailDestaque.trim() !== ""
        );
        setDestaques(somenteComThumbDestaque);
        console.log("teste",response)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getConteudos();
  }, []);

  return (
    <>
      <NavBar />

      <Box>
        <SwiperDestaque destaques={destaques} />
      </Box>

      {/* Seção abaixo do Swiper com efeito */}
<Box
  sx={{
    position: "relative",
    backgroundImage: "url(src/assets/bgcolor.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "900px",
    overflow: "hidden",
  }}
>
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      bgcolor: navbarColor
        ? navbarColor.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[^)]+\)/, "rgba($1, $2, $3, 0.65)")
        : "rgba(0,0,0,0.10)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      backgroundImage:
        "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.04) 30%, rgba(0,0,0,0.16) 100%)",
      pointerEvents: "none",
    }}
  />

  <Box sx={{ position: "relative" }}>
    <Container maxWidth="xl">
  <Top10Rail/>
    </Container>

  </Box>
</Box>

    </>
  );
};
