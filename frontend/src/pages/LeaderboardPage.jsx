import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, VStack, HStack, Text, Badge, Avatar, Spinner, Link } from '@chakra-ui/react';
import { useUserGlobal } from '../global/user';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

const LeaderboardPage = () => {
    const { currentUser } = useUserGlobal();
    const navigate = useNavigate();
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                setError(null);
                const response = await fetch(`${API_BASE_URL}/api/users/leaderboard`);
                const data = await response.json();
                if (data.success) {
                    setLeaderboardData(data.data || []);
                } else {
                    console.error('Failed to fetch leaderboard:', data);
                    setError('Failed to fetch leaderboard data');
                }
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
                setError('Error connecting to server');
            } finally {
                setIsLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);


    return (
        <Container maxW="container.lg" py={8}>
            <VStack spacing={8} w="full">
                <Heading 
                    as="h1" 
                    size="2xl" 
                    textAlign="center" 
                    bgClip="text"
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
                    Leaderboard
                </Heading>
                
                {isLoading ? (
                    <Box display="flex" justifyContent="center" w="full" py={10}>
                        <Spinner size="xl" color="white" />
                    </Box>
                ) : (
                    <Box 
                        w="full" 
                        p={6} 
                        rounded="lg" 
                        shadow="md" 
                        bg="whiteAlpha.200"
                        backdropFilter="blur(10px)"
                    >
                        <VStack spacing={4} w="full">
                            {/* Header */}
                            <HStack 
                                w="full" 
                                px={4} 
                                py={2} 
                                bg="whiteAlpha.100" 
                                rounded="md" 
                                justifyContent="space-between"
                            >
                                <Text fontWeight="bold" color="gray.300" w="100px">Rank</Text>
                                <Text fontWeight="bold" color="gray.300" flex="1">Player</Text>
                                <Text fontWeight="bold" color="gray.300" w="120px" textAlign="right">Total Dislikes</Text>
                            </HStack>

                            {/* Leaderboard Entries */}
                            {leaderboardData.map((player) => (
                                <HStack 
                                    key={player.rank}
                                    w="full" 
                                    px={4} 
                                    py={3}
                                    bg={currentUser && player.username === currentUser.username ? "whiteAlpha.300" : "whiteAlpha.50"}
                                    rounded="md"
                                    justifyContent="space-between"
                                    transition="all 0.2s"
                                    _hover={{ bg: "whiteAlpha.100" }}
                                >
                                    <Box w="100px">
                                        <Badge 
                                            colorScheme={player.rank <= 3 ? "yellow" : "gray"}
                                            fontSize="md"
                                            px={2}
                                            py={1}
                                        >
                                            #{player.rank}
                                        </Badge>
                                    </Box>
                                    <HStack flex="1" spacing={3}>
                                        <Link
                                            as={RouterLink}
                                            to={`/user/${player.username}`}
                                            _hover={{ textDecoration: 'underline' }}
                                        >
                                            <Text color="white" fontSize="lg">
                                                {player.username}
                                                {currentUser && player.username === currentUser.username && 
                                                    <Badge ml={2} colorScheme="green">You</Badge>
                                                }
                                            </Text>
                                        </Link>
                                    </HStack>
                                    <Text w="120px" color="white" fontSize="lg" textAlign="right">
                                        {player.score}
                                    </Text>
                                </HStack>
                            ))}

                            {error && (
                                <Text color="red.400" textAlign="center" py={4}>
                                    {error}
                                </Text>
                            )}
                            
                            {!error && leaderboardData.length === 0 && (
                                <Text color="gray.400" textAlign="center" py={4}>
                                    No leaderboard data available
                                </Text>
                            )}
                        </VStack>
                    </Box>
                )}
            </VStack>
        </Container>
    );
};

export default LeaderboardPage;
