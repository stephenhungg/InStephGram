import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    Divider,
    UnorderedList,
    ListItem,
    useColorModeValue,
    Code,
} from '@chakra-ui/react';

const TechSection = ({ title, children }) => {
    const bgColor = useColorModeValue('whiteAlpha.200', 'whiteAlpha.200');
    return (
        <Box p={6} rounded="lg" bg={bgColor}>
            <Heading as="h3" size="md" mb={4} color="white">
                {title}
            </Heading>
            {children}
        </Box>
    );
};

const TechnicalOverviewPage = () => {
    return (
        <Container maxW="container.lg" py={12}>
            <VStack spacing={12} align="stretch">
                {/* Header */}
                <Box textAlign="center">
                    <Heading
                        as="h1"
                        size="2xl"
                        mb={6}
                        bgGradient="linear(to-r, blue.400, purple.400)"
                        bgClip="text"
                    >
                        Technical Overview
                    </Heading>
                    <Text fontSize="xl" color="gray.300" maxW="2xl" mx="auto">
                        A deep dive into how InStephGram was built and designed
                    </Text>
                </Box>

                {/* System Architecture Diagram */}
                <TechSection title="System Architecture">
                    <Box overflowX="auto">
                        <Code display="block" whiteSpace="pre" p={4} fontSize="sm" bg="whiteAlpha.100" color="gray.300">
{`Frontend (React + Chakra UI)              Backend (Node.js + Express)                    Database
┌──────────────────────┐                    ┌──────────────────────┐                    ┌─────────────┐
│                      │                    │                      │                    │             │
│   React Components   │                    │   Express Routes     │                    │             │
│   ┌──────────────┐   │                    │   ┌──────────────┐   │                    │             │
│   │   NavBar     │   │                    │   │  /api/posts  │   │                    │  AWS S3     │
│   │   HomePage   │   │      HTTP/REST     │   │  /api/users  │   │      Mongoose      │  MongoDB    │
│   │   PostPage   │◄─-┼────────────────────┼──►│ /api/comments│◄─-┼────────────────────┼─►           │
│   │   etc.       │   │    API Requests    │   │ /api/upload  │   │      Queries       │             │
│   └──────────────┘   │                    │   └──────────────┘   │                    │             │
│                      │                    │                      │                    │             │
│   Global State       │                    │    Controllers       │                    │             │
│   (Context API)      │                    │    & Models          │                    │             │
│                      │                    │                      │                    │             │
└──────────────────────┘                    └──────────────────────┘                    └─────────────┘

Data Flow:
1. User interacts with React Components
2. Components update global state via Context API
3. API requests sent to Express backend
4. Controllers process requests and interact with MongoDB
5. Data flows back through the same path to update UI`}</Code>
                    </Box>
                </TechSection>

                {/* Tech Stack */}
                <TechSection title="Tech Stack">
                    <UnorderedList color="gray.300" spacing={2}>
                        <ListItem>
                            <Text as="span" fontWeight="bold" color="blue.400">Frontend:</Text>
                            {" "}React.js with Chakra UI for modern, responsive design
                        </ListItem>
                        <ListItem>
                            <Text as="span" fontWeight="bold" color="blue.400">Backend:</Text>
                            {" "}Node.js with Express.js for RESTful API
                        </ListItem>
                        <ListItem>
                            <Text as="span" fontWeight="bold" color="blue.400">Database:</Text>
                            {" "}MongoDB for flexible document storage/AWS S3 for image storage
                        </ListItem>
                        <ListItem>
                            <Text as="span" fontWeight="bold" color="blue.400">State Management:</Text>
                            {" "}React Context API for global user state
                        </ListItem>
                    </UnorderedList>
                </TechSection>

                {/* Architecture */}
                <TechSection title="Architecture">
                    <VStack align="stretch" spacing={4} color="gray.300">
                        <Text>
                            The application follows a modern client-server architecture with clear separation of concerns:
                        </Text>
                        <UnorderedList spacing={2} pl={4}>
                            <ListItem>
                                <Text as="span" fontWeight="bold" color="blue.400">Frontend Architecture:</Text>
                                {" "}Component-based structure with reusable UI components and global user context
                            </ListItem>
                            <ListItem>
                                <Text as="span" fontWeight="bold" color="blue.400">Backend Architecture:</Text>
                                {" "}MVC pattern with separate routes, controllers, and models
                            </ListItem>
                            <ListItem>
                                <Text as="span" fontWeight="bold" color="blue.400">API Design:</Text>
                                {" "}RESTful endpoints for posts, users, and comments with proper validation
                            </ListItem>
                        </UnorderedList>
                    </VStack>
                </TechSection>

                {/* Key Features Implementation */}
                <TechSection title="Key Features Implementation">
                    <VStack align="stretch" spacing={4} color="gray.300">
                        <Box>
                            <Text fontWeight="bold" mb={2}>User Authentication:</Text>
                            <UnorderedList spacing={2} pl={4}>
                                <ListItem>Username-based authentication system</ListItem>
                                <ListItem>Protected routes for authenticated users</ListItem>
                                <ListItem>Global user context for state management</ListItem>
                            </UnorderedList>
                        </Box>
                        <Box>
                            <Text fontWeight="bold" mb={2}>Post Management:</Text>
                            <UnorderedList spacing={2} pl={4}>
                                <ListItem>Create posts with title, caption, and image</ListItem>
                                <ListItem>Delete posts with confirmation dialog</ListItem>
                                <ListItem>View detailed post information</ListItem>
                            </UnorderedList>
                        </Box>
                        <Box>
                            <Text fontWeight="bold" mb={2}>Interaction Features:</Text>
                            <UnorderedList spacing={2} pl={4}>
                                <ListItem>Dislike system for posts</ListItem>
                                <ListItem>Comment system with real-time updates</ListItem>
                                <ListItem>User-specific post management</ListItem>
                            </UnorderedList>
                        </Box>
                    </VStack>
                </TechSection>

                {/* Design Decisions */}
                <TechSection title="Design Decisions">
                    <VStack align="stretch" spacing={4} color="gray.300">
                        <Box>
                            <Text fontWeight="bold" mb={2}>UI/UX:</Text>
                            <UnorderedList spacing={2} pl={4}>
                                <ListItem>Dark theme for modern aesthetics</ListItem>
                                <ListItem>Responsive design for all screen sizes</ListItem>
                                <ListItem>Glassmorphism effects in UI components</ListItem>
                                <ListItem>Toast notifications for user feedback</ListItem>
                            </UnorderedList>
                        </Box>
                        <Box>
                            <Text fontWeight="bold" mb={2}>User Experience:</Text>
                            <UnorderedList spacing={2} pl={4}>
                                <ListItem>Confirmation dialogs for important actions</ListItem>
                                <ListItem>Clear feedback for user interactions</ListItem>
                                <ListItem>Intuitive navigation structure</ListItem>
                            </UnorderedList>
                        </Box>
                    </VStack>
                </TechSection>

                {/* Footer */}
                <Box py={8}>
                    <Divider mb={8} borderColor="whiteAlpha.300" />
                    <Text textAlign="center" color="gray.400">
                        Documentation last updated: {new Date().toLocaleDateString()}
                    </Text>
                </Box>
            </VStack>
        </Container>
    );
};

export default TechnicalOverviewPage; 