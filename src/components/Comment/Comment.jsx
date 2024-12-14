import { Flex, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

export const Comment = ({
  createdAt = "1 день назад",
  userName = "Пользователь 10",
  profilePic = "/img2.jpg",
  text = "некоторый комментарий",
}) => {
  return (
    <Flex gap={4}>
      <Avatar src={profilePic} alt="Аватарка пользователя" size="sm" />
      <Flex flexDirection={"column"}>
        <Flex gap={4}>
          <Text fontWeight={"bold"} fontSize={12}>
            {userName}
          </Text>
          <Text fontSize={14}>{text}</Text>
        </Flex>
        <Text fontSize={12} color={"gray"}>
          {createdAt}
        </Text>
      </Flex>
    </Flex>
  );
};
