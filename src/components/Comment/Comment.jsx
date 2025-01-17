import { Flex, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { useGetUser } from "@/hooks/useGetUser";
import { SpinnerCircular } from "spinners-react";
import { Link } from "react-router-dom";
import { timeAgo } from "@/utils/timeAgo";

export const Comment = ({ comment }) => {
  const { comment: commentUser, createdAt } = comment;
  const { isLoading, userProfile } = useGetUser(createdAt);

  if (isLoading)
    return (
      <SpinnerCircular
        thickness={100}
        speed={100}
        color="rgba(57, 172, 140, 1)"
        secondaryColor="rgba(0, 0, 0, 1)"
      />
    );
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
          <Text fontSize={14}>{commentUser}</Text>
        </Flex>
        <Text fontSize={12} color={"gray"}>
          {timeAgo(createdAt)}
        </Text>
      </Flex>
    </Flex>
  );
};
