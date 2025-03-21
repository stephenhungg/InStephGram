import React from 'react'
import { Container, Flex, Text, Link, HStack, Button } from "@chakra-ui/react"
import { FaPlusSquare, FaUserCircle } from "react-icons/fa"
const NavBar = () => {
  return (<Container maxW={"1140px"} px={4} >
    <Flex 
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
            base:'column',
            sm:"row"
        }}
    >
        <Text fontSize={{base:"22", sm:"28"}} fontWeight={"bold"} textAlign={"center"} bgClip={"text"}>
            <Link to={"/"}>Beh</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
            <Button>
                <FaUserCircle fontSize={20} />
            </Button>
            </Link>
            <Link to={"/post"}>
            <Button>
                <FaPlusSquare fontSize={20} />
            </Button>
            </Link>

        </HStack>
        </Flex>
    </Container>
  )
}

export default NavBar