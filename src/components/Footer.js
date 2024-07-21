import React, {useState} from 'react';
import TextEmoji from '../components/TextEmoji';
import { Text, Box, Heading, Container, Stack, Flex, Button, Link as ChakraLink } from '@chakra-ui/react';

function Footer({width, isModalOpened}) {
  const [isModalOpen, setIsModalOpen] = useState(isModalOpened);
  return(
      <Box width="100%">
        <Flex 
          direction={['column', 'row']} // Colonne sur petits écrans, ligne sur les grands
          justifyContent="space-between"
          alignItems="center" // Aligner tous les éléments verticalement au centre
          width="100%"
        >
          <Text pt="2" fontSize="md" color="white.500">RIBARIC Jean-Marin, 2024</Text>
          <Text fontSize="md" color="white.500">
          </Text>
          <Text pt="2" fontSize="md" color="white.500">emojis by 3moji.org</Text>
        </Flex>
      </Box>
  );
}

export default Footer;