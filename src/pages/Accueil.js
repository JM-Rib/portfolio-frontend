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

function Accueil({width}) {
  const {logout, hasLoginData} = useAuth();

	return (
    <div className="accueil">
      <Box position="relative" width="100%" height={["90vh", "80vh", "92vh", "92vh"]} >
        <LandingDiorama width={width} />
        <Box position="absolute" top="0" left={["7%","7%","7%","20%"]} right="0" bottom="20%" display="flex" flexDirection="column" alignItems="left" justifyContent="center" color="white" zIndex="10">
          <Heading size='md' fontFamily="title" fontSize={["4xl","5xl","6xl","7xl"]} textAlign="left">Félicitations!</Heading>
          <Heading size='md' fontFamily="title" fontSize={["4xl","5xl","6xl","7xl"]} textAlign="left">Vous êtes arrivé sur mon site!</Heading>
          <Heading size='md' mt="4" fontFamily="heading" fontSize={["md","xl","2xl","2xl"]} textAlign="left">Explorez mon portfolio d'Expériences Numériques</Heading>
          <Box display="flex" mt="4" fontSize={["sm","sm","md","xl"]} alignItems="left">
            <ChakraLink href="/projects" _hover={{ textDecoration: 'none' }}>
              <Button colorScheme="purple" >
                Consulter
              </Button>
            </ChakraLink>
          </Box>
        </Box>
      </Box>
      <Titre>A propos de moi</Titre>
      <Box mb={[4,4,0,0]}></Box>
      <AProposCard description={"Étudiant de M1 Informatique, je développe de nombreuses expériences dans le web. J'aime créer des sites intuitifs et ludiques à travers de la 3D, de la vidéo ou du son. "} />
      <Box mb="150"></Box>
      En m'appuyant sur ces éléments, je crée des expériences immersives sur mesure. Je porte un œil tout particulier au design de ces plateformes pour faciliter leur prise en main. J'aime également suivre l'actualité informatique et rester informé des dernières tendances et innovations du secteur.
      <Box mb="150"></Box>
      <Titre>Mes projets</Titre>
      <ProjetCards />
      <Box mb="175"></Box>
      <Footer />
    </div>
    );
}

export default Accueil;