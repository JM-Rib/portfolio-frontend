import React from 'react';

import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, Tag, Box, HStack } from '@chakra-ui/react'

function CardProjet(props) {
  return (
    <Box
      _hover={{
        transform: 'scale(1.05)',
        transition: 'transform 0.3s ease-in-out'
      }}
    > 
      <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline' >
        <Stack zIndex="1">
          <CardBody >
            <Heading size='md' color="white">{props.title}</Heading>
            <Text py='2' color="white" w={[100,200,250]} maxHeight={[50,70,100]} overflow="hidden">
              {`${props.description.substring(0,120)}${props.description.length>126 ? "..." : ""}`}
            </Text>
          </CardBody>
          <CardFooter>
            <HStack spacing={2}>
            {props.themes.map((theme,n)=>(
              <Tag key={n}>
                {theme}
              </Tag>
            ))}
            </HStack>
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
    </Box>
  );
}

export default CardProjet;