import React from 'react';
import Bouton from '../components/Bouton';
import ProjetCards from '../components/ProjetCards';
import AProposCard from '../components/AProposCard';
import TextEmoji from '../components/TextEmoji';
import LargeEmoji from '../components/LargeEmoji';
import LandingDiorama from '../components/LandingDiorama';
import Titre from '../components/Titre';
import { useAuth } from '../providers/AuthProvider';
import { APP_ROUTES } from '../utils/constants';
import { Text, Box, Heading, Container, Stack, Flex, Button, Link as ChakraLink } from '@chakra-ui/react';
import Footer from '../components/Footer';

function Projets({width}) {
  const {logout, hasLoginData} = useAuth();

	return (
    <div className="accueil">
      <Titre titre="Mes projets"></Titre>
      <Box mb="6vh"></Box>
      <ProjetCards />
      <Box mb="24vh"></Box>
      <Footer />
    </div>
    );
}

export default Projets;