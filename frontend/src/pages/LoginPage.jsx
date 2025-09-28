import React, { useState } from 'react';
import { Box, Button, Container, Heading, Input, VStack, Text, Link, useToast } from '@chakra-ui/react';
import { useUserGlobal } from '../global/user';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",   
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setCurrentUser } = useUserGlobal();
    const toast = useToast();

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            
            if (data.success) {
                setCurrentUser(data.data);
                toast({
                    title: "Login successful",
                    description: "Welcome back!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate('/');
            } else {
                toast({
                    title: "Login failed",
                    description: data.message || "Invalid username or password",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            toast({
                title: "Error",
                description: "An error occurred while logging in. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
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
                    opacity={0}
                    animation="fadeInDown 1s ease-out forwards"
                    sx={{
                        '@keyframes fadeInDown': {
                            '0%': {
                                opacity: 0,
                                transform: 'translateY(-20px)'
                            },
                            '100%': {
                                opacity: 1,
                                transform: 'translateY(0)'
                            }
                        }
                    }}
                >
                    Login
                </Heading>
                <Box 
                    w={"full"} 
                    p={8} 
                    rounded={"lg"} 
                    shadow={"2xl"} 
                    bg="rgba(255, 255, 255, 0.05)"
                    backdropFilter="blur(20px)"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    boxShadow="0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                    opacity={0}
                    animation="fadeInUp 1s ease-out 0.2s forwards"
                    sx={{
                        '@keyframes fadeInUp': {
                            '0%': {
                                opacity: 0,
                                transform: 'translateY(30px)'
                            },
                            '100%': {
                                opacity: 1,
                                transform: 'translateY(0)'
                            }
                        }
                    }}
                >
                    <VStack spacing={4}>
                        <Input 
                            placeholder='Username' 
                            type="text"
                            value={credentials.username} 
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            size="lg"
                            variant="filled"
                            color="white"
                            _placeholder={{ color: "gray.400" }}
                        />
                        <Input 
                            placeholder='Password' 
                            type="password"
                            value={credentials.password} 
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            size="lg"
                            variant="filled"
                            color="white"
                            _placeholder={{ color: "gray.400" }}
                        />
                        <Button 
                            onClick={handleLogin} 
                            w='full'
                            size="lg"
                            isLoading={isLoading}
                            loadingText="Logging in..."
                            _hover={{ transform: 'scale(1.02)' }}
                            transition="all 0.2s"
                            colorScheme="blue"
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
    );
};

export default LoginPage;
