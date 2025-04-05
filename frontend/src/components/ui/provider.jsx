'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white'
      }
    }
  },
  components: {
    Box: {
      baseStyle: {
        bg: 'whiteAlpha.50'  // Lighter than pure black for components
      }
    },
    Container: {
      baseStyle: {
        maxW: 'container.xl'
      }
    }
  },
  colors: {
    black: {
      50: '#f5f5f5',
      100: '#e6e6e6',
      200: '#cccccc',
      300: '#b3b3b3',
      400: '#999999',
      500: '#808080',
      600: '#666666',
      700: '#4d4d4d',
      800: '#333333',
      900: '#1a1a1a',
    }
  }
})

export function Provider({ children }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}
