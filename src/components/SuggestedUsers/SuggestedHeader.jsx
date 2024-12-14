import { Flex, Link, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Link as RouterLink } from "react-router-dom";

export const SuggestedHeader = () => (
  <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
    <Flex alignItems={"center"} gap={2}>
      <Avatar size={"lg"} src="/img1.jpg" />
      <Text fontSize={12} fontWeight={"bold"}>
        Пользователь
      </Text>
    </Flex>
    <Link
      as={RouterLink}
      to={"/"}
      fontSize={14}
      fontWeight={"medium"}
      color={"blue.400"}
      style={{ textDecoration: "none" }}
      cursor={"pointer"}
    >
      Выйти
    </Link>
  </Flex>
);
