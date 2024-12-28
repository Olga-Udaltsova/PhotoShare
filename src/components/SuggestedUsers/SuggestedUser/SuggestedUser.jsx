import { Box, Flex, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useMemo } from "react";
import { getString } from "@/helpers/getString";
import { useFollowUser } from "@/hooks/useFollowUser";
import { useAuthStore } from "@/store/authStore";

export const SuggestedUser = ({ user, setUser }) => {
  const { fullName, profilePicURL, followers } = user;
  const authUser = useAuthStore((state) => state.user);
  const { isFollowing, handleFollowUser } = useFollowUser(user.uid);
  const numberOfFollowers = useMemo(() => getString(followers.length, "подписчик"), [followers]);

  const onFollowUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((follower) => follower.uid !== authUser.uid)
        : [...user.followers, authUser],
    });
  };

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar size={"md"} src={profilePicURL} />
        <VStack spacing={2} alignItems={"flex-start"}>
          <Box fontSize={12} fontWeight={"bold"}>
            {fullName}
          </Box>
          <Box fontSize={11} color={"gray.500"}>
            {numberOfFollowers}
          </Box>
        </VStack>
      </Flex>
      {authUser.uid !== user.uid && (
        <Button
          fontSize={13}
          bg={"transparent"}
          p={0}
          h={"max-content"}
          fontWeight={"medium"}
          color={"blue.400"}
          cursor={"pointer"}
          _hover={{ color: " white" }}
          onClick={onFollowUser}
        >
          {isFollowing ? "Отписаться" : "Подписаться"}
        </Button>
      )}
    </Flex>
  );
};
