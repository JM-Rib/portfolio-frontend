import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { Box, Stack, Menu, MenuButton, MenuList, MenuItem as ChakraMenuItem, Button } from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa6";


export default function MenuLinks ({ isOpen }) {
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

    useEffect(() => {
      localStorage.setItem("language", language);
    }, [language]);

    const handleLanguageChange = (lang) => {
      setLanguage(lang);
    };


    return (
      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/projects">Mes projets </MenuItem>

          <Menu>
            <MenuButton as={Button} rightIcon={<FaAngleDown />}>
              {language === "en" ? "🇬🇧" : "🇫🇷"}
            </MenuButton>
            <MenuList>
              <ChakraMenuItem onClick={() => handleLanguageChange("en")}>🇬🇧 English</ChakraMenuItem>
              <ChakraMenuItem onClick={() => handleLanguageChange("fr")}>🇫🇷 Français</ChakraMenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Box>
    );
  };
  