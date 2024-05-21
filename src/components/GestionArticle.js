import React from 'react';
import './Gestion.css';
import deleteIcon from '../assets/delete.png'
import Bouton from './Bouton';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';


import useApi from '../hooks/useApi';
import articleApi from '../api/article'; //Import the API service function

const ROW_AJOUT = 1;
function GestionArticles(props) {
  const [editMode, setEditMode] = useState([]);
  
  
  const getArticlesApi = useApi(articleApi.getArticles);
  
  useEffect(() => { // fetch des données 
    getArticlesApi.request(); 
    // eslint-disable-next-line
  }, []);

  useEffect(() => { // intialisation des valeurs d'état pour l'interface
    if (!getArticlesApi.loading && getArticlesApi.data) {
      var tabEditMode = new Array(getArticlesApi.data.length + ROW_AJOUT).fill(false);
      setEditMode(tabEditMode);
    }
    // eslint-disable-next-line
  }, [getArticlesApi.data]); 

  const handleSubmit = event => {
    event.preventDefault();
    const id = Number.parseInt(window.event.submitter.id);
    const data = {
      pk_idArticle: id,
      fk_idAdmin: event.target.fk_idAdmin.value
    }
    //check submit type:
    if(window.event.submitter.name === "CREATE"){
      createArticle(data);
    }else if(window.event.submitter.name === "EDIT"){
      editArticle(id, data);
    }
    //reset affichage du tableau apres envoi.
    var tabEditMode = new Array(editMode.length).fill(false);
    setEditMode(tabEditMode);
  }

  const createArticle = async (data) => {
    try {
      await articleApi.postArticle(data);
      getArticlesApi.request();
    } catch (error) {
    }
  }
  
  const editArticle = async (id, data) => {
    try {
      await articleApi.putArticle(id, data);
      getArticlesApi.request();
    } catch (err) {
      console.error(err);
    }
  }
  
  const removeArticle = async (id) => {
    const choice = window.confirm("Êtes vous sûr de vouloir supprimer ce article?\n\n\nUne fois supprimé tout les inscrits seront enlevés et il ne pourra plus être récupéré.");
    if (!choice) return;
    try {
      await articleApi.deleteArticle(id);
      getArticlesApi.request();
    } catch (error) {
    }
  }
  
  const annuler = () => {//reinitialise les champs d'edition.
    var tabEditMode = new Array(editMode.length).fill(false);//reset affichage du tableau apres envoi.
    setEditMode(tabEditMode);        
  }

	return (
    <div className="EspaceGestion">
      {/* <div className="EspaceArticles"> */}
      <Bouton  nom="Gestion" type="lien" lien={"/index"}  />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='tl-th th-visible'>Pk_idarticle</th>
              <th className='tr-th th-visible'>Fk_idadmin</th>
            </tr>
          </thead>
          <tbody>
            {getArticlesApi.data?.map( (article, n) => ( 
              <tr key={"tabgestion-"+n} className="tr-visible"> 
                <td>{ editMode[n] ?
                  <img src={deleteIcon} className="gestion-delete-icon" alt="" onClick={() => removeArticle(article.pk_idArticle)} />
                  :
                  null }
                </td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="pk_idArticle" name="pk_idArticle" defaultValue={article.pk_idArticle}></input>
                  </>
                :
                  article.pk_idArticle }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idAdmin" name="fk_idAdmin" defaultValue={article.fk_idAdmin}></input>
                  </>
                :
                  article.fk_idAdmin }</td>
                <td>{editMode[n] ?
                  <>
                    <input type="submit" name="EDIT" value="Envoyer" id={`${article.pk_idArticle}`}  />
                    <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                  </>
                    :
                  <div onClick={ () => {
                    // setDateDebutArticle(new Date(article.date1Article)); setDateFinArticle(new Date(article.date2Article))
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
                      <input type="number" id="pk_idArticle" name="pk_idArticle" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <>
                      <input type="number" id="fk_idAdmin" name="fk_idAdmin" defaultValue={""}></input>
                    </>
                  </td>
                  <td>
                    <>
                      <input type="submit" name="CREATE" idbutton={editMode.length-ROW_AJOUT} value="Envoyer"  />
                      {/* <button className='articles-form-envoyer' onClick={(e) => {createArticle(e)}} >Envoyer</button> */}
                      <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                    </>
                  </td>
                </tr>
                :
                <tr>
                  <td></td>
                  <td>
                    <div onClick={ () => {
                      // setDateDebutArticle(new Date(Date.now())); setDateFinArticle(new Date(Date.now()));
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

export default GestionArticles;