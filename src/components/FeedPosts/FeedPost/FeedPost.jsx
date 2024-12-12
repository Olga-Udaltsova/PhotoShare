import { PostHeader } from "./PostHeader";
import { PostFooter } from "./PostFooter";
import { Box, Image } from "@chakra-ui/react";

export const FeedPost = ({ ...props }) => {
  const { image, userName, avatar } = props;
  return (
    <>
      <PostHeader userName={userName} avatar={avatar} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={image} alt={userName} />
      </Box>
      <PostFooter userName={userName} />
    </>
  );
};
