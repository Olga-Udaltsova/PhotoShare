import { Flex, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { useUserProfileStore } from "@/store/userProfileStore";
import { Link } from "react-router-dom";
import { timeAgo } from "@/utils/timeAgo";

export const Caption = ({ post }) => {
  const { comment, createdAt } = post;
  const userProfile = useUserProfileStore((state) => state.userProfile);

  return (
    <Flex gap={4}>
      <Link to={`/${userProfile.userName}`}>
        <Avatar src={userProfile.profilePicURL} alt="Аватарка пользователя" size="sm" />
      </Link>

      <Flex flexDirection={"column"}>
        <Flex gap={4} alignItems={"center"}>
          <Link to={`/${userProfile.userName}`}>
            <Text fontWeight={"bold"} fontSize={12}>
              {userProfile.userName}
            </Text>
          </Link>
          <Text fontSize={14}>{comment}</Text>
        </Flex>
        <Text fontSize={12} color={"gray"}>
          {timeAgo(createdAt)}
        </Text>
      </Flex>
    </Flex>
  );
};
