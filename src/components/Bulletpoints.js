import React from 'react';
import { Card, CardBody, Heading, Box, Container, Image, Text } from '@chakra-ui/react';

function Bulltetpoints(props) {
  return (
    <Container maxW='3xl' bg='alpha'>
      <Box
        borderRadius="md"
        _hover={{
          transform: 'scale(1.05)',
          transition: 'transform 0.6s ease-in-out',
          boxShadow: '0 0 15px 6px rgba(150, 30, 255, 0.4)', 
        }}
        position="relative"
        w="100%"
      >
        <Box>
          {props.texte1}
        </Box>
      </Box>
    </Container>
  );
}

export default Bulltetpoints;
