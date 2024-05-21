import React, { createContext, useState, useContext } from 'react';
import { storeToken, removeToken, getToken } from '../utils/token';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import adminApi from '../api/admin'; 

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const loginAdminApi = useApi(adminApi.loginAdmin);
  const verifyAdminApi = useApi(adminApi.verifyAdmin);


/**
 * Connecte un utilisateur à partir d'un identifiant et mot de passe.
 * 
 * @param {string} user 
 * @param {string} password 
 */
  const login = async (user, password) => {
    const data = {
      identifiant: user,
      mdp: password,
    };
    /*
      le loginAdminApi?.data ne se met pas à jour à temps pour pouvoir
      récuperer les infos donc on recup le resultat dans le then à la
      place.
    */
    loginAdminApi.request(data).then(
      (r) => { 
        if( r.data !==null && !loginAdminApi?.error && !loginAdminApi?.loading){
          storeToken(r?.data.token);
          navigate('/');
        }
      }
    );
  };

  /**
   * Déconnecte l'utilisateur et le redirige à la page d'Gestion.
   */
  const logout = () => {
    setUser(null);
    removeToken();
    navigate('/');
  };

  /**
   * Appelle l'api pour vérifier la validité du token. Si aucun token n'existe on renvoie false.
   * @returns bool
   */
  const verifiedUser = async () => {
    if(getToken() !== null){ //si un token existe on re-vérifie sa validité
      let response = await verifyAdminApi.request(getToken());
      return response?.data?.authenticated;
    }else{ // sinon on renvoie l'utilisateur au login
      return false;
    }
  };

  /**
   * Restreint l'accès à une page lorsque l'utilisateur est déjà connecté.
   * Ex: rediriger un utilisateur connecté vers la page d'acceuil si il tente d'accéder à la page de connexion.
   */
  const denyConnectedUser = () => {
    if(getToken()){ //si un token existe on empêche l'accès
      navigate('/');
    }
  };

  /**
   * Renvoie true s'il existe des informations de connexion, false sinon.
   * /!\ ATTENTION: ne pas utiliser en guise de vérification sert juste superficiellement /!\
   * 
   * @returns bool 
   */
  const hasLoginData = () => {
    return (getToken());
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        verifiedUser,
        denyConnectedUser,
        hasLoginData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};