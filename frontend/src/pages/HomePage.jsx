import React, { useState, useEffect } from 'react';
import { Container, VStack, Link, Text, Box, Image, Heading, Button, HStack, Icon } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaRegThumbsDown, FaThumbsDown } from 'react-icons/fa';
import { useUserGlobal } from '../global/user';
import { apiRequest } from '../utils/api';
import Beams from '../components/Beams';
import TextType from '../components/TextType';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [likingInProgress, setLikingInProgress] = useState({});
    const [pagination, setPagination] = useState({
        currentPage: 1,
        hasNextPage: false,
        totalPosts: 0
    });
    const { currentUser } = useUserGlobal();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async (page = 1, append = false) => {
        try {
            if (!append) setIsLoading(true);
            else setIsLoadingMore(true);

            const data = await apiRequest(`/api/posts?page=${page}&limit=10`);
            
            if (data.success) {
                const processedPosts = data.data.map(post => ({
                    ...post,
                    likes: post.likes || [],
                    likesCount: post.likesCount || 0
                }));

                if (append) {
                    // Append new posts to existing ones
                    setPosts(prevPosts => [...prevPosts, ...processedPosts]);
                } else {
                    // Replace posts (initial load)
                    setPosts(processedPosts);
                }

                // Update pagination info
                setPagination({
                    currentPage: data.pagination.currentPage,
                    hasNextPage: data.pagination.hasNextPage,
                    totalPosts: data.pagination.totalPosts
                });
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    };

    const loadMorePosts = () => {
        if (pagination.hasNextPage && !isLoadingMore) {
            fetchPosts(pagination.currentPage + 1, true);
        }
    };

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
        <Box position="relative" minH="100vh">
            {/* Animated Beams Background */}
            <Box 
                position="fixed"
                top={0}
                left={0}
                right={0}
                bottom={0}
                zIndex={-1}
                pointerEvents="none"
            >
                <Beams 
                    beamWidth={2}
                    beamHeight={15}
                    beamNumber={16}
                    lightColor="#cccccc"
                    speed={1.5}
                    noiseIntensity={1.2}
                    scale={0.15}
                    rotation={30}
                />
                {/* Black vignette overlay to fade beams at edges */}
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    background={`
                        linear-gradient(
                            to right,
                            black 0%,
                            black 10%,
                            rgba(0, 0, 0, 0.8) 20%,
                            rgba(0, 0, 0, 0.3) 35%,
                            transparent 50%,
                            rgba(0, 0, 0, 0.3) 65%,
                            rgba(0, 0, 0, 0.8) 80%,
                            black 90%,
                            black 100%
                        )
                    `}
                    pointerEvents="none"
                />
            </Box>
            
            <Container maxW="container.md" py={12}>
                <VStack spacing={12}>
                {isLoading ? (
                    <Text fontSize="xl" color="gray.500">Loading posts...</Text>
                ) : posts.length === 0 ? (
                    <>
                        <Text
                            fontSize={{base:"4xl", sm:"6xl"}}
                            fontWeight={"bold"}
                            bgGradient="linear(to-r, white, blue.300, white)"
                            bgClip={"text"} 
                            textAlign={"center"}
                            color="white"
                            mb={2}
                            textShadow="0 0 20px rgba(59, 130, 246, 0.5)"
                            minH="1.2em"
                        >   
                            <TextType
                                text="Welcome to InStephGram"
                                typingSpeed={100}
                                showCursor={true}
                                cursorCharacter="|"
                                loop={false}
                                initialDelay={500}
                            />
                        </Text>
                        <Text
                            fontSize={{base:"lg", sm:"xl"}}
                            textAlign={"center"}
                            color="gray.300"
                            mb={8}
                            px={4}
                            bg="rgba(0, 0, 0, 0.3)"
                            backdropFilter="blur(10px)"
                            rounded="lg"
                            py={4}
                            border="1px solid"
                            borderColor="rgba(255, 255, 255, 0.1)"
                            opacity={0}
                            animation="fadeInUp 1.2s ease-out 0.3s forwards"
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
                            Your mission: Post the worst content possible and collect those dislikes!
                        </Text>
                        <Text 
                            fontSize='xl' 
                            textAlign={"center"} 
                            fontWeight='bold' 
                            color='gray.500'
                            opacity={0}
                            animation="fadeInUp 1.2s ease-out 0.6s forwards"
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
                                bg="rgba(255, 255, 255, 0.05)"
                                backdropFilter="blur(20px)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.1)"
                                rounded="lg"
                                overflow="hidden"
                                shadow="2xl"
                                boxShadow="0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
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

                                {/* Post Media (Image or Video) */}
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
                                        {post.mediaType === 'video' ? (
                                            <video
                                                src={post.image}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain',
                                                    backgroundColor: 'transparent'
                                                }}
                                                controls
                                                muted
                                                preload="metadata"
                                            />
                                        ) : (
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                width="100%"
                                                height="100%"
                                                objectFit="contain"
                                                backgroundColor="transparent"
                                            />
                                        )}
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
                                                as={isPostLiked(post) ? FaThumbsDown : FaRegThumbsDown}
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
                        
                        {/* Load More Button */}
                        {pagination.hasNextPage && (
                            <Button
                                onClick={loadMorePosts}
                                isLoading={isLoadingMore}
                                loadingText="Loading more posts..."
                                size="lg"
                                colorScheme="blue"
                                variant="outline"
                                mt={8}
                                _hover={{
                                    transform: 'scale(1.05)',
                                    transition: 'transform 0.2s'
                                }}
                            >
                                Load More Posts
                            </Button>
                        )}
                        
                        {/* Show total posts info */}
                        {posts.length > 0 && (
                            <Text color="gray.500" fontSize="sm" mt={4}>
                                Showing {posts.length} of {pagination.totalPosts} posts
                            </Text>
                        )}
                    </VStack>
                )}
                </VStack>
            </Container>
        </Box>
    );
};

export default HomePage;