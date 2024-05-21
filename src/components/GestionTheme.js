import React from 'react';
import './Gestion.css';
import deleteIcon from '../assets/delete.png'
import Bouton from './Bouton';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';


import useApi from '../hooks/useApi';
import themeApi from '../api/theme'; //Import the API service function

const ROW_AJOUT = 1;
function GestionThemes(props) {
  const [editMode, setEditMode] = useState([]);
  
  
  const getThemesApi = useApi(themeApi.getThemes);
  
  useEffect(() => { // fetch des données 
    getThemesApi.request(); 
    // eslint-disable-next-line
  }, []);

  useEffect(() => { // intialisation des valeurs d'état pour l'interface
    if (!getThemesApi.loading && getThemesApi.data) {
      var tabEditMode = new Array(getThemesApi.data.length + ROW_AJOUT).fill(false);
      setEditMode(tabEditMode);
    }
    // eslint-disable-next-line
  }, [getThemesApi.data]); 

  const handleSubmit = event => {
    event.preventDefault();
    const id = Number.parseInt(window.event.submitter.id);
    const data = {
      pk_idTheme: id
    }
    //check submit type:
    if(window.event.submitter.name === "CREATE"){
      createTheme(data);
    }else if(window.event.submitter.name === "EDIT"){
      editTheme(id, data);
    }
    //reset affichage du tableau apres envoi.
    var tabEditMode = new Array(editMode.length).fill(false);
    setEditMode(tabEditMode);
  }

  const createTheme = async (data) => {
    try {
      await themeApi.postTheme(data);
      getThemesApi.request();
    } catch (error) {
    }
  }
  
  const editTheme = async (id, data) => {
    try {
      await themeApi.putTheme(id, data);
      getThemesApi.request();
    } catch (err) {
      console.error(err);
    }
  }
  
  const removeTheme = async (id) => {
    const choice = window.confirm("Êtes vous sûr de vouloir supprimer ce theme?\n\n\nUne fois supprimé tout les inscrits seront enlevés et il ne pourra plus être récupéré.");
    if (!choice) return;
    try {
      await themeApi.deleteTheme(id);
      getThemesApi.request();
    } catch (error) {
    }
  }
  
  const annuler = () => {//reinitialise les champs d'edition.
    var tabEditMode = new Array(editMode.length).fill(false);//reset affichage du tableau apres envoi.
    setEditMode(tabEditMode);        
  }

	return (
    <div className="EspaceGestion">
      {/* <div className="EspaceThemes"> */}
      <Bouton  nom="Accueil" type="lien" lien={"/index"}  />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='tl-th th-visible'>Pk_idtheme</th>
            </tr>
          </thead>
          <tbody>
            {getThemesApi.data?.map( (theme, n) => ( 
              <tr key={"tabgestion-"+n} className="tr-visible"> 
                <td>{ editMode[n] ?
                  <img src={deleteIcon} className="gestion-delete-icon" alt="" onClick={() => removeTheme(theme.pk_idTheme)} />
                  :
                  null }
                </td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="pk_idTheme" name="pk_idTheme" defaultValue={theme.pk_idTheme}></input>
                  </>
                :
                  theme.pk_idTheme }</td>
                <td>{editMode[n] ?
                  <>
                    <input type="submit" name="EDIT" value="Envoyer" id={`${theme.pk_idTheme}`}  />
                    <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                  </>
                    :
                  <div onClick={ () => {
                    // setDateDebutTheme(new Date(theme.date1Theme)); setDateFinTheme(new Date(theme.date2Theme))
                    }} >
                    <Bouton nom="Modifier" type="editMode" editMode={editMode} i={n} setEditMode={setEditMode}  ></Bouton>
                  </div>
                }</td>
              </tr>
            ))}
              { editMode[editMode.length-ROW_AJOUT] ?
                <tr key={"tabgestion-"+editMode.length-ROW_AJOUT} className="tr-visible"> 
                  <td>
                  </td>
                  <td className='td-visible'>
                    <>
                      <input type="number" id="pk_idTheme" name="pk_idTheme" defaultValue={""}></input>
                    </>
                  </td>
                  <td>
                    <>
                      <input type="submit" name="CREATE" idbutton={editMode.length-ROW_AJOUT} value="Envoyer"  />
                      {/* <button className='themes-form-envoyer' onClick={(e) => {createTheme(e)}} >Envoyer</button> */}
                      <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                    </>
                  </td>
                </tr>
                :
                <tr>
                  <td></td>
                  <td>
                    <div onClick={ () => {
                      // setDateDebutTheme(new Date(Date.now())); setDateFinTheme(new Date(Date.now()));
                      }} >
                      <Bouton nom="Ajouter" type="editMode" editMode={editMode} i={editMode.length-ROW_AJOUT} setEditMode={setEditMode} ></Bouton>
                    </div>
                  </td>
                </tr>
              }
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default GestionThemes;