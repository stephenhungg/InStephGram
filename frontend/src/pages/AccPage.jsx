import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, VStack, Text, Button, HStack, Image, Icon, Spinner, Link } from '@chakra-ui/react';
import { useUserGlobal } from '../global/user';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';

const AccPage = () => {
    const { currentUser, setCurrentUser } = useUserGlobal();
    const navigate = useNavigate();
    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [likingInProgress, setLikingInProgress] = useState({});

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const fetchUserPosts = async () => {
            try {
                const response = await fetch('/api/posts');
                const data = await response.json();
                if (data.success) {
                    // Filter posts by current user and sort by date
                    const filteredPosts = data.data
                        .filter(post => post.userId === currentUser._id)
                        .map(post => ({
                            ...post,
                            likes: post.likes || [],
                            likesCount: post.likesCount || 0
                        }))
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setUserPosts(filteredPosts);
                }
            } catch (error) {
                console.error('Error fetching user posts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserPosts();
    }, [currentUser, navigate]);

    const handleLogout = () => {
        setCurrentUser(null);
        navigate('/login');
    };

    const handleLike = async (postId) => {
        if (likingInProgress[postId]) return;

        try {
            setLikingInProgress(prev => ({ ...prev, [postId]: true }));

            const response = await fetch(`/api/posts/${postId}/like`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: currentUser._id }),
            });

            const data = await response.json();
            
            if (data.success) {
                setUserPosts(posts => posts.map(post => {
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

    const handleDelete = async (postId) => {
        const response = await apiRequest(`/api/posts/${postId}`, {
            method: 'DELETE',
        });
        if (response.success) {
            setUserPosts(posts => posts.filter(post => post._id !== postId));
        }
    };

    if (!currentUser) {
        return null;
    }

    return (
        <Container maxW="container.md" py={8}>
            <VStack spacing={8} align="stretch">
                <Heading 
                    as="h1" 
                    size="2xl" 
                    textAlign="center" 
                    bgClip="text"
                    color="white"
                >
                    Account Information
                </Heading>
                
                {/* User Info */}
                <Box 
                    w="full" 
                    p={6} 
                    rounded="lg" 
                    shadow="md" 
                    bg="whiteAlpha.200"
                    backdropFilter="blur(10px)"
                >
                    <VStack spacing={4} align="stretch">
                        <Box>
                            <Text fontWeight="bold" color="gray.400">Username</Text>
                            <Text fontSize="lg" color="white">{currentUser.username}</Text>
                        </Box>
                        
                        <Box>
                            <Text fontWeight="bold" color="gray.400">Email</Text>
                            <Text fontSize="lg" color="white">{currentUser.email}</Text>
                        </Box>
                        
                        {currentUser.createdAt && (
                            <Box>
                                <Text fontWeight="bold" color="gray.400">Member Since</Text>
                                <Text fontSize="lg" color="white">
                                    {new Date(currentUser.createdAt).toLocaleDateString()}
                                </Text>
                            </Box>
                        )}
                        
                        <Button 
                            colorScheme="red" 
                            onClick={handleLogout}
                            mt={4}
                            _hover={{ transform: 'scale(1.02)' }}
                            transition="all 0.2s"
                        >
                            Logout
                        </Button>
                    </VStack>
                </Box>

                {/* User Posts */}
                <Heading 
                    as="h2" 
                    size="xl" 
                    textAlign="center" 
                    color="white"
                >
                    Your Posts
                </Heading>

                {isLoading ? (
                    <Box display="flex" justifyContent="center" w="full">
                        <Spinner size="xl" color="white" />
                    </Box>
                ) : userPosts.length === 0 ? (
                    <Text fontSize="lg" color="gray.400" textAlign="center">
                        You haven't created any posts yet.{" "}
                        <RouterLink to="/post">
                            <Text as="span" color="blue.400" _hover={{ textDecoration: "underline" }}>
                                Create your first post
                            </Text>
                        </RouterLink>
                    </Text>
                ) : (
                    <VStack spacing={6} align="center">
                        {userPosts.map((post) => (
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
                                <Box p={4} borderBottom="1px" borderColor="whiteAlpha.200">
                                    <HStack justify="space-between">
                                        <Text color="white" fontWeight="bold">
                                            {post.title}
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

                                {/* Post Actions */}
                                <Box p={4}>
                                    <HStack spacing={4}>
                                        <Button
                                            onClick={() => handleLike(post._id)}
                                            isDisabled={likingInProgress[post._id]}
                                            isLoading={likingInProgress[post._id]}
                                            variant="unstyled"
                                            display="flex"
                                            alignItems="center"
                                            _hover={{ 
                                                transform: 'scale(1.1)',
                                                transition: 'transform 0.2s'
                                            }}
                                            transition="all 0.2s"
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
                                        <Button onClick={() => handleDelete(post._id)}> <Icon as={FaTrash} boxSize="24px" color="gray.400" /> </Button>
                                    </HStack>
                                    <Text color="white" mt={2}>
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

export default AccPage;
