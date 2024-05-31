import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `'KumbhSans', sans-serif`,
    body: `'DMSans', sans-serif`,
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

export default theme