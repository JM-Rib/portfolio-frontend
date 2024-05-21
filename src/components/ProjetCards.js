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
function ProjetCards(props) {
  const [editMode, setEditMode] = useState([]);

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

  return (
    <div className="EspaceProjetCards">
      {/* <div className="EspaceProjets"> */}
      <br />
      <br />
      {getProjetsApi.data?.map((projet, n) => (
        <p key={n}>{projet.nomprojet}</p>
      ))}
    </div>
  );
}

export default ProjetCards;