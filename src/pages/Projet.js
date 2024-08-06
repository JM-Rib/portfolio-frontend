import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Titre from '../components/Titre';
import Footer from '../components/Footer';
import useApi from '../hooks/useApi';
import projetApi from '../api/projet'; // Import the API service function
import { Box, Image } from '@chakra-ui/react';

function Projet(props) {
  const { id } = useParams();

  const getProjetApi = useApi(projetApi.getProjet);

  useEffect(() => {
    getProjetApi.request(id);
  }, [id]);

  return (
    <div className="projet">
        {console.log(getProjetApi.data)}
        <Image
          h="18vh"
          w="100%"
          objectFit="cover"
          src='../cardcover.png'
          alt={props.title}
          filter="auto"
        />
        <Box mb="3vh"></Box>
        <Titre fontSize={90}>
          {getProjetApi.data?.nomprojet}
        </Titre>
        <Box mt="6vh" mb="24vh">
          {getProjetApi.data?.description}
        </Box>
      <Footer />
    </div>
  );
}

export default Projet;
