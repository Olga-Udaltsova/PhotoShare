import { Container, Text } from "@chakra-ui/react";
import { FeedPost } from "./FeedPost/FeedPost";
import { useGetFeedPosts } from "@/hooks/useGetFeedPosts";
import { SpinnerCircular } from "spinners-react";

export const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  if (isLoading)
    <SpinnerCircular
      thickness={100}
      speed={100}
      color="rgba(57, 172, 140, 1)"
      secondaryColor="rgba(0, 0, 0, 1)"
    />;

  return (
    <Container maxW={"md"} py={10} px={2}>
      {posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}
      {posts.length === 0 && (
        <>
          <Text fontSize={"md"} color={"red.400"}>
            Упс... Кажется, вы ни на кого не подписаны.
          </Text>
          <Text color={"red.400"}>
            Чтобы видеть чужие посты - подпишитесь на других пользователей
          </Text>
        </>
      )}
    </Container>
  );
};
