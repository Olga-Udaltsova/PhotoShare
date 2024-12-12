import { Box, Container, Flex } from "@chakra-ui/react";
import { FeedPosts } from "@/components/FeedPosts/FeedPosts";

export const HomePage = () => {
  return (
    <Container maxW="7xl">
      <Flex gap={20}>
        <Box flex={2} py={10}>
          <FeedPosts />
        </Box>
        <Box flex={3} mr={20} display={{ base: "none", lg: "block" }} maxW={"300px"}>
          Suggestef
        </Box>
      </Flex>
    </Container>
  );
};
