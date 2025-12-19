
import { useEffect, useState } from "react";
import { NavBar } from "../../components/navBar/NavBar";
import { SwiperDestaque } from "../../components/swiperDestaque/swiperDestaque";
import api from "../../service/api";
import { Box } from "@mui/material";

export const Home = () => {
  
  const [destaques,setDestaques]=useState([])

  const getConteudos =()=>{
api.get('conteudos?destaque=true&page=1&limit=5')
  .then(function (response) {
  
      const lista = response.data.data || [];
    
  const somenteComThumbDestaque = lista.filter(
    (item) => item.thumbnailDestaque && item.thumbnailDestaque.trim() !== ""
  );
  setDestaques(somenteComThumbDestaque)
  console.log(response.data.data)
  })
  .catch(function (error) {
    // manipula os erros
    console.log(error);
  })
}

useEffect(()=>{
  getConteudos()
},[])

  return (
    <>
      <NavBar />
      <Box> {/* 64px é a altura comum do AppBar no desktop */}
        <SwiperDestaque destaques={destaques} />
      </Box>
      <Box sx={{backgroundImage:"url(src/assets/bgcolor.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover",height:"900px"}}>

      </Box>
    </>
  );
};
