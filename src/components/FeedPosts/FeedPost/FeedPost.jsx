import { PostHeader } from "./PostHeader";
import { PostFooter } from "./PostFooter";
import { Box, Image } from "@chakra-ui/react";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";

export const FeedPost = ({ post }) => {
  const { imageURL, createdBy } = post;
  const { userProfile } = useGetUserProfile(createdBy);
  return (
    <>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={imageURL} alt={"Изображение публикации"} />
      </Box>
      <PostFooter post={post} creatorProfile={userProfile} />
    </>
  );
};
