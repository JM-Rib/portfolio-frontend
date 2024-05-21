import React from 'react';
import './Gestion.css';
import deleteIcon from '../assets/delete.png'
import Bouton from './Bouton';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';


import useApi from '../hooks/useApi';
import profilApi from '../api/profil'; //Import the API service function

const ROW_AJOUT = 1;
function GestionProfils(props) {
  const [editMode, setEditMode] = useState([]);
  
  
  const getProfilsApi = useApi(profilApi.getProfils);
  
  useEffect(() => { // fetch des données 
    getProfilsApi.request(); 
    // eslint-disable-next-line
  }, []);

  useEffect(() => { // intialisation des valeurs d'état pour l'interface
    if (!getProfilsApi.loading && getProfilsApi.data) {
      var tabEditMode = new Array(getProfilsApi.data.length + ROW_AJOUT).fill(false);
      setEditMode(tabEditMode);
    }
    // eslint-disable-next-line
  }, [getProfilsApi.data]); 

  const handleSubmit = event => {
    event.preventDefault();
    const id = Number.parseInt(window.event.submitter.id);
    const data = {
      pk_idProfil: id,
      nomProfil: event.target.nomProfil.value,
      prenomProfil: event.target.prenomProfil.value,
      linkedin: event.target.linkedin.value,
      github: event.target.github.value,
      cheminPhotoProfil: event.target.cheminPhotoProfil.value
    }
    //check submit type:
    if(window.event.submitter.name === "CREATE"){
      createProfil(data);
    }else if(window.event.submitter.name === "EDIT"){
      editProfil(id, data);
    }
    //reset affichage du tableau apres envoi.
    var tabEditMode = new Array(editMode.length).fill(false);
    setEditMode(tabEditMode);
  }

  const createProfil = async (data) => {
    try {
      await profilApi.postProfil(data);
      getProfilsApi.request();
    } catch (error) {
    }
  }
  
  const editProfil = async (id, data) => {
    try {
      await profilApi.putProfil(id, data);
      getProfilsApi.request();
    } catch (err) {
      console.error(err);
    }
  }
  
  const removeProfil = async (id) => {
    const choice = window.confirm("Êtes vous sûr de vouloir supprimer ce profil?\n\n\nUne fois supprimé tout les inscrits seront enlevés et il ne pourra plus être récupéré.");
    if (!choice) return;
    try {
      await profilApi.deleteProfil(id);
      getProfilsApi.request();
    } catch (error) {
    }
  }
  
  const annuler = () => {//reinitialise les champs d'edition.
    var tabEditMode = new Array(editMode.length).fill(false);//reset affichage du tableau apres envoi.
    setEditMode(tabEditMode);        
  }

	return (
    <div className="EspaceGestion">
      {/* <div className="EspaceProfils"> */}
      <Bouton  nom="Accueil" type="lien" lien={"/index"}  />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='tl-th th-visible'>Pk_idprofil</th>
              <th className='th-visible'>Nomprofil</th>
              <th className='th-visible'>Prenomprofil</th>
              <th className='th-visible'>Linkedin</th>
              <th className='th-visible'>Github</th>
              <th className='tr-th th-visible'>Cheminphotoprofil</th>
            </tr>
          </thead>
          <tbody>
            {getProfilsApi.data?.map( (profil, n) => ( 
              <tr key={"tabgestion-"+n} className="tr-visible"> 
                <td>{ editMode[n] ?
                  <img src={deleteIcon} className="gestion-delete-icon" alt="" onClick={() => removeProfil(profil.pk_idProfil)} />
                  :
                  null }
                </td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="pk_idProfil" name="pk_idProfil" defaultValue={profil.pk_idProfil}></input>
                  </>
                :
                  profil.pk_idProfil }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <input type="text" name="nomProfil" defaultValue={profil.nomProfil}></input>
                :
                  profil.nomProfil }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <input type="text" name="prenomProfil" defaultValue={profil.prenomProfil}></input>
                :
                  profil.prenomProfil }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <input type="text" name="linkedin" defaultValue={profil.linkedin}></input>
                :
                  profil.linkedin }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <input type="text" name="github" defaultValue={profil.github}></input>
                :
                  profil.github }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <input type="text" name="cheminPhotoProfil" defaultValue={profil.cheminPhotoProfil}></input>
                :
                  profil.cheminPhotoProfil }</td>
                <td>{editMode[n] ?
                  <>
                    <input type="submit" name="EDIT" value="Envoyer" id={`${profil.pk_idProfil}`}  />
                    <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                  </>
                    :
                  <div onClick={ () => {
                    // setDateDebutProfil(new Date(profil.date1Profil)); setDateFinProfil(new Date(profil.date2Profil))
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
                      <input type="number" id="pk_idProfil" name="pk_idProfil" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <input type="text" name="nomProfil" defaultValue={""}></input>
                  </td>
                  <td className='td-visible'>
                    <input type="text" name="prenomProfil" defaultValue={""}></input>
                  </td>
                  <td className='td-visible'>
                    <input type="text" name="linkedin" defaultValue={""}></input>
                  </td>
                  <td className='td-visible'>
                    <input type="text" name="github" defaultValue={""}></input>
                  </td>
                  <td className='td-visible'>
                    <input type="text" name="cheminPhotoProfil" defaultValue={""}></input>
                  </td>
                  <td>
                    <>
                      <input type="submit" name="CREATE" idbutton={editMode.length-ROW_AJOUT} value="Envoyer"  />
                      {/* <button className='profils-form-envoyer' onClick={(e) => {createProfil(e)}} >Envoyer</button> */}
                      <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                    </>
                  </td>
                </tr>
                :
                <tr>
                  <td></td>
                  <td>
                    <div onClick={ () => {
                      // setDateDebutProfil(new Date(Date.now())); setDateFinProfil(new Date(Date.now()));
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

export default GestionProfils;