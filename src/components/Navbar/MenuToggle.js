import React from "react"
import { Box } from "@chakra-ui/react"
import { FaXmark } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";


export default function MenuToggle ({ toggle, isOpen }) {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <FaXmark /> : <FaBars />}
    </Box>
  )
}