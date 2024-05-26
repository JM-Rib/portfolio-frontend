import React from 'react';

import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button } from '@chakra-ui/react'

function CardProjet(props) {
  return (
    <div>
      <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
      <Stack zIndex="999">
        <CardBody >
          <Heading size='md' color="white">{props.title}</Heading>
          <Text py='2' color="white">
            {props.description}
          </Text>
        </CardBody>
        <CardFooter>
          <Button variant='solid' colorScheme='blue'>
            Buy Latte
          </Button>
        </CardFooter>
      </Stack>
      <Image
        // objectPosition={"100px 100px"}
        boxSize={"100%"}
        objectFit={"cover"}
        pos="absolute"
        src='./cardcover.png'
        alt={props.title}
        filter="auto"
        blur="4px"
      />
      </Card> 
    </div>
  );
}

export default CardProjet;