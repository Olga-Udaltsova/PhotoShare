import { Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const UserNotFound = () => (
  <Flex flexDir={"column"} textAlign={"center"} mx={"auto"}>
    <Text fontSize={"2xl"}>Пользователь не найден :(</Text>
    <Link as={RouterLink} to="/" color={"blue.500"} w={"max-content"} mx={"auto"}>
      Вернуться на главную
    </Link>
  </Flex>
);
