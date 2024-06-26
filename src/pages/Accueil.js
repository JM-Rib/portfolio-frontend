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
      <Box position="relative" width="100%" height={["70vh", "80vh", "92vh", "92vh"]} bottom="20%" >
        <PartyPopper />
        <Box position="absolute" top="0" left="20%" right="0" bottom="20%" display="flex" flexDirection="column" alignItems="left" justifyContent="center" color="white" zIndex="10">
          <Heading size='md' fontFamily="title" fontSize="7xl" textAlign="left">Félicitations!</Heading>
          <Heading size='md' fontFamily="title" fontSize="7xl" textAlign="left">Vous êtes arrivé sur mon site!</Heading>
        </Box>
      </Box>
      <ProjetCards />
      <br />
      Made with <TextEmoji emoji="red_heart" />  in Brest, France <TextEmoji emoji="flag_france" />      
    </div>
    );
}

export default Accueil;