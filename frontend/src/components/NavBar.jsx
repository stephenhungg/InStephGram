import React from 'react'
import { Container, Flex, Text, HStack, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { FaPlusSquare, FaUserCircle, FaTrophy } from "react-icons/fa"
import { useUserGlobal } from '../global/user'

const NavBar = () => {
    const { currentUser, setCurrentUser } = useUserGlobal()

    const handleLogout = () => {
        setCurrentUser(null)
    }

    return (<Container maxW={"1140px"} px={4} >
        <Flex 
            h={16}
            alignItems="center"
            justifyContent={"space-between"}
            flexDir={{
                base:'column',
                sm:"row"
            }}
        >
            <Text fontSize={{base:"22", sm:"28"}} fontWeight={"bold"} textAlign={"center"} bgClip={"text"} color="white">
                <Link to={"/"}>InStephGram</Link>
            </Text>
            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/about"}>
                    <Button _hover={{ transform: 'scale(1.02)' }}
                            transition="all 0.2s">
                        About
                    </Button>
                </Link>
                <Link to={"/acc"}>
                    <Button _hover={{ transform: 'scale(1.02)' }}
                            transition="all 0.2s">
                        <FaUserCircle fontSize={20} />
                    </Button>
                </Link>
                <Link to={"/post"}>
                    <Button _hover={{ transform: 'scale(1.02)' }}
                            transition="all 0.2s">
                        <FaPlusSquare fontSize={20} />
                    </Button>
                </Link>
                <Link to={"/leaderboard"}>
                    <Button _hover={{ transform: 'scale(1.02)' }}
                            transition="all 0.2s">
                        <FaTrophy fontSize={20} />
                    </Button>
                </Link>
            </HStack>
        </Flex>
    </Container>
    )
}

export default NavBar