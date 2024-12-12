import { useState } from "react";
import { Box, Button, Flex, Image, Input, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleAuth = () => {
    if (!inputs.email || !inputs.password || (!inputs.confirmPassword && !isLogin)) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    navigate("/");
  };
  return (
    <>
      <Box border="1px solid gray" borderRadius={8} padding={5}>
        <VStack spacing={4}>
          <Image src="/logo.png" cursor="pointer" w="45vh" alt="PhotoShare" />
          <Input
            placeholder="Email"
            fontSize={14}
            type="email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
          <Input
            placeholder="Пароль"
            fontSize={14}
            type="password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />

          {!isLogin ? (
            <Input
              placeholder="Повторите пароль"
              fontSize={14}
              type="password"
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          ) : null}

          <Button w="full" colorScheme="blue" size="sm" fontSize={14} onClick={handleAuth}>
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </Button>

          <Flex justifyContent="center" alignItems="center" my={4} gap={1} w="full">
            <Box flex={2} h="1px" bg={"gray.400"} />
            <Text mx={1} color="white">
              Или
            </Text>
            <Box flex={2} h="1px" bg={"gray.400"} />
          </Flex>

          <Flex justifyContent="center" alignItems="center" cursor="pointer">
            <Image src="/google.png" w={9} alt="логотип Google" />
            <Text mx={2} color={"blue.500"}>
              Войти с помощью Google
            </Text>
          </Flex>
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
