import React, { useState } from 'react';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useUserGlobal } from '../global/user';
import { useNavigate } from 'react-router-dom';

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
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create Account
                </Heading>
                <Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input 
                            placeholder='Username' 
                            type="text"
                            value={newAcc.username} 
                            onChange={(e) => setNewAcc({ ...newAcc, username: e.target.value })}
                        />
                        <Input 
                            placeholder='Email' 
                            type="email"
                            value={newAcc.email} 
                            onChange={(e) => setNewAcc({ ...newAcc, email: e.target.value })}
                        />
                        <Input 
                            placeholder='Password' 
                            type="password"
                            value={newAcc.password} 
                            onChange={(e) => setNewAcc({ ...newAcc, password: e.target.value })}
                        />
                        <Button onClick={handleAddUser} w='full' _hover={{ transform: 'scale(1.02)' }}
                            transition="all 0.2s">
                            Create Account
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default CreateAccPage;