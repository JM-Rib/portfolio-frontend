import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Box } from '@chakra-ui/react';

function WideCard(props) {
  return (
    <Flex alignItems="center" justifyContent="center" >
      <Box
        borderRadius="md"
        overflow="hidden"
        _hover={{
          transform: 'scale(1.05)',
          transition: 'transform 0.6s ease-in-out',
          boxShadow: '0 0 15px 6px rgba(30, 150, 255, 0.4)', 
        }}
        position="relative"
        maxW="1000px"
        w={["87vw","sm","md","xl"]}
        ml={["sm","sm", "", ""]}
        mr={["sm","sm", "", ""]}
      >
        <Card
          direction="column"
          overflow='hidden'
          variant='outline'
          bg="linear-gradient(90deg, rgba(30,150,255,1) 0%, rgba(30,150,255,0.8) 50%, rgba(30,150,255,0.6) 100%)"
        >
          <Stack
            position="relative"
            zIndex="1"
            w="100%"
            h="full"
          >
            <CardBody>
              <Heading textAlign="left" color="white" fontSize="lg" overflow="hidden"> {/* Larger text */}
                {props.description}
              </Heading>
            </CardBody>
            {/* <CardFooter> */}
            {/* </CardFooter> */}
          </Stack>
        </Card>
      </Box>
    </Flex>
  );
}

export default WideCard;
