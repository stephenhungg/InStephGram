import React, { useState } from 'react';
import { Box, Button, Container, Heading, Input, VStack, Image, IconButton, Text, Icon } from '@chakra-ui/react';
import { LuUpload, LuX } from "react-icons/lu"
import { usePostGlobal } from '../global/post';
import { useUserGlobal } from '../global/user';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
    const { currentUser } = useUserGlobal();
    const navigate = useNavigate();
    const [newPost, setNewPost] = useState({
        title: "",
        caption: "",
        author: currentUser?.username || "",
        userId: currentUser?._id || "",
    });
    const [previewImage, setPreviewImage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const {createPost} = usePostGlobal();

    const handleAddPost = async() => {
        console.log("Attempting to create post with data:", newPost);
        if (!newPost.title || !newPost.caption || !newPost.userId || !imageFile) {
            console.log("Missing fields:", {
                title: !newPost.title,
                caption: !newPost.caption,
                userId: !newPost.userId,
                imageFile: !imageFile
            });
            return;
        }

        try {
            // Upload image to backend for S3 upload
            const formData = new FormData();
            formData.append('file', imageFile);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const uploadResponse = await response.json();

            if (uploadResponse.success) {
                const imageUrl = uploadResponse.imageUrl;
                const postWithImage = { ...newPost, image: imageUrl };
                
                const response = await fetch('/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postWithImage),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const postResponse = await response.json();

                if (postResponse.success) {
                    setNewPost({
                        title: "",
                        caption: "",
                        author: currentUser?.username || "",
                        userId: currentUser?._id || "",
                    });
                    setPreviewImage("");
                    setImageFile(null);
                    navigate('/');
                } else {
                    console.error("Failed to create post:", postResponse.message || "Unknown error");
                }
            } else {
                console.error("Failed to upload image");
            }
        } catch (error) {
            console.error('Error uploading image or creating post:', error);
        }
    };

    const handleFileChanges = (files) => {
        const file = files[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                return;
            }

            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setNewPost({
            ...newPost,
            title: "",
            caption: "",
        });
        setPreviewImage("");
        setImageFile(null);
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} bgClip="text" color="white">
                    Create New Post
                </Heading>
                <Box w={"full"} p={6} rounded={"lg"} shadow={"md"} bg="whiteAlpha.200" backdropFilter="blur(10px)">
                    <VStack spacing={4}>
                        {!previewImage ? (
                            <Box
                                w="full"
                                h="200px"
                                border="2px dashed"
                                borderColor="gray.400"
                                rounded="lg"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                cursor="pointer"
                                position="relative"
                                _hover={{ borderColor: "blue.500" }}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        opacity: 0,
                                        cursor: "pointer"
                                    }}
                                    onChange={(e) => handleFileChanges(e.target.files)}
                                />
                                <Icon as={LuUpload} boxSize={8} color="gray.400" />
                                <Text mt={2} color="gray.400">Click to upload your screenshot</Text>
                            </Box>
                        ) : (
                            <Box position="relative">
                                <Image
                                    src={previewImage}
                                    alt="Uploaded preview"
                                    maxH="400px"
                                    objectFit="contain"
                                    rounded="lg"
                                />
                                <IconButton
                                    icon={<LuX />}
                                    position="absolute"
                                    top={2}
                                    right={2}
                                    onClick={removeImage}
                                    aria-label="Remove image"
                                    bg="whiteAlpha.800"
                                    _hover={{ bg: "whiteAlpha.900" }}
                                />
                            </Box>
                        )}

                        <Heading as="h3" size="sm" alignSelf="flex-start" mb={2} color="white">
                            Post Details
                        </Heading>
                        <Input 
                            placeholder='Title' 
                            type="text"
                            value={newPost.title} 
                            onChange={(e) => {
                                const title = e.target.value;
                                setNewPost(prev => ({ 
                                    ...prev, 
                                    title
                                }))
                            }}
                            color="white"
                            _placeholder={{ color: "gray.400" }}
                        />
                        <Input 
                            placeholder='Caption' 
                            type="text"
                            value={newPost.caption} 
                            onChange={(e) => {
                                const caption = e.target.value;
                                setNewPost(prev => ({ 
                                    ...prev, 
                                    caption
                                }))
                            }}
                            color="white"
                            _placeholder={{ color: "gray.400" }}
                        />

                        <Button 
                            onClick={handleAddPost}
                            w='full'
                            colorScheme="blue"
                            mt={4}
                            _hover={{ transform: 'scale(1.02)' }}
                            transition="all 0.2s"
                        >
                            Create Post
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default CreatePostPage;