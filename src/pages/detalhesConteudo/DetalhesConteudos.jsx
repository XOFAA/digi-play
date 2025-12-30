import { useEffect, useState } from "react";
import api from "../../service/api";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { NavBar } from "../../components/navBar/NavBar";
import { ConteudoHeader } from "../../components/conteudoheader/ConteudoHeader";

export const DetalhesConteudos = () => {
  const { id } = useParams();
  const [conteudo, setConteudo] = useState(null);
  const [loading, setLoading] = useState(true);


  const getConteudoID = () => {
    api.get("conteudos/" + id).then(function (response) {
      console.log(response)
      setConteudo(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  }
  useEffect(() => {
    getConteudoID()
  }, [])

  return (
    <Box >
      <ConteudoHeader conteudo={conteudo} />
      <Box sx={{ px: { xs: 2, md: 6 } }}>
        <NavBar />
      </Box>


    </Box>
  )
}