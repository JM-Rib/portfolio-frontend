import React from 'react';
import Bouton from '../components/Bouton';
import { useAuth } from '../providers/AuthProvider';
import { APP_ROUTES } from '../utils/constants';

function Accueil() {
  const {logout, hasLoginData} = useAuth();

	return (
    <div className="acceuil">
      <Bouton  nom="Profil" type="lien" lien={APP_ROUTES.PROFIL}  />
      <Bouton  nom="Projet" type="lien" lien={APP_ROUTES.PROJET}  />
      <Bouton  nom="Article" type="lien" lien={APP_ROUTES.ARTICLE}  />
      <Bouton  nom="Langue" type="lien" lien={APP_ROUTES.LANGUE}  />
      <Bouton  nom="Media" type="lien" lien={APP_ROUTES.MEDIA}  />
      <Bouton  nom="Constitue" type="lien" lien={APP_ROUTES.CONSTITUE}  />
      <Bouton  nom="Paragraphe" type="lien" lien={APP_ROUTES.PARAGRAPHE}  />
      <Bouton  nom="Theme" type="lien" lien={APP_ROUTES.THEME}  />
      <Bouton  nom="Evoque" type="lien" lien={APP_ROUTES.EVOQUE}  />
      <Bouton  nom="Problematique" type="lien" lien={APP_ROUTES.PROBLEMATIQUE}  />
      <Bouton  nom="Collab" type="lien" lien={APP_ROUTES.COLLAB}  />
      <Bouton  nom="Description" type="lien" lien={APP_ROUTES.DESCRIPTION}  />
      <Bouton  nom="Contenutheme" type="lien" lien={APP_ROUTES.CONTENUTHEME}  />
      <Bouton  nom="Nomarticle" type="lien" lien={APP_ROUTES.NOMARTICLE}  />
      
      <p>Bienvenue</p>      
      {hasLoginData() ?
        <Bouton nom="Déconnexion" type="onClick" callback={logout} ></Bouton>
      :
        <Bouton nom="Connexion" type="lien" lien={APP_ROUTES.LOGIN}  />
      }
    </div>
    );
}

export default Accueil;