import './App.css';

import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import Gestion from "./pages/Gestion"
import FormulaireLogin from "./components/FormulaireLogin";
import { AuthProvider } from "./providers/AuthProvider";
import ScrollToTop from "./utils/ScrollToTop";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from './utils/constants';

import GestionProfil from "./components/GestionProfil"
import RequireAuth from './components/RequireAuth';
import GestionProjet from "./components/GestionProjet"
import GestionArticle from "./components/GestionArticle"
import GestionLangue from "./components/GestionLangue"
import GestionMedia from "./components/GestionMedia"
import GestionConstitue from "./components/GestionConstitue"
import GestionParagraphe from "./components/GestionParagraphe"
import GestionTheme from "./components/GestionTheme"
import GestionEvoque from "./components/GestionEvoque"
import GestionProblematique from "./components/GestionProblematique"
import GestionCollab from "./components/GestionCollab"
import GestionDescription from "./components/GestionDescription"
import GestionContenutheme from "./components/GestionContenutheme"
import GestionNomarticle from "./components/GestionNomarticle"
import NavBar from "./components/NavBar"
import Accueil from './pages/Accueil';

function App() {

  const[width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange(){
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return() => {
      window.removeEventListener('resize',handleWindowSizeChange);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
          <ScrollToTop />
          <AuthProvider>
            <NavBar />
            <Routes>
                <Route path="/" element={<Accueil />}/>
                <Route path="/gestion" element={<Gestion />}/>
                <Route path={APP_ROUTES.LOGIN} element={<FormulaireLogin />}/>
                <Route element={<RequireAuth />}>  
                  <Route path={APP_ROUTES.PROFIL} element={<GestionProfil />}/>
                  <Route path={APP_ROUTES.PROJET} element={<GestionProjet />}/>
                  <Route path={APP_ROUTES.ARTICLE} element={<GestionArticle />}/>
                  <Route path={APP_ROUTES.LANGUE} element={<GestionLangue />}/>
                  <Route path={APP_ROUTES.MEDIA} element={<GestionMedia />}/>
                  <Route path={APP_ROUTES.CONSTITUE} element={<GestionConstitue />}/>
                  <Route path={APP_ROUTES.PARAGRAPHE} element={<GestionParagraphe />}/>
                  <Route path={APP_ROUTES.THEME} element={<GestionTheme />}/>
                  <Route path={APP_ROUTES.EVOQUE} element={<GestionEvoque />}/>
                  <Route path={APP_ROUTES.PROBLEMATIQUE} element={<GestionProblematique />}/>
                  <Route path={APP_ROUTES.COLLAB} element={<GestionCollab />}/>
                  <Route path={APP_ROUTES.DESCRIPTION} element={<GestionDescription />}/>
                  <Route path={APP_ROUTES.CONTENUTHEME} element={<GestionContenutheme />}/>
                  <Route path={APP_ROUTES.NOMARTICLE} element={<GestionNomarticle />}/>
                </Route>

                {/*si n'importe quoi dans l'url on redirige vers home */}
                <Route path="/*" element={<Accueil />}/>
            </Routes>
          </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
