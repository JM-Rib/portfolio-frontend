import React from 'react';
import { Card, CardBody, Stack, Heading, Box, Container, Image, Flex } from '@chakra-ui/react';

function AProposCard(props) {
  return (
    <Container maxW='4xl' bg='alpha'>
      <Box
        borderRadius="md"
        overflow="hidden"
        _hover={{
          transform: 'scale(1.05)',
          transition: 'transform 0.6s ease-in-out',
          boxShadow: '0 0 15px 6px rgba(150, 30, 255, 0.4)', 
        }}
        position="relative"
        w="100%" // Ensure the box takes full width of the container
      >
        <Card
          direction="row" // Changed to row to align image and text side by side
          overflow='hidden'
          variant='outline'
          bg="linear-gradient(90deg, rgba(150,30,255,1) 0%, rgba(150,30,255,0.8) 50%, rgba(150,30,255,0.6) 100%)"
        >
          <Flex
            direction={{ base: 'column', md: 'row' }} // Switch to row for medium and larger screens
            h="full"
          >
            <Image
              src={"photo.png"} // The source of the image
              alt={props.imageAlt} // Alt text for the image
              boxSize={{ base: '100%', md: '150px' }} // Adjust size for different viewports
              objectFit="cover"
              borderRadius={"md"}
              maxH={["200px", "200px", "auto", "auto"]}
              margin={[0,0, 2, 2]}
            />
            <CardBody 
              order={{ base: 1, md: 1 }} 
            >
              <Heading textAlign="left" color="white" fontSize="lg" overflow="hidden">
                {props.description}
              </Heading>
            </CardBody>
          </Flex>
        </Card>
      </Box>
    </Container>
  );
}

export default AProposCard;
