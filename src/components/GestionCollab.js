import React from 'react';
import './Gestion.css';
import deleteIcon from '../assets/delete.png'
import Bouton from './Bouton';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';


import useApi from '../hooks/useApi';
import collabApi from '../api/collab'; //Import the API service function

const ROW_AJOUT = 1;
function GestionCollabs(props) {
  const [editMode, setEditMode] = useState([]);
  
  
  const getCollabsApi = useApi(collabApi.getCollabs);
  
  useEffect(() => { // fetch des données 
    getCollabsApi.request(); 
    // eslint-disable-next-line
  }, []);

  useEffect(() => { // intialisation des valeurs d'état pour l'interface
    if (!getCollabsApi.loading && getCollabsApi.data) {
      var tabEditMode = new Array(getCollabsApi.data.length + ROW_AJOUT).fill(false);
      setEditMode(tabEditMode);
    }
    // eslint-disable-next-line
  }, [getCollabsApi.data]); 

  const handleSubmit = event => {
    event.preventDefault();
    const id = Number.parseInt(window.event.submitter.id);
    const data = {
      fk_idProjet: event.target.fk_idProjet.value,
      fk_idProfil: event.target.fk_idProfil.value
    }
    //check submit type:
    if(window.event.submitter.name === "CREATE"){
      createCollab(data);
    }else if(window.event.submitter.name === "EDIT"){
      editCollab(id, data);
    }
    //reset affichage du tableau apres envoi.
    var tabEditMode = new Array(editMode.length).fill(false);
    setEditMode(tabEditMode);
  }

  const createCollab = async (data) => {
    try {
      await collabApi.postCollab(data);
      getCollabsApi.request();
    } catch (error) {
    }
  }
  
  const editCollab = async (id, data) => {
    try {
      await collabApi.putCollab(id, data);
      getCollabsApi.request();
    } catch (err) {
      console.error(err);
    }
  }
  
  const removeCollab = async (id) => {
    const choice = window.confirm("Êtes vous sûr de vouloir supprimer ce collab?\n\n\nUne fois supprimé tout les inscrits seront enlevés et il ne pourra plus être récupéré.");
    if (!choice) return;
    try {
      await collabApi.deleteCollab(id);
      getCollabsApi.request();
    } catch (error) {
    }
  }
  
  const annuler = () => {//reinitialise les champs d'edition.
    var tabEditMode = new Array(editMode.length).fill(false);//reset affichage du tableau apres envoi.
    setEditMode(tabEditMode);        
  }

	return (
    <div className="EspaceGestion">
      {/* <div className="EspaceCollabs"> */}
      <Bouton  nom="Accueil" type="lien" lien={"/index"}  />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='tl-th th-visible'>Fk_idprojet</th>
              <th className='tr-th th-visible'>Fk_idprofil</th>
            </tr>
          </thead>
          <tbody>
            {getCollabsApi.data?.map( (collab, n) => ( 
              <tr key={"tabgestion-"+n} className="tr-visible"> 
                <td>{ editMode[n] ?
                  <img src={deleteIcon} className="gestion-delete-icon" alt="" onClick={() => removeCollab(collab.pk_idCollab)} />
                  :
                  null }
                </td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idProjet" name="fk_idProjet" defaultValue={collab.fk_idProjet}></input>
                  </>
                :
                  collab.fk_idProjet }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idProfil" name="fk_idProfil" defaultValue={collab.fk_idProfil}></input>
                  </>
                :
                  collab.fk_idProfil }</td>
                <td>{editMode[n] ?
                  <>
                    <input type="submit" name="EDIT" value="Envoyer" id={`${collab.pk_idCollab}`}  />
                    <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                  </>
                    :
                  <div onClick={ () => {
                    // setDateDebutCollab(new Date(collab.date1Collab)); setDateFinCollab(new Date(collab.date2Collab))
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
                      <input type="number" id="fk_idProfil" name="fk_idProfil" defaultValue={""}></input>
                    </>
                  </td>
                  <td>
                    <>
                      <input type="submit" name="CREATE" idbutton={editMode.length-ROW_AJOUT} value="Envoyer"  />
                      {/* <button className='collabs-form-envoyer' onClick={(e) => {createCollab(e)}} >Envoyer</button> */}
                      <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                    </>
                  </td>
                </tr>
                :
                <tr>
                  <td></td>
                  <td>
                    <div onClick={ () => {
                      // setDateDebutCollab(new Date(Date.now())); setDateFinCollab(new Date(Date.now()));
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

export default GestionCollabs;