import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Icon,
    List,
    ListItem,
    ListIcon,
    Divider,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaCamera, FaThumbsDown, FaComment, FaUser, FaLock, FaServer, FaDatabase, FaCloud } from 'react-icons/fa';

const FeatureItem = ({ icon, title, description }) => (
    <HStack align="start" spacing={4}>
        <Icon as={icon} boxSize={6} color="white.400" />
        <Box>
            <Text fontWeight="bold" color="white" fontSize="lg">{title}</Text>
            <Text color="gray.300">{description}</Text>
        </Box>
    </HStack>
);

const TechStackItem = ({ icon, title, description }) => (
    <HStack align="start" spacing={4}>
        <Icon as={icon} boxSize={6} color="white.400" />
        <Box>
            <Text fontWeight="bold" color="white">{title}</Text>
            <Text color="gray.300" fontSize="sm">{description}</Text>
        </Box>
    </HStack>
);

const AboutPage = () => {
    const bgColor = useColorModeValue('whiteAlpha.200', 'whiteAlpha.200');
    const borderColor = useColorModeValue('whiteAlpha.300', 'whiteAlpha.300');

    return (
        <Container maxW="container.md" py={8}>
            <VStack spacing={8} align="stretch">
                {/* Header */}
                <Box textAlign="center">
                    <Heading 
                        as="h1" 
                        size="2xl" 
                        bgClip="text" 
                        color="white"
                        mb={4}
                    >
                        About InStephGram
                    </Heading>
                    <Text color="gray.300" fontSize="lg">
                        A social platform for sharing and connecting with silly visual content
                    </Text>
                </Box>

                {/* Features Section */}
                <Box 
                    bg={bgColor} 
                    p={6} 
                    rounded="lg" 
                    borderWidth="1px" 
                    borderColor={borderColor}
                >
                    <Heading size="lg" color="white" mb={6}>
                        Key Features
                    </Heading>
                    <VStack spacing={6} align="stretch">
                        <FeatureItem
                            icon={FaCamera}
                            title="Image Sharing"
                            description="Upload and share your favorite images with the community"
                        />
                        <FeatureItem
                            icon={FaThumbsDown}
                            title="Dislike System"
                            description="Show disdain for posts you hate with our dislike system"
                        />
                        <FeatureItem
                            icon={FaComment}
                            title="Comments"
                            description="Engage with the community through comments on posts"
                        />
                        <FeatureItem
                            icon={FaUser}
                            title="User Profiles"
                            description="View and discover other users' personal profile"
                        />
                    </VStack>
                </Box>

                <Divider borderColor={borderColor} />

                {/* Technical Overview */}
                <Box 
                    bg={bgColor} 
                    p={6} 
                    rounded="lg" 
                    borderWidth="1px" 
                    borderColor={borderColor}
                >
                    <Heading size="lg" color="white" mb={6}>
                        Technical Overview
                    </Heading>
                    <VStack spacing={6} align="stretch">
                        <TechStackItem
                            icon={FaServer}
                            title="Frontend"
                            description="Built with React.js, Chakra UI for styling, and React Router for navigation"
                        />
                        <TechStackItem
                            icon={FaServer}
                            title="Backend"
                            description="Node.js with Express.js, providing RESTful API endpoints"
                        />
                        <TechStackItem
                            icon={FaDatabase}
                            title="Database"
                            description="MongoDB for storing user data, posts, and comments"
                        />
                        <TechStackItem
                            icon={FaCloud}
                            title="Storage"
                            description="AWS S3 for secure and scalable image storage"
                        />
                    </VStack>
                </Box>

                {/* Footer */}
                <Text color="gray.400" textAlign="center" fontSize="sm">
                    © {new Date().getFullYear()} InStephGram. All rights reserved.
                </Text>
            </VStack>
        </Container>
    );
};

export default AboutPage; 