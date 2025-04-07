import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Icon,
    SimpleGrid,
    useColorModeValue,
    Divider,
    Link,
    Button
} from '@chakra-ui/react';
import { FaCamera, FaHeart, FaComment, FaUserFriends, FaTrophy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon, title, description }) => {
    const bgColor = useColorModeValue('whiteAlpha.200', 'whiteAlpha.200');
    const hoverBgColor = useColorModeValue('whiteAlpha.300', 'whiteAlpha.300');

    return (
        <Box
            p={6}
            rounded="lg"
            bg={bgColor}
            _hover={{ bg: hoverBgColor, transform: 'translateY(-5px)' }}
            transition="all 0.3s"
            height="100%"
        >
            <HStack spacing={4} mb={4}>
                <Icon as={icon} boxSize={6} color="blue.400" />
                <Heading size="md" color="white">{title}</Heading>
            </HStack>
            <Text color="gray.300">{description}</Text>
        </Box>
    );
};

const AboutPage = () => {
    const navigate = useNavigate();
    const bgColor = useColorModeValue('whiteAlpha.200', 'whiteAlpha.200');

    const features = [
        {
            icon: FaCamera,
            title: "Share Your Moments",
            description: "Upload and share your favorite photos with the community. Add captions and titles to tell your story."
        },
        {
            icon: FaRegThumbsDown,
            title: "Dislike & Interact",
            description: "Show hatred for posts you despise and see what content resonates (or doesn't) with others."
        },
        {
            icon: FaComment,
            title: "Join the Conversation",
            description: "Engage with the community through comments and discussions on posts."
        },
        {
            icon: FaTrophy,
            title: "Leaderboard",
            description: "Compete for the top spot on our leaderboard based on your post engagement (dislikes)."
        }
    ];

    return (
        <Container maxW="container.xl" py={12}>
            <VStack spacing={12} align="stretch">
                {/* Hero Section */}
                <Box textAlign="center" py={10}>
                    <Heading
                        as="h1"
                        size="2xl"
                        mb={6}
                        bgGradient="linear(to-r, blue.400, purple.400)"
                        bgClip="text"
                    >
                        Welcome to Our Community
                    </Heading>
                    <Text fontSize="xl" color="gray.300" maxW="2xl" mx="auto">
                        A platform where you can share your moments, connect with others, and discover terrible content.
                    </Text>
                </Box>

                {/* Features Section */}
                <Box py={8}>
                    <Heading as="h2" size="xl" mb={8} color="white" textAlign="center">
                        Features
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </SimpleGrid>
                </Box>

                {/* Get Started Section */}
                <Box
                    p={8}
                    rounded="lg"
                    bg={bgColor}
                    textAlign="center"
                >
                    <Heading as="h2" size="xl" mb={4} color="white">
                        Ready to Join?
                    </Heading>
                    <Text color="gray.300" mb={6}>
                        Create an account and start sharing your moments with the community.
                    </Text>
                    <HStack spacing={4} justify="center">
                        <Button
                            colorScheme="blue"
                            size="lg"
                            onClick={() => navigate('/create')}
                        >
                            Create Account
                        </Button>
                        <Button
                            variant="outline"
                            colorScheme="whiteAlpha"
                            size="lg"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                    </HStack>
                </Box>

                {/* Footer Section */}
                <Box py={8}>
                    <Divider mb={8} borderColor="whiteAlpha.300" />
                    <Text textAlign="center" color="gray.400">
                        © {new Date().getFullYear()} InStephGram. All rights reserved.
                    </Text>
                    <Text textAlign="center" color="gray.400" mt={2}>
                        Built using React and Chakra UI
                    </Text>
                </Box>
            </VStack>
        </Container>
    );
};

export default AboutPage; 