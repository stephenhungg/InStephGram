'use client'

import { useColorMode as useChakraColorMode } from '@chakra-ui/color-mode'
import { IconButton } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

export function useColorMode() {
  return useChakraColorMode()
}

export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />
}

export function ColorModeToggle(props) {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      variant="ghost"
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      aria-label={`Toggle ${colorMode === 'dark' ? 'Light' : 'Dark'} Mode`}
      color="white"
      _hover={{ bg: 'whiteAlpha.100' }}
      _active={{ bg: 'whiteAlpha.200' }}
      {...props}
    />
  )
}

// These are no longer needed since we're using Chakra UI's built-in color mode
export function ColorModeProvider({ children }) {
  return children
}

export function ColorModeScript() {
  return null
}

export const LightMode = React.forwardRef(function LightMode(props, ref) {
  return (
    <Span
      color='fg'
      display='contents'
      className='chakra-theme light'
      colorPalette='gray'
      colorScheme='light'
      ref={ref}
      {...props}
    />
  )
})

export const DarkMode = React.forwardRef(function DarkMode(props, ref) {
  return (
    <Span
      color='fg'
      display='contents'
      className='chakra-theme dark'
      colorPalette='gray'
      colorScheme='dark'
      ref={ref}
      {...props}
    />
  )
})
