import React from 'react';
import { Heading, Flex } from '@chakra-ui/react';

function Titre({ children }) {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Heading mb="4">
        {children}         
      </Heading>
    </Flex> 
  );
}

export default Titre;
