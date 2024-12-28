import { Grid, Text } from "@chakra-ui/react";
import { ProfilePost } from "./ProfilePost";
import { useGetUserPosts } from "@/hooks/useGetUserPosts";

export const ProfilePosts = () => {
  const { isLoading, posts } = useGetUserPosts();

  const noPostsFound = !isLoading && posts.length === 0;

  if (noPostsFound)
    return (
      <Text fontSize={"2xl"} textAlign={"center"} my={10}>
        Нет опубликованных постов
      </Text>
    );

  return (
    <Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={1} columnGap={1}>
      {posts.map((post) => (
        <ProfilePost key={post.id} post={post} />
      ))}
    </Grid>
  );
};
