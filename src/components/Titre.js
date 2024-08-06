import React from 'react';
import { Heading, Flex } from '@chakra-ui/react';

function Titre({ fontSize, children }) {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Heading mb="4" fontSize={fontSize}>
        {children}         
      </Heading>
    </Flex> 
  );
}

export default Titre;
