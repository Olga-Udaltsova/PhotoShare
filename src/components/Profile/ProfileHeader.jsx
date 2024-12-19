import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import { AvatarGroup, Avatar } from "@/components/ui/avatar";
import { userUserProfileStore } from "@/store/userProfileStore";
import { useAuthStore } from "@/store/AuthStore";
import { getString } from "@/helpers/getString";

export const ProfileHeader = () => {
  const { userProfile } = userUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const visitingOwnProfile = authUser && authUser.userName === userProfile.userName;
  const visitingAnotherProfile = authUser && authUser.userName !== userProfile.userName;
  const numsOfPosts = getString(userProfile.posts.length, "пост");
  const numsOfFollowers = getString(userProfile.followers.length, "подписк");
  const numsOfFollowing = getString(userProfile.following.length, "подписчик");

  return (
    <Flex gap={{ base: 4, sm: 10 }} py={3} flexDirection={{ base: "column", sm: "row" }}>
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"self-start"}
        mx={"auto"}
      >
        <Avatar src={userProfile.profilePicURL} alt="Аватар профиля" />
      </AvatarGroup>
      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          w={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>{userProfile.userName}</Text>
          {visitingOwnProfile && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                bg={"white"}
                color={"black"}
                _hover={{ bg: "whiteAlpha.800" }}
                size={{ base: "xs", md: "sm" }}
              >
                Редактировать профиль
              </Button>
            </Flex>
          )}
          {visitingAnotherProfile && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                bg={"blue.500"}
                color={"white"}
                _hover={{ bg: "blue.600" }}
                size={{ base: "xs", md: "sm" }}
              >
                Подписаться
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {numsOfPosts}
            </Text>
          </Text>

          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {numsOfFollowers}
            </Text>
          </Text>

          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {numsOfFollowing}
            </Text>
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {userProfile.fullName}
          </Text>
        </Flex>
        <Text fontSize={"sm"}>{userProfile.bio}</Text>
      </VStack>
    </Flex>
  );
};
