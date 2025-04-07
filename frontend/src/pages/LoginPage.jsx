import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, VStack, Text, Link, useToast } from '@chakra-ui/react';
import { useUserGlobal } from '../global/user';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setCurrentUser } = useUserGlobal();
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
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
                navigate("/");
            } else {
                toast({
                    title: "Login failed",
                    description: data.message || "Invalid email or password",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Login error:", error);
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
        <Container maxW="container.sm" py={8}>
            <VStack spacing={8}>
                <Heading color="white">Login</Heading>
                <Box w="100%" bg="whiteAlpha.200" p={8} rounded="lg" as="form" onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl>
                            <FormLabel color="gray.300">Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                bg="whiteAlpha.100"
                                color="white"
                                _hover={{ bg: "whiteAlpha.200" }}
                                _focus={{ bg: "whiteAlpha.200", borderColor: "blue.300" }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel color="gray.300">Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                bg="whiteAlpha.100"
                                color="white"
                                _hover={{ bg: "whiteAlpha.200" }}
                                _focus={{ bg: "whiteAlpha.200", borderColor: "blue.300" }}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            w="100%"
                            isLoading={isLoading}
                            loadingText="Logging in"
                        >
                            Login
                        </Button>
                    </VStack>
                </Box>
                <Text textAlign="center" mt={4}>
                    Don't have an account?{" "}
                    <Link as={RouterLink} to="/create" color="blue.500" fontWeight="bold">
                        Create one
                    </Link>
                </Text>
            </VStack>
        </Container>
    );
};

export default LoginPage;
