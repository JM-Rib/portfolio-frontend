import React from 'react';
import './Gestion.css';
import deleteIcon from '../assets/delete.png'
import Bouton from './Bouton';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';


import useApi from '../hooks/useApi';
import adminApi from '../api/admin'; //Import the API service function

const ROW_AJOUT = 1;
function GestionAdmins(props) {
  const [editMode, setEditMode] = useState([]);
  
  
  const getAdminsApi = useApi(adminApi.getAdmins);
  
  useEffect(() => { // fetch des données 
    getAdminsApi.request(); 
    // eslint-disable-next-line
  }, []);

  useEffect(() => { // intialisation des valeurs d'état pour l'interface
    if (!getAdminsApi.loading && getAdminsApi.data) {
      var tabEditMode = new Array(getAdminsApi.data.length + ROW_AJOUT).fill(false);
      setEditMode(tabEditMode);
    }
    // eslint-disable-next-line
  }, [getAdminsApi.data]); 

  const handleSubmit = event => {
    event.preventDefault();
    const id = Number.parseInt(window.event.submitter.id);
    const data = {
      pk_idAdmin: id,
      identifiant: event.target.identifiant.value,
      mdp: event.target.mdp.value,
      fk_idProfil: event.target.fk_idProfil.value
    }
    //check submit type:
    if(window.event.submitter.name === "CREATE"){
      createAdmin(data);
    }else if(window.event.submitter.name === "EDIT"){
      editAdmin(id, data);
    }
    //reset affichage du tableau apres envoi.
    var tabEditMode = new Array(editMode.length).fill(false);
    setEditMode(tabEditMode);
  }

  const createAdmin = async (data) => {
    try {
      await adminApi.postAdmin(data);
      getAdminsApi.request();
    } catch (error) {
    }
  }
  
  const editAdmin = async (id, data) => {
    try {
      await adminApi.putAdmin(id, data);
      getAdminsApi.request();
    } catch (err) {
      console.error(err);
    }
  }
  
  const removeAdmin = async (id) => {
    const choice = window.confirm("Êtes vous sûr de vouloir supprimer ce admin?\n\n\nUne fois supprimé tout les inscrits seront enlevés et il ne pourra plus être récupéré.");
    if (!choice) return;
    try {
      await adminApi.deleteAdmin(id);
      getAdminsApi.request();
    } catch (error) {
    }
  }
  
  const annuler = () => {//reinitialise les champs d'edition.
    var tabEditMode = new Array(editMode.length).fill(false);//reset affichage du tableau apres envoi.
    setEditMode(tabEditMode);        
  }

	return (
    <div className="EspaceGestion">
      {/* <div className="EspaceAdmins"> */}
      <Bouton  nom="Accueil" type="lien" lien={"/index"}  />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='tl-th th-visible'>Pk_idadmin</th>
              <th className='th-visible'>Identifiant</th>
              <th className='th-visible'>Mdp</th>
              <th className='tr-th th-visible'>Fk_idprofil</th>
            </tr>
          </thead>
          <tbody>
            {getAdminsApi.data?.map( (admin, n) => ( 
              <tr key={"tabgestion-"+n} className="tr-visible"> 
                <td>{ editMode[n] ?
                  <img src={deleteIcon} className="gestion-delete-icon" alt="" onClick={() => removeAdmin(admin.pk_idAdmin)} />
                  :
                  null }
                </td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="pk_idAdmin" name="pk_idAdmin" defaultValue={admin.pk_idAdmin}></input>
                  </>
                :
                  admin.pk_idAdmin }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <select name="identifiant" defaultValue={admin.identifiant}>
                    <option value="CNGT" >CNGT</option>
                    <option value="TMC" >TMC</option>
                    <option value="Tournoi de la toussaint">Tournoi de la toussaint</option>
                    <option value="Tournoi interne">Tournoi interne</option>
                  </select>
                :
                  admin.identifiant }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <select name="mdp" defaultValue={admin.mdp}>
                    <option value="CNGT" >CNGT</option>
                    <option value="TMC" >TMC</option>
                    <option value="Tournoi de la toussaint">Tournoi de la toussaint</option>
                    <option value="Tournoi interne">Tournoi interne</option>
                  </select>
                :
                  admin.mdp }</td>
                <td className='td-visible'>{ editMode[n] ?
                  <>
                    <input type="number" id="fk_idProfil" name="fk_idProfil" defaultValue={admin.fk_idProfil}></input>
                  </>
                :
                  admin.fk_idProfil }</td>
                <td>{editMode[n] ?
                  <>
                    <input type="submit" name="EDIT" value="Envoyer" id={`${admin.pk_idAdmin}`}  />
                    <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                  </>
                    :
                  <div onClick={ () => {
                    // setDateDebutAdmin(new Date(admin.date1Admin)); setDateFinAdmin(new Date(admin.date2Admin))
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
                      <input type="number" id="pk_idAdmin" name="pk_idAdmin" defaultValue={""}></input>
                    </>
                  </td>
                  <td className='td-visible'>
                    <select name="identifiant" defaultValue={""}>
                      <option value="CNGT" >CNGT</option>
                      <option value="TMC" >TMC</option>
                      <option value="Tournoi de la toussaint">Tournoi de la toussaint</option>
                      <option value="Tournoi interne">Tournoi interne</option>
                    </select>
                  </td>
                  <td className='td-visible'>
                    <select name="mdp" defaultValue={""}>
                      <option value="CNGT" >CNGT</option>
                      <option value="TMC" >TMC</option>
                      <option value="Tournoi de la toussaint">Tournoi de la toussaint</option>
                      <option value="Tournoi interne">Tournoi interne</option>
                    </select>
                  </td>
                  <td className='td-visible'>
                    <>
                      <input type="number" id="fk_idProfil" name="fk_idProfil" defaultValue={""}></input>
                    </>
                  </td>
                  <td>
                    <>
                      <input type="submit" name="CREATE" idbutton={editMode.length-ROW_AJOUT} value="Envoyer"  />
                      {/* <button className='admins-form-envoyer' onClick={(e) => {createAdmin(e)}} >Envoyer</button> */}
                      <button className='gestion-form-annuler' onClick={() => {annuler()}} >Annuler</button>
                    </>
                  </td>
                </tr>
                :
                <tr>
                  <td></td>
                  <td>
                    <div onClick={ () => {
                      // setDateDebutAdmin(new Date(Date.now())); setDateFinAdmin(new Date(Date.now()));
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

export default GestionAdmins;