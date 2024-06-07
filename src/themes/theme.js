import { extendTheme, theme as base } from "@chakra-ui/react";


const theme = extendTheme({
  fonts: {
    body: `'DMSans', sans-serif`,
    heading: `'KumbhSans', sans-serif`,
    title: `'Alata', monospace`,
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
        color: props.colorMode === "dark" ? "white" : "black",
      },
      html: {
        colorScheme: props.colorMode === "dark" ? "dark" : "light",
      }
    }),
  } 
})

export default theme;