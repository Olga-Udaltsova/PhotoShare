import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { useMemo, useState } from "react";
import { getStrOfLikes } from "@/helpers/getStrOfLikes";

export const SuggestedUser = ({ user }) => {
  const { name, img, followers } = user;
  const [follower, setFollower] = useState(followers);
  const [isFollowed, setIsFollowed] = useState(false);
  const numberOfFollowers = useMemo(() => getStrOfLikes(follower, "подписчик"), [follower]);

  const handleFollower = () => {
    if (isFollowed) {
      setIsFollowed(false);
      setFollower(follower - 1);
      return;
    }
    setIsFollowed(true);
    setFollower(follower + 1);
  };

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar size={"md"} src={img} />
        <VStack spacing={2} alignItems={"flex-start"}>
          <Box fontSize={12} fontWeight={"bold"}>
            {name}
          </Box>
          <Box fontSize={11} color={"gray.500"}>
            {numberOfFollowers}
          </Box>
        </VStack>
      </Flex>
      <Button
        fontSize={13}
        bg={"transparent"}
        p={0}
        h={"max-content"}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
        _hover={{ color: " white" }}
        onClick={handleFollower}
      >
        {isFollowed ? "Подписаться" : "Отписаться"}
      </Button>
    </Flex>
  );
};
