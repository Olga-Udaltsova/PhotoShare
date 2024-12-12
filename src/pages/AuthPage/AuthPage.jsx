import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import { AuthForm } from "@/components/AuthForm/AuthForm";

export const AuthPage = () => {
  return (
    <Flex minH="100vh" justifyContent="center" alignItems="center" px={4}>
      <Container maxW="3xl" padding={0}>
        <Flex justifyContent="center" alignItems="center" gap={10}>
          <Box display={{ base: "none", md: "block" }}>
            <Image src="/auth.jpg" w={550} h={440} borderRadius={10} alt="Картинка приложения" />
          </Box>
          <VStack spacing={4} align="stretch">
            <AuthForm />
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};
