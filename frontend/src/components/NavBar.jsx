import React from 'react'
import { Container, Flex, Text, HStack, Button, Box } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { FaPlusSquare, FaUserCircle, FaTrophy } from "react-icons/fa"
import { useUserGlobal } from '../global/user'
import { RouterLink } from 'react-router-dom'

const NavBar = () => {
  const { currentUser, setCurrentUser } = useUserGlobal()
  const navigate = useNavigate()

  return (
    <Box bg="whiteAlpha.200" px={4} py={2}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Link as={RouterLink} to="/" color="white" fontWeight="bold" fontSize="xl">
            InStephGram
          </Link>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Link as={RouterLink} to="/" color="white" _hover={{ color: "blue.400" }}>
              Home
            </Link>
            <Link as={RouterLink} to="/about" color="white" _hover={{ color: "blue.400" }}>
              About
            </Link>
            <Link as={RouterLink} to="/technical" color="white" _hover={{ color: "blue.400" }}>
              Technical Overview
            </Link>
            {currentUser && (
              <Link as={RouterLink} to="/post" color="white" _hover={{ color: "blue.400" }}>
                Create Post
              </Link>
            )}
          </HStack>
        </HStack>

        <HStack spacing={4}>
          {currentUser ? (
            <>
              <Link as={RouterLink} to="/acc" color="white" _hover={{ color: "blue.400" }}>
                Account
              </Link>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => {
                  setCurrentUser(null)
                  navigate('/login')
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                variant="outline"
                colorScheme="whiteAlpha"
                size="sm"
                onClick={() => navigate('/create')}
              >
                Sign Up
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  )
}

export default NavBar