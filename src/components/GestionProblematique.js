import React from 'react';
import './Gestion.css';
import deleteIcon from '../assets/delete.png'
import Bouton from './Bouton';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';


import useApi from '../hooks/useApi';
import problematiqueApi from '../api/problematique'; //Import the API service function

const ROW_AJOUT = 1;
function GestionProblematiques(props) {
  const [editMode, setEditMode] = useState([]);
  
  
  const getProblematiquesApi = useApi(problematiqueApi.getProblematiques);
  
  useEffect(() => { // fetch des données 
    getProblematiquesApi.request(); 
    // eslint-disable-next-line
  }, []);

  useEffect(() => { // intialisation des valeurs d'état pour l'interface
    if (!getProblematiquesApi.loading && getProblematiquesApi.data) {
      var tabEditMode = new Array(getProblematiquesApi.data.length + ROW_AJOUT).fill(false);
      setEditMode(tabEditMode);
    }
    // eslint-disable-next-line
  }, [getProblematiquesApi.data]); 

  const handleSubmit = event => {
    event.preventDefault();
    const id = Number.parseInt(window.event.submitter.id);
    const data = {
      fk_idTheme: event.target.fk_idTheme.value,
      fk_idProjet: event.target.fk_idProjet.value
    }
    //check submit type:
    if(window.event.submitter.name === "CREATE"){
      createProblematique(data);
    }else if(window.event.submitter.name === "EDIT"){
      editProblematique(id, data);
    }
    //reset affichage du tableau apres envoi.
    var tabEditMode = new Array(editMode.length).fill(false);
    setEditMode(tabEditMode);
  }

  const createProblematique = async (data) => {
    try {
      await problematiqueApi.postProblematique(data);
      getProblematiquesApi.request();
    } catch (error) {
    }
  }
  
  const editProblematique = async (id, data) => {
    try {
      await problematiqueApi.putProblematique(id, data);
      getProblematiquesApi.request();
    } catch (err) {
      console.error(err);
    }
  }
  
  const removeProblematique = async (id) => {
    const choice = window.confirm("Êtes vous sûr de vouloir supprimer ce problematique?\n\n\nUne fois supprimé tout les inscrits seront enlevés et il ne pourra plus être récupéré.");
    if (!choice) return;
    try {
      await problematiqueApi.deleteProblematique(id);
      getProblematiquesApi.request();
    } catch (error) {
    }
  }
  
  const annuler = () => {//reinitialise les champs d'edition.
    var tabEditMode = new Array(editMode.length).fill(false);//reset affichage du tableau apres envoi.
    setEditMode(tabEditMode);        
  }

	return (
    <div className="EspaceGestion">
      {/* <div className="EspaceProblematiques"> */}
      <Bouton  nom="Accueil" type="lien" lien={"/index"}  />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='tl-th th-visible'>Fk_idtheme</th>
              <th className='tr-th th-visible'>Fk_idprojet</th>
            </tr>
          </thead>
          <tbody>
            {getProblematiquesApi.data?.map( (problematique, n) => ( 
              <tr key={"tabgestion-"+n} className="tr-visible"> 
                <td>{ editMode[n] ?
                  <img src={deleteIcon} className="gestion-delete-icon" alt="" onClick={() => removeProblematique(problematique.pk_idProblematique)} />
                  :
                  null }
                </td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idTheme" name="fk_idTheme" defaultValue={problematique.fk_idTheme}></input>
                  </>
                :
                  problematique.fk_idTheme }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idProjet" name="fk_idProjet" defaultValue={problematique.fk_idProjet}></input>
                  </>
                :
                  problematique.fk_idProjet }</td>
                <td>{editMode[n] ?
                  <>
                    <input type="submit" name="EDIT" value="Envoyer" id={`${problematique.pk_idProblematique}`}  />
                    <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                  </>
                    :
                  <div onClick={ () => {
                    // setDateDebutProblematique(new Date(problematique.date1Problematique)); setDateFinProblematique(new Date(problematique.date2Problematique))
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
                      <input type="number" id="fk_idProjet" name="fk_idProjet" defaultValue={""}></input>
                    </>
                  </td>
                  <td>
                    <>
                      <input type="submit" name="CREATE" idbutton={editMode.length-ROW_AJOUT} value="Envoyer"  />
                      {/* <button className='problematiques-form-envoyer' onClick={(e) => {createProblematique(e)}} >Envoyer</button> */}
                      <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                    </>
                  </td>
                </tr>
                :
                <tr>
                  <td></td>
                  <td>
                    <div onClick={ () => {
                      // setDateDebutProblematique(new Date(Date.now())); setDateFinProblematique(new Date(Date.now()));
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

export default GestionProblematiques;