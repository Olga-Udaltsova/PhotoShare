import { Flex, Text, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { AvatarGroup, Avatar } from "@/components/ui/avatar";
import { useUserProfileStore } from "@/store/userProfileStore";
import { useAuthStore } from "@/store/AuthStore";
import { getString, getStringOfFollowing } from "@/helpers/getString";
import {
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditProfile } from "./EditProfile";
import { useFollowUser } from "@/hooks/useFollowUser";

export const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);
  const authUser = useAuthStore((state) => state.user);
  const visitingOwnProfile = authUser && authUser.userName === userProfile.userName;
  const visitingAnotherProfile = authUser && authUser.userName !== userProfile.userName;
  const numsOfPosts = getString(userProfile.posts.length, "пост");
  const numsOfFollowing = getStringOfFollowing(userProfile.following.length);
  const numsOfFollowers = getString(userProfile.followers.length, "подписчик");

  return (
    <DialogRoot placement={"center"} size={{ base: "sm", md: "xl" }}>
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
              <DialogTrigger asChild>
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
              </DialogTrigger>
            )}
            {visitingAnotherProfile && (
              <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                <Button
                  bg={"blue.500"}
                  color={"white"}
                  _hover={{ bg: "blue.600" }}
                  size={{ base: "xs", md: "sm" }}
                  onClick={handleFollowUser}
                  loading={isUpdating}
                >
                  {isFollowing ? "Отписаться" : "Подписаться"}
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
                {numsOfFollowing}
              </Text>
            </Text>

            <Text fontSize={{ base: "xs", md: "sm" }}>
              <Text as="span" fontWeight={"bold"} mr={1}>
                {numsOfFollowers}
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

      <DialogContent
        maxW={"max-content"}
        maxH={"max-content"}
        bg={"black"}
        rounded={"xl"}
        boxShadow={"lg"}
      >
        <EditProfile />

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
