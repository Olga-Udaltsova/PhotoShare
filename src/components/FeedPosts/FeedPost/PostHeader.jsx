import { Box, Flex } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import { useFollowUser } from "@/hooks/useFollowUser";

export const PostHeader = ({ post, creatorProfile }) => {
  const { handleFollowUser, isFollowing } = useFollowUser(post.createdBy);
  return (
    <>
      {creatorProfile ? (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
          <Flex alignItems={"center"} gap={2}>
            <Link to={`/${creatorProfile.userName}`}>
              <Avatar src={creatorProfile.profilePicURL} alt={userName} size="sm" />
              <Flex fontSize={12} fontWeight="bold" gap={2}>
                {creatorProfile.userName}
                <Box color={"gray.500"}>1 w</Box>
              </Flex>
            </Link>
          </Flex>
          <Box cursor="pointer">
            <Button
              size={"sm"}
              bg={"transparent"}
              fontSize={12}
              color={"blue.500"}
              fontWeight={"bold"}
              _hover={{ color: "white" }}
              transition={"0.2s ease-in-out"}
              onClick={handleFollowUser}
            >
              {isFollowing ? "Отписаться" : "Подписаться"}
            </Button>
          </Box>
        </Flex>
      ) : (
        <SpinnerCircular
          thickness={100}
          speed={100}
          color="rgba(57, 172, 140, 1)"
          secondaryColor="rgba(0, 0, 0, 1)"
        />
      )}
    </>
  );
};
