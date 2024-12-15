import { Button, Container, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navbar = () => (
  <Container maxW={"5xl"} my={4}>
    <Flex w={"full"} justifyContent={{ base: "center", md: "space-between" }} alignItems={"center"}>
      <Image
        src="/logo.png"
        maxW={"200px"}
        display={{ base: "none", sm: "block" }}
        cursor={"pointer"}
      />
      <Flex gap={4}>
        <Link to="/auth">
          <Button colorScheme={"blue"} size={"sm"}>
            Войти
          </Button>
        </Link>
        <Link to="/auth">
          <Button variant={"outline"} size={"sm"}>
            Зарегистрироваться
          </Button>
        </Link>
      </Flex>
    </Flex>
  </Container>
);
