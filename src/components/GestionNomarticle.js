import React from 'react';
import './Gestion.css';
import deleteIcon from '../assets/delete.png'
import Bouton from './Bouton';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';


import useApi from '../hooks/useApi';
import nomarticleApi from '../api/nomarticle'; //Import the API service function

const ROW_AJOUT = 1;
function GestionNomarticles(props) {
  const [editMode, setEditMode] = useState([]);
  
  
  const getNomarticlesApi = useApi(nomarticleApi.getNomarticles);
  
  useEffect(() => { // fetch des données 
    getNomarticlesApi.request(); 
    // eslint-disable-next-line
  }, []);

  useEffect(() => { // intialisation des valeurs d'état pour l'interface
    if (!getNomarticlesApi.loading && getNomarticlesApi.data) {
      var tabEditMode = new Array(getNomarticlesApi.data.length + ROW_AJOUT).fill(false);
      setEditMode(tabEditMode);
    }
    // eslint-disable-next-line
  }, [getNomarticlesApi.data]); 

  const handleSubmit = event => {
    event.preventDefault();
    const id = Number.parseInt(window.event.submitter.id);
    const data = {
      fk_idArticle: event.target.fk_idArticle.value,
      fk_idLangue: event.target.fk_idLangue.value,
      nomArticle: event.target.nomArticle.value
    }
    //check submit type:
    if(window.event.submitter.name === "CREATE"){
      createNomarticle(data);
    }else if(window.event.submitter.name === "EDIT"){
      editNomarticle(id, data);
    }
    //reset affichage du tableau apres envoi.
    var tabEditMode = new Array(editMode.length).fill(false);
    setEditMode(tabEditMode);
  }

  const createNomarticle = async (data) => {
    try {
      await nomarticleApi.postNomarticle(data);
      getNomarticlesApi.request();
    } catch (error) {
    }
  }
  
  const editNomarticle = async (id, data) => {
    try {
      await nomarticleApi.putNomarticle(id, data);
      getNomarticlesApi.request();
    } catch (err) {
      console.error(err);
    }
  }
  
  const removeNomarticle = async (id) => {
    const choice = window.confirm("Êtes vous sûr de vouloir supprimer ce nomarticle?\n\n\nUne fois supprimé tout les inscrits seront enlevés et il ne pourra plus être récupéré.");
    if (!choice) return;
    try {
      await nomarticleApi.deleteNomarticle(id);
      getNomarticlesApi.request();
    } catch (error) {
    }
  }
  
  const annuler = () => {//reinitialise les champs d'edition.
    var tabEditMode = new Array(editMode.length).fill(false);//reset affichage du tableau apres envoi.
    setEditMode(tabEditMode);        
  }

	return (
    <div className="EspaceGestion">
      {/* <div className="EspaceNomarticles"> */}
      <Bouton  nom="Accueil" type="lien" lien={"/index"}  />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='tl-th th-visible'>Fk_idarticle</th>
              <th className='th-visible'>Fk_idlangue</th>
              <th className='tr-th th-visible'>Nomarticle</th>
            </tr>
          </thead>
          <tbody>
            {getNomarticlesApi.data?.map( (nomarticle, n) => ( 
              <tr key={"tabgestion-"+n} className="tr-visible"> 
                <td>{ editMode[n] ?
                  <img src={deleteIcon} className="gestion-delete-icon" alt="" onClick={() => removeNomarticle(nomarticle.pk_idNomarticle)} />
                  :
                  null }
                </td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idArticle" name="fk_idArticle" defaultValue={nomarticle.fk_idArticle}></input>
                  </>
                :
                  nomarticle.fk_idArticle }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idLangue" name="fk_idLangue" defaultValue={nomarticle.fk_idLangue}></input>
                  </>
                :
                  nomarticle.fk_idLangue }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <input type="text" name="nomArticle" defaultValue={nomarticle.nomArticle}></input>
                :
                  nomarticle.nomArticle }</td>
                <td>{editMode[n] ?
                  <>
                    <input type="submit" name="EDIT" value="Envoyer" id={`${nomarticle.pk_idNomarticle}`}  />
                    <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                  </>
                    :
                  <div onClick={ () => {
                    // setDateDebutNomarticle(new Date(nomarticle.date1Nomarticle)); setDateFinNomarticle(new Date(nomarticle.date2Nomarticle))
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
                      <input type="number" id="fk_idArticle" name="fk_idArticle" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <>
                      <input type="number" id="fk_idLangue" name="fk_idLangue" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <input type="text" name="nomArticle" defaultValue={""}></input>
                  </td>
                  <td>
                    <>
                      <input type="submit" name="CREATE" idbutton={editMode.length-ROW_AJOUT} value="Envoyer"  />
                      {/* <button className='nomarticles-form-envoyer' onClick={(e) => {createNomarticle(e)}} >Envoyer</button> */}
                      <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                    </>
                  </td>
                </tr>
                :
                <tr>
                  <td></td>
                  <td>
                    <div onClick={ () => {
                      // setDateDebutNomarticle(new Date(Date.now())); setDateFinNomarticle(new Date(Date.now()));
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

export default GestionNomarticles;