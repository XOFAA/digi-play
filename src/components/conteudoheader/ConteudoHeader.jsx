import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { FastAverageColor } from "fast-average-color";
import { useNavbarColor } from "../../context/NavbarColorContext";

export const ConteudoHeader = ({
  conteudo,
  onAssistir,
  onSalvar,
  height = { xs: "56vh", md: "auto" }, // pode ajustar
}) => {
  const { setNavbarColor } = useNavbarColor();
  const facRef = React.useRef(new FastAverageColor());

  const thumb =
    conteudo?.thumbnailDestaque ||
    conteudo?.thumbnailDesktop ||
    conteudo?.thumbnailMobile;

  const imgSrc = thumb ? `https://api.digitaleduca.com.vc/public/${thumb}` : "";

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

  React.useEffect(() => {
    return () => facRef.current?.destroy?.();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height,
        minHeight: { xs: 360, md: 420 },
        position: "relative",
        overflow: "hidden",
        borderRadius: { xs: 0, md: 2 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* overlay pra melhorar leitura */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.10) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* conteúdo textual por cima */}
      <Box
        sx={{
          position: "absolute",
          zIndex: 2,
          left: 0,
          right: 0,
          px: { xs: 2, md: 6 },
        }}
      >
        {/* instrutores */}
        {(conteudo?.instrutores || []).map((instrutorPivot) => (
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

        {/* título */}
        <Box sx={{ borderColor: "#fff", width: { xs: "100%", md: "70%" } }}>
          <Typography
            variant="titleAlt"
            component="div"
            sx={{
              fontSize: { xs: 22, md: 50, lg: 80, xl: 110 },
              color: "#fff",
              lineHeight: { xs: "26px", md: "50px", lg: "80px", xl: "100px" },
              fontWeight: "bolder",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
            }}
          >
            {conteudo?.titulo}
          </Typography>
        </Box>

        {/* chips */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Box
            sx={{
              bgcolor:
                conteudo?.tipo === "AULA"
                  ? "#02495DA6"
                  : conteudo?.tipo === "PALESTRA"
                  ? "#F3A0052B"
                  : conteudo?.tipo === "PODCAST"
                  ? "#025D13A6"
                  : "#000",
              px: 1,
              textAlign: "center",
              borderRadius: "20px",
              mt: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: { xl: 16, md: 12, xs: 12 },
                color: "#fff",
                p: 1,
                fontWeight: "bolder",
              }}
            >
              {conteudo?.tipo}
            </Typography>
          </Box>

          {conteudo?.subcategoria?.nome && (
            <Box
              sx={{
                bgcolor: "#15ECEC2B",
                px: 1,
                textAlign: "center",
                borderRadius: "20px",
                width: "fit-content",
                mt: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xl: 16, md: 12, xs: 12 },
                  color: "#fff",
                  p: 1,
                  fontWeight: "bolder",
                }}
              >
                {conteudo?.subcategoria?.nome}
              </Typography>
            </Box>
          )}
        </Box>

        {/* ações */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
          <Button
            onClick={() => onAssistir?.(conteudo)}
            sx={{
              bgcolor: "#FFA40A",
              height: "auto",
              color: "#000",
              fontSize: { lg: 22, xs: 14 },
              fontWeight: "bolder",
              gap: 1,
              borderRadius: "10px",
              "&:hover": { bgcolor: "#ffb23a" },
            }}
          >
            <img src="/assets/play.svg" alt="" />
            Assistir
          </Button>

          <IconButton
            onClick={() => onSalvar?.(conteudo)}
            sx={{ bgcolor: "#333", borderRadius: "10px", "&:hover": { bgcolor: "#444" } }}
          >
            <img src="/assets/save.svg" alt="" />
          </IconButton>
        </Box>
      </Box>

      {/* imagem de fundo */}
      {imgSrc ? (
        <img
          data-average-color
          crossOrigin="anonymous"
          src={imgSrc}
          alt={conteudo?.titulo || ""}
          loading="eager"
          decoding="async"
          onLoad={(e) => setColorFromImage(e.currentTarget)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <Box sx={{ width: "100%", height: "100%", bgcolor: "rgba(0,0,0,0.25)" }} />
      )}
    </Box>
  );
};
