import React, { useState } from 'react';
import { Box, Button, Container, Heading, Input, VStack, Text, Link } from '@chakra-ui/react';
import { useUserGlobal } from '../global/user';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const CreateAccPage = () => {
    const [newAcc, setNewAcc] = useState({
        username: "",
        email: "",
        password: "",
    });
    const {createUser} = useUserGlobal();
    const navigate = useNavigate();

    const handleAddUser = async() => {
        const { success } = await createUser(newAcc);
        if (success) {
            navigate('/');
        } else {
            console.error('Failed to create account');
        }
        setNewAcc({
            username: "",
            email: "",
            password: "",
        });
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading 
                    as={"h1"} 
                    size={"2xl"} 
                    textAlign={"center"} 
                    mb={8} 
                    bgClip="text"
                    color="white"
                >
                    Create Account
                </Heading>
                <Box 
                    w={"full"} 
                    p={8} 
                    rounded={"lg"} 
                    shadow={"lg"} 
                    bg="whiteAlpha.200" 
                    backdropFilter="blur(10px)"
                >
                    <VStack spacing={6}>
                        <Input 
                            placeholder='Username' 
                            type="text"
                            value={newAcc.username} 
                            onChange={(e) => setNewAcc({ ...newAcc, username: e.target.value })}
                            size="lg"
                            variant="filled"
                            bg="whiteAlpha.300"
                            color="white"
                            _placeholder={{ color: "gray.400" }}
                            _hover={{ bg: "whiteAlpha.400" }}
                            _focus={{ 
                                bg: "whiteAlpha.500",
                                borderColor: "blue.500"
                            }}
                        />
                        <Input 
                            placeholder='Email' 
                            type="email"
                            value={newAcc.email} 
                            onChange={(e) => setNewAcc({ ...newAcc, email: e.target.value })}
                            size="lg"
                            variant="filled"
                            bg="whiteAlpha.300"
                            color="white"
                            _placeholder={{ color: "gray.400" }}
                            _hover={{ bg: "whiteAlpha.400" }}
                            _focus={{ 
                                bg: "whiteAlpha.500",
                                borderColor: "blue.500"
                            }}
                        />
                        <Input 
                            placeholder='Password' 
                            type="password"
                            value={newAcc.password} 
                            onChange={(e) => setNewAcc({ ...newAcc, password: e.target.value })}
                            size="lg"
                            variant="filled"
                            bg="whiteAlpha.300"
                            color="white"
                            _placeholder={{ color: "gray.400" }}
                            _hover={{ bg: "whiteAlpha.400" }}
                            _focus={{ 
                                bg: "whiteAlpha.500",
                                borderColor: "blue.500"
                            }}
                        />
                        <Button 
                            onClick={handleAddUser}
                            w='full'
                            size="lg"
                            colorScheme="blue"
                            mt={4}
                            _hover={{ 
                                transform: 'scale(1.02)',
                                bg: "blue.500"
                            }}
                            transition="all 0.2s"
                        >
                            Create Account
                        </Button>
                        <Text textAlign="center" color="gray.400">
                            Already have an account?{" "}
                            <Link 
                                as={RouterLink} 
                                to="/login" 
                                color="blue.400"
                                _hover={{ 
                                    color: "blue.300",
                                    textDecoration: "underline"
                                }}
                            >
                                Login here
                            </Link>
                        </Text>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreateAccPage;