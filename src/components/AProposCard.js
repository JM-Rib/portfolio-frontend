import React from 'react';
import { Card, CardBody, Heading, Box, Container, Image, Text } from '@chakra-ui/react';

function AProposCard(props) {
  return (
    <Container maxW='4xl' bg='alpha'>
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
        <Card
          variant='outline'
          bg="linear-gradient(90deg, rgba(150,30,255,1) 0%, rgba(150,30,255,0.8) 50%, rgba(150,30,255,0.6) 100%)"
        >
          <CardBody fontFamily="body" color="white" fontSize="lg" overflow="hidden" textWrap="balance" textAlign="left" textIndent="0.5em">
            <Image
              src={"photo.png"}
              alt={props.imageAlt}
              borderRadius="full"
              height="150px"
              width="150px"
              position="absolute"
              top="-7"
              left="-15"
            />
            <Box
              height="100px"
              width="125px"
              float="left"
              borderRadius="full"
            />
            {props.description}
          </CardBody>
        </Card>
      </Box>
    </Container>
  );
}

export default AProposCard;
