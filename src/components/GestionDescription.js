import React from 'react';
import './Gestion.css';
import deleteIcon from '../assets/delete.png'
import Bouton from './Bouton';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';


import useApi from '../hooks/useApi';
import descriptionApi from '../api/description'; //Import the API service function

const ROW_AJOUT = 1;
function GestionDescriptions(props) {
  const [editMode, setEditMode] = useState([]);
  
  
  const getDescriptionsApi = useApi(descriptionApi.getDescriptions);
  
  useEffect(() => { // fetch des données 
    getDescriptionsApi.request(); 
    // eslint-disable-next-line
  }, []);

  useEffect(() => { // intialisation des valeurs d'état pour l'interface
    if (!getDescriptionsApi.loading && getDescriptionsApi.data) {
      var tabEditMode = new Array(getDescriptionsApi.data.length + ROW_AJOUT).fill(false);
      setEditMode(tabEditMode);
    }
    // eslint-disable-next-line
  }, [getDescriptionsApi.data]); 

  const handleSubmit = event => {
    event.preventDefault();
    const id = Number.parseInt(window.event.submitter.id);
    const data = {
      fk_idProjet: event.target.fk_idProjet.value,
      fk_idLangue: event.target.fk_idLangue.value,
      description: event.target.description.value
    }
    //check submit type:
    if(window.event.submitter.name === "CREATE"){
      createDescription(data);
    }else if(window.event.submitter.name === "EDIT"){
      editDescription(id, data);
    }
    //reset affichage du tableau apres envoi.
    var tabEditMode = new Array(editMode.length).fill(false);
    setEditMode(tabEditMode);
  }

  const createDescription = async (data) => {
    try {
      await descriptionApi.postDescription(data);
      getDescriptionsApi.request();
    } catch (error) {
    }
  }
  
  const editDescription = async (id, data) => {
    try {
      await descriptionApi.putDescription(id, data);
      getDescriptionsApi.request();
    } catch (err) {
      console.error(err);
    }
  }
  
  const removeDescription = async (id) => {
    const choice = window.confirm("Êtes vous sûr de vouloir supprimer ce description?\n\n\nUne fois supprimé tout les inscrits seront enlevés et il ne pourra plus être récupéré.");
    if (!choice) return;
    try {
      await descriptionApi.deleteDescription(id);
      getDescriptionsApi.request();
    } catch (error) {
    }
  }
  
  const annuler = () => {//reinitialise les champs d'edition.
    var tabEditMode = new Array(editMode.length).fill(false);//reset affichage du tableau apres envoi.
    setEditMode(tabEditMode);        
  }

	return (
    <div className="EspaceGestion">
      {/* <div className="EspaceDescriptions"> */}
      <Bouton  nom="Gestion" type="lien" lien={"/index"}  />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='tl-th th-visible'>Fk_idprojet</th>
              <th className='th-visible'>Fk_idlangue</th>
              <th className='tr-th th-visible'>Description</th>
            </tr>
          </thead>
          <tbody>
            {getDescriptionsApi.data?.map( (description, n) => ( 
              <tr key={"tabgestion-"+n} className="tr-visible"> 
                <td>{ editMode[n] ?
                  <img src={deleteIcon} className="gestion-delete-icon" alt="" onClick={() => removeDescription(description.pk_idDescription)} />
                  :
                  null }
                </td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idProjet" name="fk_idProjet" defaultValue={description.fk_idProjet}></input>
                  </>
                :
                  description.fk_idProjet }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idLangue" name="fk_idLangue" defaultValue={description.fk_idLangue}></input>
                  </>
                :
                  description.fk_idLangue }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <input type="text" name="description" defaultValue={description.description}></input>
                :
                  description.description }</td>
                <td>{editMode[n] ?
                  <>
                    <input type="submit" name="EDIT" value="Envoyer" id={`${description.pk_idDescription}`}  />
                    <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                  </>
                    :
                  <div onClick={ () => {
                    // setDateDebutDescription(new Date(description.date1Description)); setDateFinDescription(new Date(description.date2Description))
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
                      <input type="number" id="fk_idProjet" name="fk_idProjet" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <>
                      <input type="number" id="fk_idLangue" name="fk_idLangue" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <input type="text" name="description" defaultValue={""}></input>
                  </td>
                  <td>
                    <>
                      <input type="submit" name="CREATE" idbutton={editMode.length-ROW_AJOUT} value="Envoyer"  />
                      {/* <button className='descriptions-form-envoyer' onClick={(e) => {createDescription(e)}} >Envoyer</button> */}
                      <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                    </>
                  </td>
                </tr>
                :
                <tr>
                  <td></td>
                  <td>
                    <div onClick={ () => {
                      // setDateDebutDescription(new Date(Date.now())); setDateFinDescription(new Date(Date.now()));
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

export default GestionDescriptions;