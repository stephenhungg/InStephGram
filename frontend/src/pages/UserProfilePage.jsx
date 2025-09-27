import React, { useState, useEffect } from 'react';
import { Container, VStack, Link, Text, Box, Image, Heading, Button, HStack, Icon } from '@chakra-ui/react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { FaRegThumbsDown, FaThumbsDown } from 'react-icons/fa';
import { useUserGlobal } from '../global/user';
import { API_BASE_URL } from '../config/api';

const UserProfilePage = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likingInProgress, setLikingInProgress] = useState({});
    const [profileUser, setProfileUser] = useState(null);
    const { currentUser } = useUserGlobal();
    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserAndPosts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // First fetch the user profile
                const userResponse = await fetch(`${API_BASE_URL}/api/users/profile/${username}`);
                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                const userData = await userResponse.json();
                
                if (userData.success && userData.data) {
                    setProfileUser(userData.data);
                    
                    // Then fetch their posts
                    const postsResponse = await fetch(`${API_BASE_URL}/api/posts/user/${userData.data._id}`);
                    if (!postsResponse.ok) {
                        throw new Error('Failed to fetch user posts');
                    }
                    const postsData = await postsResponse.json();
                    
                    if (postsData.success) {
                        setPosts(postsData.data
                            .map(post => ({
                                ...post,
                                likes: post.likes || [],
                                likesCount: post.likesCount || 0
                            }))
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        );
                    } else {
                        throw new Error(postsData.message || 'Failed to fetch posts');
                    }
                } else {
                    throw new Error('User not found');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (username) {
            fetchUserAndPosts();
        }
    }, [username]);

    const handleLike = async (postId) => {
        if (likingInProgress[postId]) return;

        try {
            setLikingInProgress(prev => ({ ...prev, [postId]: true }));

            const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/like`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: currentUser._id }),
            });

            const data = await response.json();
            
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
                    <Text fontSize="xl" color="gray.500">Loading profile...</Text>
                ) : error ? (
                    <VStack spacing={4}>
                        <Text fontSize="xl" color="red.400" textAlign="center">
                            {error}
                        </Text>
                        <Button onClick={() => navigate('/')} colorScheme="blue">
                            Return to Home
                        </Button>
                    </VStack>
                ) : profileUser ? (
                    <>
                        {/* Profile Header */}
                        <VStack spacing={4}>
                            <Heading 
                                as="h1" 
                                size="2xl" 
                                textAlign="center" 
                                color="white"
                            >
                                {profileUser.username}'s Profile
                            </Heading>
                            <Text 
                                fontSize="lg" 
                                color="gray.400" 
                                textAlign="center"
                            >
                                Total Posts: {posts.length}
                            </Text>
                        </VStack>

                        {posts.length === 0 ? (
                            <Text fontSize="xl" color="gray.500" textAlign="center">
                                No posts yet from this user.
                            </Text>
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
                                        {/* Post Header */}
                                        <Box p={3} borderBottom="1px" borderColor="whiteAlpha.200">
                                            <HStack justify="space-between">
                                                <Text color="white" fontWeight="bold">
                                                    {post.author}
                                                </Text>
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
                            </VStack>
                        )}
                    </>
                ) : null}
            </VStack>
        </Container>
    );
};

export default UserProfilePage; 