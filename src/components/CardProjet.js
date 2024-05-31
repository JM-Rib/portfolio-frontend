// CardProjet.js
import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Tag, Box, Center, Wrap, WrapItem } from '@chakra-ui/react';

function CardProjet(props) {
  return (
    <Box
      borderRadius="md"
      _hover={{
        transform: 'scale(1.05)',
        transition: 'transform 0.6s ease-in-out',
        boxShadow: '0 0 15px 6px rgba(255, 20, 255, 0.4)',
        transition: 'box-shadow 0.3s ease-in-out',
      }}
    >
      <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
        <Stack zIndex="1">
          <CardBody>
            <Heading size='md' color="white">{props.title}</Heading>
            <Center>
              <Text py='2' color="white" noOfLines={5} overflow="hidden">
                {`${props.description.substring(0, 120)}${props.description.length > 126 ? "..." : ""}`}
              </Text>
            </Center>
          </CardBody>
          <CardFooter>
            <Wrap spacing={1} rowGap={2}>
              {props.themes.map((theme, n) => (
                <WrapItem key={n}>
                  <Tag colorScheme='orange'>
                    {theme}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </CardFooter>
        </Stack>
        <Image
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
