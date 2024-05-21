import React from 'react';
import './Gestion.css';
import deleteIcon from '../assets/delete.png'
import Bouton from './Bouton';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';


import useApi from '../hooks/useApi';
import paragrapheApi from '../api/paragraphe'; //Import the API service function

const ROW_AJOUT = 1;
function GestionParagraphes(props) {
  const [editMode, setEditMode] = useState([]);
  
  
  const getParagraphesApi = useApi(paragrapheApi.getParagraphes);
  
  useEffect(() => { // fetch des données 
    getParagraphesApi.request(); 
    // eslint-disable-next-line
  }, []);

  useEffect(() => { // intialisation des valeurs d'état pour l'interface
    if (!getParagraphesApi.loading && getParagraphesApi.data) {
      var tabEditMode = new Array(getParagraphesApi.data.length + ROW_AJOUT).fill(false);
      setEditMode(tabEditMode);
    }
    // eslint-disable-next-line
  }, [getParagraphesApi.data]); 

  const handleSubmit = event => {
    event.preventDefault();
    const id = Number.parseInt(window.event.submitter.id);
    const data = {
      fk_idConstitue: event.target.fk_idConstitue.value,
      fk_idLangue: event.target.fk_idLangue.value,
      paragraphe: event.target.paragraphe.value
    }
    //check submit type:
    if(window.event.submitter.name === "CREATE"){
      createParagraphe(data);
    }else if(window.event.submitter.name === "EDIT"){
      editParagraphe(id, data);
    }
    //reset affichage du tableau apres envoi.
    var tabEditMode = new Array(editMode.length).fill(false);
    setEditMode(tabEditMode);
  }

  const createParagraphe = async (data) => {
    try {
      await paragrapheApi.postParagraphe(data);
      getParagraphesApi.request();
    } catch (error) {
    }
  }
  
  const editParagraphe = async (id, data) => {
    try {
      await paragrapheApi.putParagraphe(id, data);
      getParagraphesApi.request();
    } catch (err) {
      console.error(err);
    }
  }
  
  const removeParagraphe = async (id) => {
    const choice = window.confirm("Êtes vous sûr de vouloir supprimer ce paragraphe?\n\n\nUne fois supprimé tout les inscrits seront enlevés et il ne pourra plus être récupéré.");
    if (!choice) return;
    try {
      await paragrapheApi.deleteParagraphe(id);
      getParagraphesApi.request();
    } catch (error) {
    }
  }
  
  const annuler = () => {//reinitialise les champs d'edition.
    var tabEditMode = new Array(editMode.length).fill(false);//reset affichage du tableau apres envoi.
    setEditMode(tabEditMode);        
  }

	return (
    <div className="EspaceGestion">
      {/* <div className="EspaceParagraphes"> */}
      <Bouton  nom="Accueil" type="lien" lien={"/index"}  />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='tl-th th-visible'>Fk_idconstitue</th>
              <th className='th-visible'>Fk_idlangue</th>
              <th className='tr-th th-visible'>Paragraphe</th>
            </tr>
          </thead>
          <tbody>
            {getParagraphesApi.data?.map( (paragraphe, n) => ( 
              <tr key={"tabgestion-"+n} className="tr-visible"> 
                <td>{ editMode[n] ?
                  <img src={deleteIcon} className="gestion-delete-icon" alt="" onClick={() => removeParagraphe(paragraphe.pk_idParagraphe)} />
                  :
                  null }
                </td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idConstitue" name="fk_idConstitue" defaultValue={paragraphe.fk_idConstitue}></input>
                  </>
                :
                  paragraphe.fk_idConstitue }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idLangue" name="fk_idLangue" defaultValue={paragraphe.fk_idLangue}></input>
                  </>
                :
                  paragraphe.fk_idLangue }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <input type="text" name="paragraphe" defaultValue={paragraphe.paragraphe}></input>
                :
                  paragraphe.paragraphe }</td>
                <td>{editMode[n] ?
                  <>
                    <input type="submit" name="EDIT" value="Envoyer" id={`${paragraphe.pk_idParagraphe}`}  />
                    <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                  </>
                    :
                  <div onClick={ () => {
                    // setDateDebutParagraphe(new Date(paragraphe.date1Paragraphe)); setDateFinParagraphe(new Date(paragraphe.date2Paragraphe))
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
                      <input type="number" id="fk_idConstitue" name="fk_idConstitue" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <>
                      <input type="number" id="fk_idLangue" name="fk_idLangue" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <input type="text" name="paragraphe" defaultValue={""}></input>
                  </td>
                  <td>
                    <>
                      <input type="submit" name="CREATE" idbutton={editMode.length-ROW_AJOUT} value="Envoyer"  />
                      {/* <button className='paragraphes-form-envoyer' onClick={(e) => {createParagraphe(e)}} >Envoyer</button> */}
                      <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                    </>
                  </td>
                </tr>
                :
                <tr>
                  <td></td>
                  <td>
                    <div onClick={ () => {
                      // setDateDebutParagraphe(new Date(Date.now())); setDateFinParagraphe(new Date(Date.now()));
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

export default GestionParagraphes;