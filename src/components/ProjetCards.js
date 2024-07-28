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
  const getProjetsApi = useApi(projetApi.getProjets);

  useEffect(() => { // fetch des données 
    getProjetsApi.request();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="EspaceProjetCards">
      {/* <div className="EspaceProjets"> */}
      <br />
      <br />
      <Container maxW='2xl' bg='alpha' >
        <Grid
          templateColumns={{ base: '1fr', sm: '1fr 1fr', md: '1fr 1fr', lg: '1fr 1fr' }}
          columnGap={[4,8,10]}
          rowGap={[4,6,8]}
          justifyContent="center"
          alignItems="start"
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