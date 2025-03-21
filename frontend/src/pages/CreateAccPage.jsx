import React, { useState } from 'react';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useUserGlobal } from '../global/user';
const CreateAccPage = () => {
    const [newAcc, setNewAcc] = useState({
        username: "",
        email: "",
        password: "",
    });
    const {createUser} = useUserGlobal();
    const handleAddUser = async() => {
        const { success, message } = await createUser(newAcc);
        console.log("Success: ", success);
        console.log("Message: ", message);
        console.log("New User: ", newAcc);
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Account
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
                            type="text"
                            value={newAcc.email} 
                            onChange={(e) => setNewAcc({ ...newAcc, email: e.target.value })}
                        />
                        <Input 
                            placeholder='Password' 
                            type="text"
                            value={newAcc.password} 
                            onChange={(e) => setNewAcc({ ...newAcc, password: e.target.value })}
                        />
                        <Button onClick={handleAddUser} w='full'>
                            Create
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default CreateAccPage