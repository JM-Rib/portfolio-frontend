import React from 'react';
import { useState, useEffect } from 'react';
import './Gestion.css';
import deleteIcon from '../assets/delete.png'
import Bouton from './Bouton';
import "react-datepicker/dist/react-datepicker.css";
import CardProjet from './CardProjet'; // Import the API service function

import { Container, Grid , GridItem } from '@chakra-ui/react'

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

  const gridArgs = {

  }

  return (
    <div className="EspaceProjetCards">
      {/* <div className="EspaceProjets"> */}
      <br />
      <br />
      <Container maxW='2xl'  bg='gray.50' >
      <Grid
        templateColumns='repeat(2, 1fr)'
        gap={4}
        centercontent="true"
      > 
      {getProjetsApi.data?.map((projet, n) => (
          <GridItem maxH='md' key={n} rowSpan={2} colSpan={1} >
            <CardProjet  title={projet.nomprojet} description={projet.description} themes={projet.themes} />
          </GridItem>
      ))}
      </Grid>
      </Container>
    </div>
  );
}

export default ProjetCards;