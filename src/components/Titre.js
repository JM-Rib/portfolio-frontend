import React from 'react';
import { Heading, Flex } from '@chakra-ui/react';

function Titre(props) {

  return (
    <Flex alignItems="center" justifyContent="center" >
      <Heading mb="4">
        {props.titre}         
      </Heading>
    </Flex> 
  );
}

export default Titre;