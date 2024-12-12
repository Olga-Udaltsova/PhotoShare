import { Box, Flex, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

export const PostHeader = ({ userName, avatar }) => (
  <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
    <Flex alignItems={"center"} gap={2}>
      <Avatar src={avatar} alt={userName} size="sm" />
      <Flex fontSize={12} fontWeight="bold" gap={2}>
        {userName}
        <Box color={"gray.500"}>1 w</Box>
      </Flex>
    </Flex>
    <Box cursor="pointer">
      <Text
        fontSize={12}
        color={"blue.500"}
        fontWeight={"bold"}
        _hover={{ color: "white" }}
        transition={"0.2s ease-in-out"}
      >
        Отписаться
      </Text>
    </Box>
  </Flex>
);
