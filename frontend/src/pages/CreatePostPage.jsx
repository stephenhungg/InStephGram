import React, { useState } from 'react';
import { Box, Button, Container, Heading, Input, VStack, Image, IconButton, Text, Icon, useToast } from '@chakra-ui/react';
import { LuUpload, LuX } from "react-icons/lu"
import { usePostGlobal } from '../global/post';
import { useUserGlobal } from '../global/user';
import { useNavigate } from 'react-router-dom';
import { apiRequest, uploadFile } from '../utils/api';

const CreatePostPage = () => {
    const { currentUser } = useUserGlobal();
    const navigate = useNavigate();
    const toast = useToast();
    const [newPost, setNewPost] = useState({
        title: "",
        caption: "",
        author: currentUser?.username || "",
        userId: currentUser?._id || "",
    });
    const [previewImage, setPreviewImage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {createPost} = usePostGlobal();

    const handleAddPost = async() => {
        if (!newPost.title || !newPost.caption || !newPost.userId || !imageFile) {
            toast({
                title: "Missing fields",
                description: "Please fill in all fields and select an image",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);
        try {
            // Upload image to backend for S3 upload
            const formData = new FormData();
            formData.append('file', imageFile);

            const uploadResponse = await uploadFile('/api/upload', formData);

            if (uploadResponse.success) {
                const imageUrl = uploadResponse.imageUrl;
                const mediaType = uploadResponse.mediaType || 'image';
                const postWithImage = { 
                    ...newPost, 
                    image: imageUrl,
                    mediaType: mediaType
                };
                
                const postResponse = await apiRequest('/api/posts', {
                    method: 'POST',
                    body: JSON.stringify(postWithImage),
                });

                if (postResponse.success) {
                    toast({
                        title: "Post created",
                        description: "Your post has been created successfully",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                    setNewPost({
                        title: "",
                        caption: "",
                        author: currentUser?.username || "",
                        userId: currentUser?._id || "",
                    });
                    setPreviewImage("");
                    setImageFile(null);
                    navigate('/');
                }
            } else {
                toast({
                    title: "Upload failed",
                    description: uploadResponse.message || "Failed to upload image",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error uploading image or creating post:', error);
            toast({
                title: "Error",
                description: "An error occurred while creating your post. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const isVideo = file.type.startsWith('video/');
            const isImage = file.type.startsWith('image/');
            
            if (!isVideo && !isImage) {
                toast({
                    title: "Invalid file type",
                    description: "Please select an image or video file",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }
            
            const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024; // 100MB for videos, 10MB for images
            if (file.size > maxSize) {
                toast({
                    title: "File too large",
                    description: `Please select ${isVideo ? 'a video under 100MB' : 'an image under 10MB'}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }

            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setPreviewImage("");
        setImageFile(null);
    };

    return (
        <Container maxW="container.md" py={8}>
            <VStack spacing={8}>
                <Heading 
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
                    Create New Post
                </Heading>
                <Box 
                    w="100%" 
                    bg="whiteAlpha.200" 
                    p={6} 
                    rounded="lg"
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
                            placeholder="Title"
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            bg="whiteAlpha.100"
                            color="white"
                            _placeholder={{ color: 'gray.400' }}
                            _hover={{ bg: 'whiteAlpha.200' }}
                            _focus={{ bg: 'whiteAlpha.200', borderColor: 'blue.300' }}
                        />
                        <Input
                            placeholder="Caption"
                            value={newPost.caption}
                            onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                            bg="whiteAlpha.100"
                            color="white"
                            _placeholder={{ color: 'gray.400' }}
                            _hover={{ bg: 'whiteAlpha.200' }}
                            _focus={{ bg: 'whiteAlpha.200', borderColor: 'blue.300' }}
                        />
                        
                        {/* Image Upload Section */}
                        <Box
                            w="100%"
                            h="300px"
                            border="2px dashed"
                            borderColor="whiteAlpha.300"
                            rounded="lg"
                            position="relative"
                            overflow="hidden"
                        >
                            {previewImage ? (
                                <Box position="relative" w="100%" h="100%">
                                    {imageFile && imageFile.type.startsWith('video/') ? (
                                        <video
                                            src={previewImage}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain'
                                            }}
                                            controls
                                            muted
                                        />
                                    ) : (
                                        <Image
                                            src={previewImage}
                                            alt="Preview"
                                            objectFit="contain"
                                            w="100%"
                                            h="100%"
                                        />
                                    )}
                                    <IconButton
                                        icon={<Icon as={LuX} />}
                                        position="absolute"
                                        top={2}
                                        right={2}
                                        onClick={removeImage}
                                        colorScheme="red"
                                        rounded="full"
                                    />
                                </Box>
                            ) : (
                                <Button
                                    as="label"
                                    htmlFor="image-upload"
                                    w="100%"
                                    h="100%"
                                    cursor="pointer"
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    gap={2}
                                    bg="transparent"
                                    _hover={{ bg: 'whiteAlpha.100' }}
                                >
                                    <Icon as={LuUpload} boxSize={8} color="gray.400" />
                                    <Text color="gray.400">Click to upload image or video</Text>
                                </Button>
                            )}
                            <Input
                                id="image-upload"
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleImageChange}
                                display="none"
                            />
                        </Box>

                        <Button
                            onClick={handleAddPost}
                            colorScheme="blue"
                            w="100%"
                            isLoading={isLoading}
                            loadingText="Creating post"
                        >
                            Create Post
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePostPage;