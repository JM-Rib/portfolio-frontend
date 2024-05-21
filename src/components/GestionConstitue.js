import React from 'react';
import './Gestion.css';
import deleteIcon from '../assets/delete.png'
import Bouton from './Bouton';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';


import useApi from '../hooks/useApi';
import constitueApi from '../api/constitue'; //Import the API service function

const ROW_AJOUT = 1;
function GestionConstitues(props) {
  const [editMode, setEditMode] = useState([]);
  
  
  const getConstituesApi = useApi(constitueApi.getConstitues);
  
  useEffect(() => { // fetch des données 
    getConstituesApi.request(); 
    // eslint-disable-next-line
  }, []);

  useEffect(() => { // intialisation des valeurs d'état pour l'interface
    if (!getConstituesApi.loading && getConstituesApi.data) {
      var tabEditMode = new Array(getConstituesApi.data.length + ROW_AJOUT).fill(false);
      setEditMode(tabEditMode);
    }
    // eslint-disable-next-line
  }, [getConstituesApi.data]); 

  const handleSubmit = event => {
    event.preventDefault();
    const id = Number.parseInt(window.event.submitter.id);
    const data = {
      pk_idConstitue: id,
      fk_idConstitue: event.target.fk_idConstitue.value,
      fk_idArticle: event.target.fk_idArticle.value,
      fk_idMedia: event.target.fk_idMedia.value
    }
    //check submit type:
    if(window.event.submitter.name === "CREATE"){
      createConstitue(data);
    }else if(window.event.submitter.name === "EDIT"){
      editConstitue(id, data);
    }
    //reset affichage du tableau apres envoi.
    var tabEditMode = new Array(editMode.length).fill(false);
    setEditMode(tabEditMode);
  }

  const createConstitue = async (data) => {
    try {
      await constitueApi.postConstitue(data);
      getConstituesApi.request();
    } catch (error) {
    }
  }
  
  const editConstitue = async (id, data) => {
    try {
      await constitueApi.putConstitue(id, data);
      getConstituesApi.request();
    } catch (err) {
      console.error(err);
    }
  }
  
  const removeConstitue = async (id) => {
    const choice = window.confirm("Êtes vous sûr de vouloir supprimer ce constitue?\n\n\nUne fois supprimé tout les inscrits seront enlevés et il ne pourra plus être récupéré.");
    if (!choice) return;
    try {
      await constitueApi.deleteConstitue(id);
      getConstituesApi.request();
    } catch (error) {
    }
  }
  
  const annuler = () => {//reinitialise les champs d'edition.
    var tabEditMode = new Array(editMode.length).fill(false);//reset affichage du tableau apres envoi.
    setEditMode(tabEditMode);        
  }

	return (
    <div className="EspaceGestion">
      {/* <div className="EspaceConstitues"> */}
      <Bouton  nom="Gestion" type="lien" lien={"/index"}  />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='tl-th th-visible'>Pk_idconstitue</th>
              <th className='th-visible'>Fk_idconstitue</th>
              <th className='th-visible'>Fk_idarticle</th>
              <th className='tr-th th-visible'>Fk_idmedia</th>
            </tr>
          </thead>
          <tbody>
            {getConstituesApi.data?.map( (constitue, n) => ( 
              <tr key={"tabgestion-"+n} className="tr-visible"> 
                <td>{ editMode[n] ?
                  <img src={deleteIcon} className="gestion-delete-icon" alt="" onClick={() => removeConstitue(constitue.pk_idConstitue)} />
                  :
                  null }
                </td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="pk_idConstitue" name="pk_idConstitue" defaultValue={constitue.pk_idConstitue}></input>
                  </>
                :
                  constitue.pk_idConstitue }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idConstitue" name="fk_idConstitue" defaultValue={constitue.fk_idConstitue}></input>
                  </>
                :
                  constitue.fk_idConstitue }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idArticle" name="fk_idArticle" defaultValue={constitue.fk_idArticle}></input>
                  </>
                :
                  constitue.fk_idArticle }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idMedia" name="fk_idMedia" defaultValue={constitue.fk_idMedia}></input>
                  </>
                :
                  constitue.fk_idMedia }</td>
                <td>{editMode[n] ?
                  <>
                    <input type="submit" name="EDIT" value="Envoyer" id={`${constitue.pk_idConstitue}`}  />
                    <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                  </>
                    :
                  <div onClick={ () => {
                    // setDateDebutConstitue(new Date(constitue.date1Constitue)); setDateFinConstitue(new Date(constitue.date2Constitue))
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
                      <input type="number" id="pk_idConstitue" name="pk_idConstitue" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <>
                      <input type="number" id="fk_idConstitue" name="fk_idConstitue" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <>
                      <input type="number" id="fk_idArticle" name="fk_idArticle" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <>
                      <input type="number" id="fk_idMedia" name="fk_idMedia" defaultValue={""}></input>
                    </>
                  </td>
                  <td>
                    <>
                      <input type="submit" name="CREATE" idbutton={editMode.length-ROW_AJOUT} value="Envoyer"  />
                      {/* <button className='constitues-form-envoyer' onClick={(e) => {createConstitue(e)}} >Envoyer</button> */}
                      <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                    </>
                  </td>
                </tr>
                :
                <tr>
                  <td></td>
                  <td>
                    <div onClick={ () => {
                      // setDateDebutConstitue(new Date(Date.now())); setDateFinConstitue(new Date(Date.now()));
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

export default GestionConstitues;