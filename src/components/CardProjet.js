import React from 'react';

import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button } from '@chakra-ui/react'

function CardProjet(props) {
  return (
    <div>
      <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src='./photo.png'
        alt='Caffe Latte'
      />
      <Stack>
        <CardBody>
          <Heading size='md'>{props.title}</Heading>
          <Text py='2'>
            {props.description}
          </Text>
        </CardBody>
        <CardFooter>
          <Button variant='solid' colorScheme='blue'>
            Buy Latte
          </Button>
        </CardFooter>
      </Stack>
      </Card> 
    </div>
  );
}

export default CardProjet;