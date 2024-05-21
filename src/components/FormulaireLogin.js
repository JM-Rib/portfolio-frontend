import './FormulaireLogin.css';
import Bouton from '../components/Bouton';
import Alerte from '../components/Alerte';
import { useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';

function FormulaireLogin() {
  const { login, denyConnectedUser } = useAuth();
  useEffect(() => { // refuse l'accès lorsque l'utilisateur est déjà connecté.
    denyConnectedUser();
  }, []);

  const styleTypeSucces = "succes";
  const styleTypeErreur = "erreur";

  /**
   * Lance l'appel de connexion.
   * @param {event} event 
   */
  const handleSubmit = async event => {
    event.preventDefault();
    login(event.target.identifiant.value, event.target.mot_de_passe.value);
  }

	return (
            <div className="EspaceFormulaireLogin">
                <div className="formulaire">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="formulaire-contact-nomprenom">
                                <input type="text" className="formulaire-contact-prenom" name="identifiant"  placeholder='Identifiant' />
                                <input type="password" className="formulaire-contact-nom" name="mot_de_passe" placeholder='Mot de Passe' />
                        </div>
                        <Alerte styleType={styleTypeErreur} flag={false} >
                          Identifiant ou mot de passe incorrect
                        </Alerte>
                        <Alerte styleType={styleTypeSucces} flag={false} >
                          Connexion réussie
                        </Alerte>
                    </fieldset>
                    <Bouton type="submit" nom="Connexion"   />
                </form>
                </div>       
            </div>
    );
}

export default FormulaireLogin;