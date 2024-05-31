import React from 'react';
import Bouton from '../components/Bouton';
import ProjetCards from '../components/ProjetCards';
import TextEmoji from '../components/TextEmoji';
import LargeEmoji from '../components/LargeEmoji';
import PartyPopper from '../components/PartyPopper';
import { useAuth } from '../providers/AuthProvider';
import { APP_ROUTES } from '../utils/constants';
import { Heading, Container, Stack } from '@chakra-ui/react';

function Accueil() {
  const {logout, hasLoginData} = useAuth();

	return (
    <div className="accueil">
      <br />
      <br />
      <br />
      <Container maxW='2xl' bg='alpha' display="flex" alignItems="center" justifyContent="center" >
        <Stack>
          <Heading size='md' color="white" textAlign="left">Congrats !</Heading>
          <Heading size='md' color="white" textAlign="left">You made it to my site !</Heading>
        </Stack>
        <PartyPopper />
        <LargeEmoji />
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <p>Salut <TextEmoji /></p>      
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