import { Container, Flex } from "@chakra-ui/react";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import { ProfileTabs } from "@/components/Profile/ProfileTabs";
import { ProfilePosts } from "@/components/Profile/ProfilePosts";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import { useParams } from "react-router-dom";
import { UserNotFound } from "@/components/UserNotFound/UserNotFound";

export default function ProfilePage() {
  const { userName } = useParams();
  const { isLoading, userProfile } = useGetUserProfile(userName);
  const userNotFound = !isLoading && !userProfile;

  if (userNotFound) return <UserNotFound />;

  return (
    <Container maxW={"4xl"} py={5}>
      <Flex py={10} px={4} pl={{ base: 4, md: 10 }} w={"full"} mx={"auto"} flexDirection={"column"}>
        {userProfile && <ProfileHeader />}
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
        direction={"column"}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
}
