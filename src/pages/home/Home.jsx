import { useEffect, useState } from "react";
import { NavBar } from "../../components/navBar/NavBar";
import { SwiperDestaque } from "../../components/swiperDestaque/swiperDestaque";
import api from "../../service/api";
import { Box } from "@mui/material";
import { Top10Rail } from "../../components/top10/Top10Rail";
import { ConteudoRail } from "../../components/conteudoGenerico/ConteudoRail";
import { useNavigate } from "react-router-dom";


export const Home = () => {
  const [destaques, setDestaques] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [palestras, setPalestras] = useState([]);
 const navigate = useNavigate();

  const handleOpenConteudo = (item) => {
    navigate(`/conteudo/${item.id}`); // ou item._id, conforme seu backend
  };

  const getDestaques = () => {
    api
      .get("conteudos?destaque=true&page=1&limit=5")
      .then((response) => {
        const lista = response.data.data || [];
        const somenteComThumbDestaque = lista.filter(
          (item) => item.thumbnailDestaque && item.thumbnailDestaque.trim() !== ""
        );
        setDestaques(somenteComThumbDestaque);
      })
      .catch((error) => console.log(error));
  };

  const getConteudosPorTipo = async () => {
    try {
      const limit = 40; // ajusta conforme quiser

      const [resAulas, resPodcasts, resPalestras] = await Promise.all([
        api.get(`conteudos?tipo=AULA&page=1&limit=${limit}`),
        api.get(`conteudos?tipo=PODCAST&page=1&limit=${limit}`),
        api.get(`conteudos?tipo=PALESTRA&page=1&limit=${limit}`),
      ]);

      setAulas(resAulas.data?.data || []);
      setPodcasts(resPodcasts.data?.data || []);
      setPalestras(resPalestras.data?.data || []);
    } catch (e) {
      console.error("Erro ao buscar conteúdos por tipo:", e);
      setAulas([]);
      setPodcasts([]);
      setPalestras([]);
    }
  };

  useEffect(() => {
    getDestaques();
    getConteudosPorTipo();
  }, []);

  return (
    <>
      <NavBar />

      <Box>
       <SwiperDestaque destaques={destaques} onAssistir={handleOpenConteudo} />
      </Box>

      <Box
        sx={{
          position: "relative",
          backgroundImage: "url(/assets/bgcolor.png)",
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
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.04) 30%, rgba(0,0,0,0.16) 100%)",
            pointerEvents: "none",
          }}
        />

        <Box sx={{ position: "relative" }}>
          <Box sx={{ px: { xs: 2, md: 6 } }}>
            <Top10Rail onOpen={handleOpenConteudo} />

            {/* 1 rail por tipo (sem categoria) */}
        <ConteudoRail title="Aulas" tipo="AULA" items={aulas} onOpen={handleOpenConteudo} />
<ConteudoRail title="Podcasts" tipo="PODCAST" items={podcasts} onOpen={handleOpenConteudo} />
<ConteudoRail title="Palestras" tipo="PALESTRA" items={palestras} onOpen={handleOpenConteudo} />


          </Box>
        </Box>
      </Box>
    </>
  );
};
