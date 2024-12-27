import { Flex, VStack, Text, Box, Link } from "@chakra-ui/react";
import { SuggestedHeader } from "./SuggestedHeader";
import { SuggestedUser } from "./SuggestedUser/SuggestedUser";
import { useGetSuggestedUser } from "@/hooks/useGetSuggestedUser";

export const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUser();

  if (isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      {suggestedUsers.length !== 0 && (
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"} mb={"2px"}>
            Ваши рекомендации
          </Text>
          <Text fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.400" }} cursor={"pointer"}>
            Смотреть все
          </Text>
        </Flex>
      )}
      {suggestedUsers.map((user) => (
        <SuggestedUser key={user.id} user={user} />
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
