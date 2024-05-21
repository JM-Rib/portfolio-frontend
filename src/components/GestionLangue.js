import React from 'react';
import './Gestion.css';
import deleteIcon from '../assets/delete.png'
import Bouton from './Bouton';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';


import useApi from '../hooks/useApi';
import langueApi from '../api/langue'; //Import the API service function

const ROW_AJOUT = 1;
function GestionLangues(props) {
  const [editMode, setEditMode] = useState([]);
  
  
  const getLanguesApi = useApi(langueApi.getLangues);
  
  useEffect(() => { // fetch des données 
    getLanguesApi.request(); 
    // eslint-disable-next-line
  }, []);

  useEffect(() => { // intialisation des valeurs d'état pour l'interface
    if (!getLanguesApi.loading && getLanguesApi.data) {
      var tabEditMode = new Array(getLanguesApi.data.length + ROW_AJOUT).fill(false);
      setEditMode(tabEditMode);
    }
    // eslint-disable-next-line
  }, [getLanguesApi.data]); 

  const handleSubmit = event => {
    event.preventDefault();
    const id = Number.parseInt(window.event.submitter.id);
    const data = {
      pk_idLangue: id,
      langue: event.target.langue.value
    }
    //check submit type:
    if(window.event.submitter.name === "CREATE"){
      createLangue(data);
    }else if(window.event.submitter.name === "EDIT"){
      editLangue(id, data);
    }
    //reset affichage du tableau apres envoi.
    var tabEditMode = new Array(editMode.length).fill(false);
    setEditMode(tabEditMode);
  }

  const createLangue = async (data) => {
    try {
      await langueApi.postLangue(data);
      getLanguesApi.request();
    } catch (error) {
    }
  }
  
  const editLangue = async (id, data) => {
    try {
      await langueApi.putLangue(id, data);
      getLanguesApi.request();
    } catch (err) {
      console.error(err);
    }
  }
  
  const removeLangue = async (id) => {
    const choice = window.confirm("Êtes vous sûr de vouloir supprimer ce langue?\n\n\nUne fois supprimé tout les inscrits seront enlevés et il ne pourra plus être récupéré.");
    if (!choice) return;
    try {
      await langueApi.deleteLangue(id);
      getLanguesApi.request();
    } catch (error) {
    }
  }
  
  const annuler = () => {//reinitialise les champs d'edition.
    var tabEditMode = new Array(editMode.length).fill(false);//reset affichage du tableau apres envoi.
    setEditMode(tabEditMode);        
  }

	return (
    <div className="EspaceGestion">
      {/* <div className="EspaceLangues"> */}
      <Bouton  nom="Gestion" type="lien" lien={"/index"}  />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='tl-th th-visible'>Pk_idlangue</th>
              <th className='tr-th th-visible'>Langue</th>
            </tr>
          </thead>
          <tbody>
            {getLanguesApi.data?.map( (langue, n) => ( 
              <tr key={"tabgestion-"+n} className="tr-visible"> 
                <td>{ editMode[n] ?
                  <img src={deleteIcon} className="gestion-delete-icon" alt="" onClick={() => removeLangue(langue.pk_idLangue)} />
                  :
                  null }
                </td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="pk_idLangue" name="pk_idLangue" defaultValue={langue.pk_idLangue}></input>
                  </>
                :
                  langue.pk_idLangue }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <input type="text" name="langue" defaultValue={langue.langue}></input>
                :
                  langue.langue }</td>
                <td>{editMode[n] ?
                  <>
                    <input type="submit" name="EDIT" value="Envoyer" id={`${langue.pk_idLangue}`}  />
                    <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                  </>
                    :
                  <div onClick={ () => {
                    // setDateDebutLangue(new Date(langue.date1Langue)); setDateFinLangue(new Date(langue.date2Langue))
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
                      <input type="number" id="pk_idLangue" name="pk_idLangue" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <input type="text" name="langue" defaultValue={""}></input>
                  </td>
                  <td>
                    <>
                      <input type="submit" name="CREATE" idbutton={editMode.length-ROW_AJOUT} value="Envoyer"  />
                      {/* <button className='langues-form-envoyer' onClick={(e) => {createLangue(e)}} >Envoyer</button> */}
                      <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                    </>
                  </td>
                </tr>
                :
                <tr>
                  <td></td>
                  <td>
                    <div onClick={ () => {
                      // setDateDebutLangue(new Date(Date.now())); setDateFinLangue(new Date(Date.now()));
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

export default GestionLangues;