import React from 'react';
import './Gestion.css';
import deleteIcon from '../assets/delete.png'
import Bouton from './Bouton';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';


import useApi from '../hooks/useApi';
import evoqueApi from '../api/evoque'; //Import the API service function

const ROW_AJOUT = 1;
function GestionEvoques(props) {
  const [editMode, setEditMode] = useState([]);
  
  
  const getEvoquesApi = useApi(evoqueApi.getEvoques);
  
  useEffect(() => { // fetch des données 
    getEvoquesApi.request(); 
    // eslint-disable-next-line
  }, []);

  useEffect(() => { // intialisation des valeurs d'état pour l'interface
    if (!getEvoquesApi.loading && getEvoquesApi.data) {
      var tabEditMode = new Array(getEvoquesApi.data.length + ROW_AJOUT).fill(false);
      setEditMode(tabEditMode);
    }
    // eslint-disable-next-line
  }, [getEvoquesApi.data]); 

  const handleSubmit = event => {
    event.preventDefault();
    const id = Number.parseInt(window.event.submitter.id);
    const data = {
      fk_idTheme: event.target.fk_idTheme.value,
      fk_idArticle: event.target.fk_idArticle.value
    }
    //check submit type:
    if(window.event.submitter.name === "CREATE"){
      createEvoque(data);
    }else if(window.event.submitter.name === "EDIT"){
      editEvoque(id, data);
    }
    //reset affichage du tableau apres envoi.
    var tabEditMode = new Array(editMode.length).fill(false);
    setEditMode(tabEditMode);
  }

  const createEvoque = async (data) => {
    try {
      await evoqueApi.postEvoque(data);
      getEvoquesApi.request();
    } catch (error) {
    }
  }
  
  const editEvoque = async (id, data) => {
    try {
      await evoqueApi.putEvoque(id, data);
      getEvoquesApi.request();
    } catch (err) {
      console.error(err);
    }
  }
  
  const removeEvoque = async (id) => {
    const choice = window.confirm("Êtes vous sûr de vouloir supprimer ce evoque?\n\n\nUne fois supprimé tout les inscrits seront enlevés et il ne pourra plus être récupéré.");
    if (!choice) return;
    try {
      await evoqueApi.deleteEvoque(id);
      getEvoquesApi.request();
    } catch (error) {
    }
  }
  
  const annuler = () => {//reinitialise les champs d'edition.
    var tabEditMode = new Array(editMode.length).fill(false);//reset affichage du tableau apres envoi.
    setEditMode(tabEditMode);        
  }

	return (
    <div className="EspaceGestion">
      {/* <div className="EspaceEvoques"> */}
      <Bouton  nom="Gestion" type="lien" lien={"/index"}  />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='tl-th th-visible'>Fk_idtheme</th>
              <th className='tr-th th-visible'>Fk_idarticle</th>
            </tr>
          </thead>
          <tbody>
            {getEvoquesApi.data?.map( (evoque, n) => ( 
              <tr key={"tabgestion-"+n} className="tr-visible"> 
                <td>{ editMode[n] ?
                  <img src={deleteIcon} className="gestion-delete-icon" alt="" onClick={() => removeEvoque(evoque.pk_idEvoque)} />
                  :
                  null }
                </td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idTheme" name="fk_idTheme" defaultValue={evoque.fk_idTheme}></input>
                  </>
                :
                  evoque.fk_idTheme }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idArticle" name="fk_idArticle" defaultValue={evoque.fk_idArticle}></input>
                  </>
                :
                  evoque.fk_idArticle }</td>
                <td>{editMode[n] ?
                  <>
                    <input type="submit" name="EDIT" value="Envoyer" id={`${evoque.pk_idEvoque}`}  />
                    <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                  </>
                    :
                  <div onClick={ () => {
                    // setDateDebutEvoque(new Date(evoque.date1Evoque)); setDateFinEvoque(new Date(evoque.date2Evoque))
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
                      <input type="number" id="fk_idArticle" name="fk_idArticle" defaultValue={""}></input>
                    </>
                  </td>
                  <td>
                    <>
                      <input type="submit" name="CREATE" idbutton={editMode.length-ROW_AJOUT} value="Envoyer"  />
                      {/* <button className='evoques-form-envoyer' onClick={(e) => {createEvoque(e)}} >Envoyer</button> */}
                      <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                    </>
                  </td>
                </tr>
                :
                <tr>
                  <td></td>
                  <td>
                    <div onClick={ () => {
                      // setDateDebutEvoque(new Date(Date.now())); setDateFinEvoque(new Date(Date.now()));
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

export default GestionEvoques;