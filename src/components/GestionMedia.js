import React from 'react';
import './Gestion.css';
import deleteIcon from '../assets/delete.png'
import Bouton from './Bouton';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';


import useApi from '../hooks/useApi';
import mediaApi from '../api/media'; //Import the API service function

const ROW_AJOUT = 1;
function GestionMedias(props) {
  const [editMode, setEditMode] = useState([]);
  
  
  const getMediasApi = useApi(mediaApi.getMedias);
  
  useEffect(() => { // fetch des données 
    getMediasApi.request(); 
    // eslint-disable-next-line
  }, []);

  useEffect(() => { // intialisation des valeurs d'état pour l'interface
    if (!getMediasApi.loading && getMediasApi.data) {
      var tabEditMode = new Array(getMediasApi.data.length + ROW_AJOUT).fill(false);
      setEditMode(tabEditMode);
    }
    // eslint-disable-next-line
  }, [getMediasApi.data]); 

  const handleSubmit = event => {
    event.preventDefault();
    const id = Number.parseInt(window.event.submitter.id);
    const data = {
      pk_idMedia: id,
      cheminFichier: event.target.cheminFichier.value
    }
    //check submit type:
    if(window.event.submitter.name === "CREATE"){
      createMedia(data);
    }else if(window.event.submitter.name === "EDIT"){
      editMedia(id, data);
    }
    //reset affichage du tableau apres envoi.
    var tabEditMode = new Array(editMode.length).fill(false);
    setEditMode(tabEditMode);
  }

  const createMedia = async (data) => {
    try {
      await mediaApi.postMedia(data);
      getMediasApi.request();
    } catch (error) {
    }
  }
  
  const editMedia = async (id, data) => {
    try {
      await mediaApi.putMedia(id, data);
      getMediasApi.request();
    } catch (err) {
      console.error(err);
    }
  }
  
  const removeMedia = async (id) => {
    const choice = window.confirm("Êtes vous sûr de vouloir supprimer ce media?\n\n\nUne fois supprimé tout les inscrits seront enlevés et il ne pourra plus être récupéré.");
    if (!choice) return;
    try {
      await mediaApi.deleteMedia(id);
      getMediasApi.request();
    } catch (error) {
    }
  }
  
  const annuler = () => {//reinitialise les champs d'edition.
    var tabEditMode = new Array(editMode.length).fill(false);//reset affichage du tableau apres envoi.
    setEditMode(tabEditMode);        
  }

	return (
    <div className="EspaceGestion">
      {/* <div className="EspaceMedias"> */}
      <Bouton  nom="Accueil" type="lien" lien={"/index"}  />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='tl-th th-visible'>Pk_idmedia</th>
              <th className='tr-th th-visible'>Cheminfichier</th>
            </tr>
          </thead>
          <tbody>
            {getMediasApi.data?.map( (media, n) => ( 
              <tr key={"tabgestion-"+n} className="tr-visible"> 
                <td>{ editMode[n] ?
                  <img src={deleteIcon} className="gestion-delete-icon" alt="" onClick={() => removeMedia(media.pk_idMedia)} />
                  :
                  null }
                </td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="pk_idMedia" name="pk_idMedia" defaultValue={media.pk_idMedia}></input>
                  </>
                :
                  media.pk_idMedia }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <input type="text" name="cheminFichier" defaultValue={media.cheminFichier}></input>
                :
                  media.cheminFichier }</td>
                <td>{editMode[n] ?
                  <>
                    <input type="submit" name="EDIT" value="Envoyer" id={`${media.pk_idMedia}`}  />
                    <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                  </>
                    :
                  <div onClick={ () => {
                    // setDateDebutMedia(new Date(media.date1Media)); setDateFinMedia(new Date(media.date2Media))
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
                      <input type="number" id="pk_idMedia" name="pk_idMedia" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <input type="text" name="cheminFichier" defaultValue={""}></input>
                  </td>
                  <td>
                    <>
                      <input type="submit" name="CREATE" idbutton={editMode.length-ROW_AJOUT} value="Envoyer"  />
                      {/* <button className='medias-form-envoyer' onClick={(e) => {createMedia(e)}} >Envoyer</button> */}
                      <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                    </>
                  </td>
                </tr>
                :
                <tr>
                  <td></td>
                  <td>
                    <div onClick={ () => {
                      // setDateDebutMedia(new Date(Date.now())); setDateFinMedia(new Date(Date.now()));
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

export default GestionMedias;