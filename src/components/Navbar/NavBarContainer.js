import React from "react"
import { Flex } from "@chakra-ui/react"

export default function NavBarContainer ({ children, ...props }) {
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        minH="100px"
        p={8}
        bg={["primary.500", "primary.500", "transparent", "transparent"]}
        color={["white", "white", "primary.700", "primary.700"]}
        {...props}
      >
        {children}
      </Flex>
    );
  };