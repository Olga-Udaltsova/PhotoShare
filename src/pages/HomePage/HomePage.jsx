import { Box, Container, Flex } from "@chakra-ui/react";
import { FeedPosts } from "@/components/FeedPosts/FeedPosts";
import { SuggestedUsers } from "@/components/SuggestedUsers/SuggestedUsers";
import { useAuthStore } from "@/store/authStore";

export default function HomePage() {
  const authUser = useAuthStore((state) => state.user);
  return (
    <Container maxW="7xl">
      <Flex gap={20}>
        <Box flex={2} py={10}>
          <FeedPosts />
        </Box>
        {authUser ? (
          <Box flex={3} mr={20} display={{ base: "none", lg: "block" }} maxW={"300px"}>
            <SuggestedUsers />
          </Box>
        ) : null}
      </Flex>
    </Container>
  );
}
