import React from 'react';
import Bouton from '../components/Bouton';
import ProjetCards from '../components/ProjetCards';
import TextEmoji from '../components/TextEmoji';
import LargeEmoji from '../components/LargeEmoji';
import PartyPopper from '../components/PartyPopper';
import { useAuth } from '../providers/AuthProvider';
import { APP_ROUTES } from '../utils/constants';
import { Box, Heading, Container, Stack } from '@chakra-ui/react';

function Accueil() {
  const {logout, hasLoginData} = useAuth();

	return (
    <div className="accueil">
      <Box position="relative" width="100vw" height="100vh">
        <PartyPopper />
        <Box position="absolute" top="0" left="20%" right="0" bottom="0" display="flex" flexDirection="column" alignItems="left" justifyContent="center" color="white" zIndex="10">
          <Heading size='md' fontFamily="title" fontSize="7xl" textAlign="left">Congrats!</Heading>
          <Heading size='md' fontFamily="title" fontSize="7xl" textAlign="left">You made it to my site!</Heading>
        </Box>
      </Box>
      Salut <TextEmoji />      
      <ProjetCards />
      {hasLoginData() ?
        <Bouton nom="Déconnexion" type="onClick" callback={logout} ></Bouton>
      :
        <Bouton nom="Connexion" type="lien" lien={APP_ROUTES.LOGIN}  />
      }
    </div>
    );
}

export default Accueil;