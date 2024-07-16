import React from 'react';
import Bouton from '../components/Bouton';
import ProjetCards from '../components/ProjetCards';
import TextEmoji from '../components/TextEmoji';
import LargeEmoji from '../components/LargeEmoji';
import LandingDiorama from '../components/LandingDiorama';
import { useAuth } from '../providers/AuthProvider';
import { APP_ROUTES } from '../utils/constants';
import { Text, Box, Heading, Container, Stack, Flex, Button, Link as ChakraLink } from '@chakra-ui/react';

function Accueil({width}) {
  const {logout, hasLoginData} = useAuth();

	return (
    <div className="accueil">
      <Box position="relative" width="100%" height={["70vh", "80vh", "92vh", "92vh"]} >
        <LandingDiorama width={width} />
        <Box position="absolute" top="0" left={["7%","7%","7%","20%"]} right="0" bottom="20%" display="flex" flexDirection="column" alignItems="left" justifyContent="center" color="white" zIndex="10">
          <Heading size='md' fontFamily="title" fontSize={["4xl","5xl","6xl","7xl"]} textAlign="left">Votre voix compte!</Heading>
          <Heading size='md' fontFamily="title" fontSize={["4xl","5xl","6xl","7xl"]} textAlign="left">N'agissez pas au dernier moment</Heading>
          <Heading size='md' mt="4" fontFamily="heading" fontSize={["md","xl","2xl","2xl"]} textAlign="left">Nous vous proposons des mails de rappel pour aller voter le 30 Juin et 7 Juillet 2024</Heading>
          <Box display="flex" mt="4" fontSize={["sm","sm","md","xl"]} alignItems="left">
            <ChakraLink href="/inscription" _hover={{ textDecoration: 'none' }}>
              <Button colorScheme="purple" >
                Je m'inscris
              </Button>
            </ChakraLink>
          </Box>
        </Box>
      </Box>
      <ProjetCards />
    </div>
    );
}

export default Accueil;