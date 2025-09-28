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
import { FaCamera, FaThumbsDown, FaComment, FaUser, FaLock, FaServer, FaDatabase, FaCloud, FaVideo, FaTrophy, FaPalette, FaMobile, FaGithub, FaHeart } from 'react-icons/fa';

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
                        About InStephGram
                    </Heading>
                    <Text 
                        color="gray.300" 
                        fontSize="lg"
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
                        A modern social platform for sharing the worst content possible and collecting dislikes
                    </Text>
                </Box>

                {/* Features Section */}
                <Box 
                    bg={bgColor} 
                    p={6} 
                    rounded="lg" 
                    borderWidth="1px" 
                    borderColor={borderColor}
                    opacity={0}
                    animation="fadeInUp 1s ease-out 0.4s forwards"
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
                    <Heading size="lg" color="white" mb={6}>
                        Key Features
                    </Heading>
                    <VStack spacing={6} align="stretch">
                        <FeatureItem
                            icon={FaCamera}
                            title="Image & Video Sharing"
                            description="Upload and share images and videos up to 100MB with automatic compression"
                        />
                        <FeatureItem
                            icon={FaVideo}
                            title="Video Support"
                            description="Full video support with FFmpeg compression and HTML5 playback"
                        />
                        <FeatureItem
                            icon={FaThumbsDown}
                            title="Dislike System"
                            description="Show disdain for terrible content with our unique dislike-focused system"
                        />
                        <FeatureItem
                            icon={FaTrophy}
                            title="Leaderboard"
                            description="Track the most disliked users and compete for the worst content"
                        />
                        <FeatureItem
                            icon={FaComment}
                            title="Comments"
                            description="Engage with the community through comments on posts"
                        />
                        <FeatureItem
                            icon={FaPalette}
                            title="Animated UI"
                            description="Beautiful glassmorphic design with 3D beams background and smooth animations"
                        />
                        <FeatureItem
                            icon={FaMobile}
                            title="Responsive Design"
                            description="Optimized experience across desktop and mobile devices"
                        />
                        <FeatureItem
                            icon={FaUser}
                            title="User Profiles"
                            description="Personalized profiles with post history and statistics"
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
                    opacity={0}
                    animation="fadeInUp 1s ease-out 0.6s forwards"
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
                    <Heading size="lg" color="white" mb={6}>
                        Technical Overview
                    </Heading>
                    <VStack spacing={6} align="stretch">
                        <TechStackItem
                            icon={FaServer}
                            title="Frontend"
                            description="React 18, Chakra UI, Three.js for 3D animations, React Router, and Geist Mono typography"
                        />
                        <TechStackItem
                            icon={FaServer}
                            title="Backend"
                            description="Node.js with Express.js, FFmpeg for video processing, and RESTful API design"
                        />
                        <TechStackItem
                            icon={FaDatabase}
                            title="Database"
                            description="MongoDB with Mongoose for user data, posts, comments, and media metadata"
                        />
                        <TechStackItem
                            icon={FaCloud}
                            title="Storage & Deployment"
                            description="AWS S3 for media storage, Vercel for frontend, and Render for backend hosting"
                        />
                    </VStack>
                </Box>

                <Divider borderColor={borderColor} />

                {/* Creator Credit */}
                <Box 
                    bg={bgColor} 
                    p={6} 
                    rounded="lg" 
                    borderWidth="1px" 
                    borderColor={borderColor}
                    textAlign="center"
                    opacity={0}
                    animation="fadeInUp 1s ease-out 0.8s forwards"
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
                        <HStack justify="center" spacing={2}>
                            <Text color="gray.300" fontSize="lg">
                                built by
                            </Text>
                            <Text 
                                as="a" 
                                href="https://github.com/stephenhungg" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                color="blue.400" 
                                fontSize="lg" 
                                fontWeight="bold"
                                _hover={{ 
                                    color: "blue.300", 
                                    textDecoration: "underline",
                                    transform: "scale(1.05)",
                                    transition: "all 0.2s"
                                }}
                                cursor="pointer"
                            >
                                stephen
                            </Text>
                        </HStack>
                        
                        <HStack justify="center" spacing={6}>
                            <Text 
                                as="a" 
                                href="https://github.com/stephenhungg" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                color="gray.400" 
                                fontSize="sm"
                                display="flex"
                                alignItems="center"
                                gap={2}
                                _hover={{ 
                                    color: "white",
                                    transform: "translateY(-2px)",
                                    transition: "all 0.2s"
                                }}
                            >
                                <Icon as={FaGithub} />
                                GitHub Profile
                            </Text>
                            <Text 
                                as="a" 
                                href="https://github.com/stephenhungg/InStephGram" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                color="gray.400" 
                                fontSize="sm"
                                display="flex"
                                alignItems="center"
                                gap={2}
                                _hover={{ 
                                    color: "white",
                                    transform: "translateY(-2px)",
                                    transition: "all 0.2s"
                                }}
                            >
                                <Icon as={FaGithub} />
                                View Source Code
                            </Text>
                        </HStack>
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