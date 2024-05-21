import React from 'react';
import Bouton from '../components/Bouton';
import ProjetCards from '../components/ProjetCards';
import { useAuth } from '../providers/AuthProvider';
import { APP_ROUTES } from '../utils/constants';

function Accueil() {
  const {logout, hasLoginData} = useAuth();

	return (
    <div className="accueil">
      <p>Salut</p>      
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