import React, { useState, useEffect } from 'react';
import { Container, VStack, Link, Text, Box, Image, Heading, Button, HStack, Icon } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useUserGlobal } from '../global/user';
import { apiRequest } from '../utils/api';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [likingInProgress, setLikingInProgress] = useState({});
    const { currentUser } = useUserGlobal();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await apiRequest('/api/posts');
                if (data.success) {
                    setPosts(data.data
                        .map(post => ({
                            ...post,
                            likes: post.likes || [],
                            likesCount: post.likesCount || 0
                        }))
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    );
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleLike = async (postId) => {
        if (likingInProgress[postId]) return;

        try {
            setLikingInProgress(prev => ({ ...prev, [postId]: true }));

            const data = await apiRequest(`/api/posts/${postId}/like`, {
                method: 'PUT',
                body: JSON.stringify({ userId: currentUser._id }),
            });
            
            if (data.success) {
                setPosts(posts.map(post => {
                    if (post._id === postId) {
                        return {
                            ...post,
                            ...data.data,
                            likes: data.data.likes || [],
                            likesCount: data.data.likesCount || 0
                        };
                    }
                    return post;
                }));
            }
        } catch (error) {
            console.error('Error liking post:', error);
        } finally {
            setLikingInProgress(prev => ({ ...prev, [postId]: false }));
        }
    };

    const isPostLiked = (post) => {
        return post.likes?.some(likeId => likeId === currentUser?._id);
    };

    return (
        <Container maxW="container.md" py={12}>
            <VStack spacing={12}>
                {isLoading ? (
                    <Text fontSize="xl" color="gray.500">Loading posts...</Text>
                ) : posts.length === 0 ? (
                    <>
                        <Text
                            fontSize={{base:"4xl", sm:"6xl"}}
                            fontWeight={"bold"}
                            bgClip={"text"} 
                            textAlign={"center"}
                            color="white"
                            mb={2}
                        >   
                            Welcome to InStephGram
                        </Text>
                        <Text
                            fontSize={{base:"lg", sm:"xl"}}
                            textAlign={"center"}
                            color="gray.400"
                            mb={8}
                            px={4}
                        >
                            Your mission: Post the worst content possible and collect those dislikes!
                        </Text>
                        <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                            No posts yet, create one!{" "}
                            <RouterLink to={"/post"}>
                                <Text as='span' color='blue.500' fontWeight='bold' _hover={{ textDecoration: "underline"}}> 
                                    Create Post
                                </Text>    
                            </RouterLink>
                        </Text>
                    </>
                ) : (
                    <VStack spacing={8} align="center" w="full">
                        {posts.map((post) => (
                            <Box
                                key={post._id}
                                maxW="500px"
                                w="full"
                                bg="whiteAlpha.200"
                                backdropFilter="blur(10px)"
                                rounded="lg"
                                overflow="hidden"
                                shadow="md"
                                mx="auto"
                            >
                                {/* Author Header */}
                                <Box p={3} borderBottom="1px" borderColor="whiteAlpha.200">
                                    <HStack justify="space-between">
                                        <Link
                                            as={RouterLink}
                                            to={`/user/${post.author}`}
                                            _hover={{ textDecoration: 'underline' }}
                                        >
                                            <Text color="white" fontWeight="bold">
                                                {post.author}
                                            </Text>
                                        </Link>
                                        <Text color="gray.400" fontSize="sm">
                                            {new Date(post.createdAt).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </Text>
                                    </HStack>
                                </Box>

                                {/* Post Image */}
                                <Box 
                                    position="relative" 
                                    width="100%" 
                                    height="400px" 
                                    overflow="hidden"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    bg="blackAlpha.400"
                                >
                                    <Link 
                                        as={RouterLink} 
                                        to={`/post/${post._id}`}
                                        _hover={{ textDecoration: 'none' }}
                                        width="100%"
                                        height="100%"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            width="100%"
                                            height="100%"
                                            objectFit="contain"
                                            backgroundColor="transparent"
                                        />
                                    </Link>
                                </Box>

                                {/* Like Button and Post Content */}
                                <Box p={3}>
                                    <HStack spacing={4} mb={3}>
                                        <Button
                                            onClick={() => handleLike(post._id)}
                                            isDisabled={!currentUser || likingInProgress[post._id]}
                                            isLoading={likingInProgress[post._id]}
                                            variant="unstyled"
                                            display="flex"
                                            alignItems="center"
                                            _hover={{ 
                                                transform: 'scale(1.1)',
                                                transition: 'transform 0.2s'
                                            }}
                                            transition="all 0.2s"
                                            p={2}
                                        >
                                            <Icon
                                                as={isPostLiked(post) ? FaHeart : FaRegHeart}
                                                boxSize="24px"
                                                color={isPostLiked(post) ? "red.500" : "gray.400"}
                                            />
                                            <Text 
                                                ml={2} 
                                                color={isPostLiked(post) ? "red.500" : "gray.400"}
                                                fontWeight="bold"
                                            >
                                                {post.likesCount || 0}
                                            </Text>
                                        </Button>
                                    </HStack>

                                    <Heading 
                                        size="md" 
                                        mb={2}
                                        color="white"
                                    >
                                        {post.title}
                                    </Heading>
                                    <Text 
                                        color="gray.400" 
                                        fontSize="md"
                                    >
                                        {post.caption}
                                    </Text>
                                </Box>
                            </Box>
                        ))}
                    </VStack>
                )}
            </VStack>
        </Container>
    );
};

export default HomePage;