import React from 'react';
import './Gestion.css';
import deleteIcon from '../assets/delete.png'
import Bouton from './Bouton';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';


import useApi from '../hooks/useApi';
import contenuthemeApi from '../api/contenutheme'; //Import the API service function

const ROW_AJOUT = 1;
function GestionContenuthemes(props) {
  const [editMode, setEditMode] = useState([]);
  
  
  const getContenuthemesApi = useApi(contenuthemeApi.getContenuthemes);
  
  useEffect(() => { // fetch des données 
    getContenuthemesApi.request(); 
    // eslint-disable-next-line
  }, []);

  useEffect(() => { // intialisation des valeurs d'état pour l'interface
    if (!getContenuthemesApi.loading && getContenuthemesApi.data) {
      var tabEditMode = new Array(getContenuthemesApi.data.length + ROW_AJOUT).fill(false);
      setEditMode(tabEditMode);
    }
    // eslint-disable-next-line
  }, [getContenuthemesApi.data]); 

  const handleSubmit = event => {
    event.preventDefault();
    const id = Number.parseInt(window.event.submitter.id);
    const data = {
      fk_idTheme: event.target.fk_idTheme.value,
      fk_idLangue: event.target.fk_idLangue.value,
      contenuTheme: event.target.contenuTheme.value
    }
    //check submit type:
    if(window.event.submitter.name === "CREATE"){
      createContenutheme(data);
    }else if(window.event.submitter.name === "EDIT"){
      editContenutheme(id, data);
    }
    //reset affichage du tableau apres envoi.
    var tabEditMode = new Array(editMode.length).fill(false);
    setEditMode(tabEditMode);
  }

  const createContenutheme = async (data) => {
    try {
      await contenuthemeApi.postContenutheme(data);
      getContenuthemesApi.request();
    } catch (error) {
    }
  }
  
  const editContenutheme = async (id, data) => {
    try {
      await contenuthemeApi.putContenutheme(id, data);
      getContenuthemesApi.request();
    } catch (err) {
      console.error(err);
    }
  }
  
  const removeContenutheme = async (id) => {
    const choice = window.confirm("Êtes vous sûr de vouloir supprimer ce contenutheme?\n\n\nUne fois supprimé tout les inscrits seront enlevés et il ne pourra plus être récupéré.");
    if (!choice) return;
    try {
      await contenuthemeApi.deleteContenutheme(id);
      getContenuthemesApi.request();
    } catch (error) {
    }
  }
  
  const annuler = () => {//reinitialise les champs d'edition.
    var tabEditMode = new Array(editMode.length).fill(false);//reset affichage du tableau apres envoi.
    setEditMode(tabEditMode);        
  }

	return (
    <div className="EspaceGestion">
      {/* <div className="EspaceContenuthemes"> */}
      <Bouton  nom="Gestion" type="lien" lien={"/index"}  />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='tl-th th-visible'>Fk_idtheme</th>
              <th className='th-visible'>Fk_idlangue</th>
              <th className='tr-th th-visible'>Contenutheme</th>
            </tr>
          </thead>
          <tbody>
            {getContenuthemesApi.data?.map( (contenutheme, n) => ( 
              <tr key={"tabgestion-"+n} className="tr-visible"> 
                <td>{ editMode[n] ?
                  <img src={deleteIcon} className="gestion-delete-icon" alt="" onClick={() => removeContenutheme(contenutheme.pk_idContenutheme)} />
                  :
                  null }
                </td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idTheme" name="fk_idTheme" defaultValue={contenutheme.fk_idTheme}></input>
                  </>
                :
                  contenutheme.fk_idTheme }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idLangue" name="fk_idLangue" defaultValue={contenutheme.fk_idLangue}></input>
                  </>
                :
                  contenutheme.fk_idLangue }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <input type="text" name="contenuTheme" defaultValue={contenutheme.contenuTheme}></input>
                :
                  contenutheme.contenuTheme }</td>
                <td>{editMode[n] ?
                  <>
                    <input type="submit" name="EDIT" value="Envoyer" id={`${contenutheme.pk_idContenutheme}`}  />
                    <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                  </>
                    :
                  <div onClick={ () => {
                    // setDateDebutContenutheme(new Date(contenutheme.date1Contenutheme)); setDateFinContenutheme(new Date(contenutheme.date2Contenutheme))
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
                      <input type="number" id="fk_idTheme" name="fk_idTheme" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <>
                      <input type="number" id="fk_idLangue" name="fk_idLangue" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <input type="text" name="contenuTheme" defaultValue={""}></input>
                  </td>
                  <td>
                    <>
                      <input type="submit" name="CREATE" idbutton={editMode.length-ROW_AJOUT} value="Envoyer"  />
                      {/* <button className='contenuthemes-form-envoyer' onClick={(e) => {createContenutheme(e)}} >Envoyer</button> */}
                      <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                    </>
                  </td>
                </tr>
                :
                <tr>
                  <td></td>
                  <td>
                    <div onClick={ () => {
                      // setDateDebutContenutheme(new Date(Date.now())); setDateFinContenutheme(new Date(Date.now()));
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

export default GestionContenuthemes;