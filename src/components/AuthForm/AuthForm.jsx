import { useState } from "react";
import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { GoogleAuth } from "./GoogleAuth";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border="1px solid gray" borderRadius={8} padding={5}>
        <VStack spacing={4}>
          <Image src="/logo.png" cursor="pointer" w="45vh" alt="PhotoShare" />
          {isLogin ? <Login /> : <Signup />}
          <Flex justifyContent="center" alignItems="center" my={4} gap={1} w="full">
            <Box flex={2} h="1px" bg={"gray.400"} />
            <Text mx={1} color="white">
              Или
            </Text>
            <Box flex={2} h="1px" bg={"gray.400"} />
          </Flex>
          <GoogleAuth />
        </VStack>
      </Box>

      <Box border="1px solid gray" borderRadius={8} padding={5}>
        <Flex justifyContent="center" alignItems="center">
          <Box mx={2} fontSize={14}>
            {isLogin ? "Нет аккаунта?" : "Аккаунт уже есть"}
          </Box>
          <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor="pointer">
            {isLogin ? "Зарегистрироваться" : "Войти"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};
