'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: `'Geist Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Courier New', monospace`,
    body: `'Geist Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Courier New', monospace`,
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white',
        fontFamily: `'Geist Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Courier New', monospace`,
        fontWeight: 300, // Light weight by default
      }
    }
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 300, // Changed from 400 to 300
    medium: 400, // Changed from 500 to 400
    semibold: 500, // Changed from 600 to 500
    bold: 600, // Changed from 700 to 600
    extrabold: 700, // Changed from 800 to 700
    black: 800, // Changed from 900 to 800
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
    },
    Text: {
      baseStyle: {
        fontWeight: 300, // Light weight for all text
      }
    },
    Heading: {
      baseStyle: {
        fontWeight: 400, // Medium weight for headings
      }
    },
    Button: {
      baseStyle: {
        fontWeight: 400, // Medium weight for buttons
        backdropFilter: 'blur(10px)',
        border: '1px solid',
        borderColor: 'whiteAlpha.200',
        _hover: {
          transform: 'scale(1.02)',
          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
        }
      },
      variants: {
        glass: {
          bg: 'rgba(59, 130, 246, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 4px 16px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          _hover: {
            bg: 'rgba(59, 130, 246, 0.3)',
            transform: 'scale(1.02)',
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
          }
        }
      }
    },
    Input: {
      baseStyle: {
        field: {
          fontWeight: 300, // Light weight for input text
          bg: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          _hover: {
            bg: 'rgba(255, 255, 255, 0.12)',
            borderColor: 'rgba(255, 255, 255, 0.25)',
          },
          _focus: {
            bg: 'rgba(255, 255, 255, 0.15)',
            borderColor: 'rgba(59, 130, 246, 0.5)',
            boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }
        }
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
