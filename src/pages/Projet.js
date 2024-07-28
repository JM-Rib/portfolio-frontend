import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Titre from '../components/Titre';
import Footer from '../components/Footer';
import useApi from '../hooks/useApi';
import projetApi from '../api/projet'; // Import the API service function
import { Box } from '@chakra-ui/react';

function Projet(props) {
  const { id } = useParams();

  const getProjetApi = useApi(projetApi.getProjet);

  useEffect(() => {
    getProjetApi.request(id);
  }, [id]);

  return (
    <div className="projet">
        {console.log(getProjetApi.data)}
        <Titre>
          {getProjetApi.data?.nomprojet}
        </Titre>
        <Box mb="6vh"></Box>
          {getProjetApi.data?.description}
        <Box mb="24vh"></Box>
      <Footer />
    </div>
  );
}

export default Projet;
