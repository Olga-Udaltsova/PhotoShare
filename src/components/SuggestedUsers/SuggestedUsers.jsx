import { Flex, VStack, Text, Box, Link } from "@chakra-ui/react";
import { SuggestedHeader } from "./SuggestedHeader";
import { SuggestedUser } from "./SuggestedUser/SuggestedUser";

export const SuggestedUsers = () => {
  const suggestedUsers = [
    {
      name: "Пользователь 5",
      img: "/img1.jpg",
      followers: 1392,
    },
    {
      name: "Пользователь 6",
      img: "/img1.jpg",
      followers: 739,
    },
    {
      name: "Пользователь 7",
      img: "/img1.jpg",
      followers: 100,
    },
  ];

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"} mb={"2px"}>
          Ваши рекомендации
        </Text>
        <Text fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.400" }} cursor={"pointer"}>
          Смотреть все
        </Text>
      </Flex>
      {suggestedUsers.map((user, index) => (
        <SuggestedUser key={index} user={user} />
      ))}
      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        &copy; 2024 создано
        <Link
          href="https://github.com/Olga-Udaltsova"
          target="_blank"
          color="blue.500"
          fontSize={14}
          style={{ textDecoration: "none" }}
          ml={2}
        >
          Удальцовой Ольгой
        </Link>
      </Box>
    </VStack>
  );
};
