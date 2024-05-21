import React from 'react';
import './Gestion.css';
import deleteIcon from '../assets/delete.png'
import Bouton from './Bouton';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';

import DatePicker from "react-datepicker";
import { convertDateHuman, convertDateSql } from '../utils/dateConverter'; // Import the API service function

import useApi from '../hooks/useApi';
import projetApi from '../api/projet'; //Import the API service function

const ROW_AJOUT = 1;
function GestionProjets(props) {
  const [editMode, setEditMode] = useState([]);
  
  const [dateDebutProjet, setDateDebutProjet] = useState(new Date());
  const [dateDerniereMaj, setDateDerniereMaj] = useState(new Date());
  
  const getProjetsApi = useApi(projetApi.getProjets);
  
  useEffect(() => { // fetch des données 
    getProjetsApi.request(); 
    // eslint-disable-next-line
  }, []);

  useEffect(() => { // intialisation des valeurs d'état pour l'interface
    if (!getProjetsApi.loading && getProjetsApi.data) {
      var tabEditMode = new Array(getProjetsApi.data.length + ROW_AJOUT).fill(false);
      setEditMode(tabEditMode);
    }
    // eslint-disable-next-line
  }, [getProjetsApi.data]); 

  const handleSubmit = event => {
    event.preventDefault();
    const id = Number.parseInt(window.event.submitter.id);
    const data = {
      pk_idProjet: id,
      nomProjet: event.target.nomProjet.value,
      dateDebutProjet: convertDateSql(dateDebutProjet),
      dateDerniereMaj: convertDateSql(dateDerniereMaj),
      idGithub: event.target.idGithub.value,
      lienHosting: event.target.lienHosting.value
    }
    //check submit type:
    if(window.event.submitter.name === "CREATE"){
      createProjet(data);
    }else if(window.event.submitter.name === "EDIT"){
      editProjet(id, data);
    }
    //reset affichage du tableau apres envoi.
    var tabEditMode = new Array(editMode.length).fill(false);
    setEditMode(tabEditMode);
  }

  const createProjet = async (data) => {
    try {
      await projetApi.postProjet(data);
      getProjetsApi.request();
    } catch (error) {
    }
  }
  
  const editProjet = async (id, data) => {
    try {
      await projetApi.putProjet(id, data);
      getProjetsApi.request();
    } catch (err) {
      console.error(err);
    }
  }
  
  const removeProjet = async (id) => {
    const choice = window.confirm("Êtes vous sûr de vouloir supprimer ce projet?\n\n\nUne fois supprimé tout les inscrits seront enlevés et il ne pourra plus être récupéré.");
    if (!choice) return;
    try {
      await projetApi.deleteProjet(id);
      getProjetsApi.request();
    } catch (error) {
    }
  }
  
  const annuler = () => {//reinitialise les champs d'edition.
    var tabEditMode = new Array(editMode.length).fill(false);//reset affichage du tableau apres envoi.
    setEditMode(tabEditMode);        
  }

	return (
    <div className="EspaceGestion">
      {/* <div className="EspaceProjets"> */}
      <Bouton  nom="Accueil" type="lien" lien={"/index"}  />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='tl-th th-visible'>Pk_idprojet</th>
              <th className='th-visible'>Nomprojet</th>
              <th className='th-visible'>Datedebutprojet</th>
              <th className='th-visible'>Datedernieremaj</th>
              <th className='th-visible'>Idgithub</th>
              <th className='tr-th th-visible'>Lienhosting</th>
            </tr>
          </thead>
          <tbody>
            {getProjetsApi.data?.map( (projet, n) => ( 
              <tr key={"tabgestion-"+n} className="tr-visible"> 
                <td>{ editMode[n] ?
                  <img src={deleteIcon} className="gestion-delete-icon" alt="" onClick={() => removeProjet(projet.pk_idProjet)} />
                  :
                  null }
                </td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="pk_idProjet" name="pk_idProjet" defaultValue={projet.pk_idProjet}></input>
                  </>
                :
                  projet.pk_idProjet }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <input type="text" name="nomProjet" defaultValue={projet.nomProjet}></input>
                :
                  projet.nomProjet }</td>
                <td className='td-visible'>{ editMode[n] ?
        <>
       <DatePicker selected={dateDebutProjet} dateFormat="dd/MM/yyyy" onChange={(date) => setDateDebutProjet(date)} />
        </>
      :
      convertDateHuman(new Date(projet.dateDebutProjet)) }</td><td className='td-visible'>{ editMode[n] ?
        <>
       <DatePicker selected={dateDerniereMaj} dateFormat="dd/MM/yyyy" onChange={(date) => setDateDerniereMaj(date)} />
        </>
      :
      convertDateHuman(new Date(projet.dateDerniereMaj)) }</td><td className='td-visible'>{ editMode[n] ?
                  <input type="text" name="idGithub" defaultValue={projet.idGithub}></input>
                :
                  projet.idGithub }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <input type="text" name="lienHosting" defaultValue={projet.lienHosting}></input>
                :
                  projet.lienHosting }</td>
                <td>{editMode[n] ?
                  <>
                    <input type="submit" name="EDIT" value="Envoyer" id={`${projet.pk_idProjet}`}  />
                    <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                  </>
                    :
                  <div onClick={ () => {
                    // setDateDebutProjet(new Date(projet.date1Projet)); setDateFinProjet(new Date(projet.date2Projet))
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
                      <input type="number" id="pk_idProjet" name="pk_idProjet" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <input type="text" name="nomProjet" defaultValue={""}></input>
                  </td>
                  <td className='td-visible'>
                    <>
                      <DatePicker selected={dateDebutProjet} dateFormat="dd/MM/yyyy" onChange={(date) => setDateDebutProjet(date)} />
                    </>
                  </td>
                  <td className='td-visible'>
                    <>
                      <DatePicker selected={dateDerniereMaj} dateFormat="dd/MM/yyyy" onChange={(date) => setDateDerniereMaj(date)} />
                    </>
                  </td>
                  <td className='td-visible'>
                    <input type="text" name="idGithub" defaultValue={""}></input>
                  </td>
                  <td className='td-visible'>
                    <input type="text" name="lienHosting" defaultValue={""}></input>
                  </td>
                  <td>
                    <>
                      <input type="submit" name="CREATE" idbutton={editMode.length-ROW_AJOUT} value="Envoyer"  />
                      {/* <button className='projets-form-envoyer' onClick={(e) => {createProjet(e)}} >Envoyer</button> */}
                      <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                    </>
                  </td>
                </tr>
                :
                <tr>
                  <td></td>
                  <td>
                    <div onClick={ () => {
                      // setDateDebutProjet(new Date(Date.now())); setDateFinProjet(new Date(Date.now()));
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

export default GestionProjets;