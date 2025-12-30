import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { FastAverageColor } from "fast-average-color";
import { useNavbarColor } from "../../context/NavbarColorContext";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export const ConteudoHeader = ({ conteudo, onAssistir, onSalvar }) => {
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

  const formatDuracao = (duracao) => {
    const s = Number(duracao);
    if (!Number.isFinite(s) || s <= 0) return "";

    if (s >= 3600) {
      const h = Math.floor(s / 3600);
      const m = Math.round((s % 3600) / 60);
      return m > 0 ? `${h}h ${m}m` : `${h}h`;
    }

    const m = Math.round(s / 60);
    return `${m} min`;
  };

  const getAno = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    return Number.isNaN(d.getTime()) ? "" : String(d.getFullYear());
  };

  React.useEffect(() => {
    return () => facRef.current?.destroy?.();
  }, []);

  const instrutores = conteudo?.instrutores || [];

  return (
    <Box
      sx={{
        width: "100%",
        // ✅ no mobile precisa ser mais "alto" por causa do texto; no desktop volta pro 16:9
        aspectRatio:"16/9",
        position: "relative",
        overflow: "hidden",
        borderRadius: { xs: 0, md: 2 },
      }}
    >
      {/* overlay pra leitura */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 65%, rgba(0,0,0,0.10) 100%)",
        }}
      />

      {/* conteúdo por cima */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          px: { xs: 2, md: 6 },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
          {/* instrutores */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {instrutores.map((instrutorPivot) => (
              <Box
                key={instrutorPivot?.instrutor?.id ?? instrutorPivot?.id}
                sx={{
                  bgcolor: "#15ECEC2B",
                  px: 2.5,
                  py: 0.8,
                  width: "fit-content",
                  borderRadius: "14px",
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
          </Box>

          {/* título */}
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

          {/* linha meta */}
          <Box
            sx={{
              display: "flex",
              gap: 0.8,
              color: "#fff",
              alignItems: "center",
              mt: 1,
              flexWrap: "wrap",
            }}
          >
            <AccessTimeIcon sx={{ fontSize: 20 }} />
            <Typography sx={{ color: "#fff", fontSize: 17 }}>
              {formatDuracao(conteudo?.duracao)}{" "}
              <span style={{ opacity: 0.9 }}>|</span>{" "}
              {getAno(conteudo?.dataCriacao)}.{" "}
              {instrutores.map((i, idx) => (
                <span
                  key={i?.instrutor?.id ?? idx}
                  style={{ fontWeight: 800, fontSize: 19 }}
                >
                  {i?.instrutor?.nome}
                  {idx < instrutores.length - 1 ? ", " : ""}
                </span>
              ))}
            </Typography>
          </Box>

          {/* ações */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
            <Button
              onClick={() => onAssistir?.(conteudo)}
              sx={{
                bgcolor: "#FFA40A",
                color: "#000",
                fontSize: { lg: 22, xs: 14 },
                fontWeight: "bolder",
                gap: 1,
                borderRadius: "10px",
                px: 5,
                "&:hover": { bgcolor: "#ffb23a" },
              }}
            >
              <img src="/assets/play.svg" alt="" />
              Assistir
            </Button>

            <IconButton
              onClick={() => onSalvar?.(conteudo)}
              sx={{
                bgcolor: "#333",
                borderRadius: "10px",
                "&:hover": { bgcolor: "#444" },
              }}
            >
              <img src="/assets/save.svg" alt="" />
            </IconButton>

            <IconButton
              onClick={() => onSalvar?.(conteudo)}
              sx={{
                bgcolor: "#333",
                borderRadius: "10px",
                "&:hover": { bgcolor: "#444" },
              }}
            >
              <ThumbUpIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>

          {/* descrição (com clamp no mobile pra não estourar o frame) */}
          {!!conteudo?.descricao && (
            <Typography
              sx={{
                color: "#fff",
                mt: 2,
                opacity: 0.95,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: { xs: 3, md: 6 },
                overflow: "hidden",
              }}
            >
              {conteudo?.descricao}
            </Typography>
          )}

          {/* chips */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
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
            objectPosition: "center",
            display: "block",
          }}
        />
      ) : (
        <Box sx={{ width: "100%", height: "100%", bgcolor: "rgba(0,0,0,0.25)" }} />
      )}
    </Box>
  );
};
