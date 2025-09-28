import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    GridItem,
    Image,
    Text,
    VStack,
    HStack,
    Input,
    Button,
    Avatar,
    Divider,
    Heading,
    useToast,
    Spinner
} from '@chakra-ui/react';
import { useUserGlobal } from '../global/user';
import { API_BASE_URL } from '../config/api';

const PostDetailPage = () => {
    const { postId } = useParams();
    const { currentUser } = useUserGlobal();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast();

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                // Fetch post details
                const postResponse = await fetch(`${API_BASE_URL}/api/posts/${postId}`);
                const postData = await postResponse.json();
                
                if (postData.success) {
                    setPost(postData.data);
                }

                // Fetch comments
                const commentsResponse = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`);
                const commentsData = await commentsResponse.json();
                
                if (commentsData.success) {
                    setComments(commentsData.data);
                }
            } catch (error) {
                console.error('Error fetching post details:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to load post details',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchPostAndComments();
    }, [postId, toast]);

    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: newComment,
                    userId: currentUser._id,
                    username: currentUser.username,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setComments(prevComments => [...prevComments, data.data]);
                setNewComment('');
                toast({
                    title: 'Success',
                    description: 'Comment added successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error posting comment:', error);
            toast({
                title: 'Error',
                description: 'Failed to post comment',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <Container centerContent py={10}>
                <Spinner size="xl" color="white" />
            </Container>
        );
    }

    if (!post) {
        return (
            <Container centerContent py={10}>
                <Text color="white">Post not found</Text>
            </Container>
        );
    }

    return (
        <Container maxW="container.xl" py={8}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 400px" }} gap={8}>
                {/* Left side - Post Image */}
                <GridItem>
                    <Box
                        bg="whiteAlpha.200"
                        rounded="lg"
                        overflow="hidden"
                        position="relative"
                        aspectRatio={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {post.mediaType === 'video' ? (
                            <video
                                src={post.image}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                                controls
                                muted
                                preload="metadata"
                            />
                        ) : (
                            <Image
                                src={post.image}
                                alt={post.title}
                                objectFit="contain"
                                w="100%"
                                h="100%"
                            />
                        )}
                    </Box>
                </GridItem>

                {/* Right side - Post Details and Comments */}
                <GridItem>
                    <VStack
                        spacing={6}
                        align="stretch"
                        bg="whiteAlpha.200"
                        p={6}
                        rounded="lg"
                        height="100%"
                    >
                        {/* Post Details */}
                        <Box>
                            <Heading 
                                size="lg" 
                                color="white" 
                                mb={2}
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
                                {post.title}
                            </Heading>
                            <Text color="gray.300" fontSize="md">
                                {post.caption}
                            </Text>
                            <Text color="gray.400" fontSize="sm" mt={2}>
                                Posted by {post.author} • {new Date(post.createdAt).toLocaleDateString()}
                            </Text>
                        </Box>

                        <Divider borderColor="whiteAlpha.300" />

                        {/* Comments Section */}
                        <VStack spacing={4} align="stretch" flex="1" overflowY="auto" maxH="500px">
                            <Heading 
                                size="md" 
                                color="white"
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
                                Comments
                            </Heading>
                            
                            {comments.length === 0 ? (
                                <Text color="gray.400">No comments yet. Be the first to comment!</Text>
                            ) : (
                                comments.map((comment) => (
                                    <Box
                                        key={comment._id}
                                        p={3}
                                        bg="whiteAlpha.100"
                                        rounded="md"
                                    >
                                        <HStack spacing={3} mb={2}>
                                            <Avatar size="sm" name={comment.username} />
                                            <Text color="white" fontWeight="bold">
                                                {comment.username}
                                            </Text>
                                            <Text color="gray.400" fontSize="sm">
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </Text>
                                        </HStack>
                                        <Text color="gray.300" pl={10}>
                                            {comment.content}
                                        </Text>
                                    </Box>
                                ))
                            )}
                        </VStack>

                        {/* Comment Input */}
                        {currentUser && (
                            <HStack spacing={2}>
                                <Input
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    bg="whiteAlpha.100"
                                    color="white"
                                    _placeholder={{ color: 'gray.400' }}
                                    _hover={{ bg: 'whiteAlpha.200' }}
                                    _focus={{ bg: 'whiteAlpha.200', borderColor: 'blue.300' }}
                                />
                                <Button
                                    colorScheme="blue"
                                    onClick={handleSubmitComment}
                                    isLoading={isSubmitting}
                                    loadingText="Posting"
                                >
                                    Post
                                </Button>
                            </HStack>
                        )}
                    </VStack>
                </GridItem>
            </Grid>
        </Container>
    );
};

export default PostDetailPage; 