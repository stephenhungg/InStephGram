import React, { useState } from 'react';
import { Box, Button, Container, Heading, Input, VStack, Text, Link } from '@chakra-ui/react';
import { useUserGlobal } from '../global/user';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useUserGlobal();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",   
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            
            if (data.success) {
                setCurrentUser(data.data);
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Login
                </Heading>
                <Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input 
                            placeholder='Username' 
                            type="text"
                            value={credentials.username} 
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            size="lg"
                            variant="filled"
                            bg="whiteAlpha.300"
                            color="white"
                            _placeholder={{ color: "gray.400" }}
                            _hover={{ bg: "whiteAlpha.400" }}
                            _focus={{ 
                                bg: "whiteAlpha.500",
                                borderColor: "whiteAlpha.500"
                            }}
                        />
                        <Input 
                            placeholder='Password' 
                            type="password"
                            value={credentials.password} 
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            size="lg"
                            variant="filled"
                            bg="whiteAlpha.300"
                            color="white"
                            _placeholder={{ color: "gray.400" }}
                            _hover={{ bg: "whiteAlpha.400" }}
                            _focus={{ 
                                bg: "whiteAlpha.500",
                                borderColor: "whiteAlpha.500"
                            }}
                        />
                        <Button 
                            onClick={handleLogin} 
                            w='full'
                            size="lg"
                            isLoading={isLoading}
                            loadingText="Logging in..."
                            _hover={{ transform: 'scale(1.02)' }}
                            transition="all 0.2s"
                            bg="whiteAlpha.500"
                            colorScheme="whiteAlpha"
                        >
                            Login
                        </Button>
                        <Text textAlign="center" mt={4}>
                            Don't have an account?{" "}
                            <Link as={RouterLink} to="/create" color="blue.500" fontWeight="bold">
                                Create one
                            </Link>
                        </Text>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default LoginPage;
