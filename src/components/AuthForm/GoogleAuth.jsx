import { Flex, Image, Text } from "@chakra-ui/react";

export const GoogleAuth = () => {
  return (
    <Flex justifyContent="center" alignItems="center" cursor="pointer">
      <Image src="/google.png" w={9} alt="логотип Google" />
      <Text mx={2} color={"blue.500"}>
        Войти с помощью Google
      </Text>
    </Flex>
  );
};
