import { Box, Flex, Link } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Link as RouterLink } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Logo, MobileLogo } from "@/assests/constans";
import { useLogout } from "@/hooks/useLogout";
import { SidebarItems } from "./SidebarItems";
import { SpinnerCircular } from "spinners-react";

export const Sidebar = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  return (
    <Box
      h={"100vh"}
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position="sticky"
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction="column" gap={10} w="full" h="full">
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor="pointer"
        >
          <Logo />
        </Link>
        <Link
          to={"/"}
          as={RouterLink}
          p={2}
          display={{ base: "block", md: "none" }}
          cursor="pointer"
          borderRadius={6}
          _hover={{
            bg: "whiteAlpha.200",
          }}
          w={12}
        >
          <MobileLogo />
        </Link>
        <Flex direction="column" gap={5} cursor="pointer">
          <SidebarItems />
        </Flex>
        <Flex
          onClick={handleLogout}
          alignItems="center"
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          alignContent={{ base: "center", md: "flex-start" }}
          mt={"auto"}
        >
          <RiLogoutBoxLine size={25} />
          <Button
            display={{ base: "none", md: "block" }}
            variant={"ghost"}
            _hover={{ bg: "transparent" }}
          >
            {isLoggingOut ? (
              <SpinnerCircular
                thickness={100}
                speed={100}
                color="rgba(57, 172, 140, 1)"
                secondaryColor="rgba(0, 0, 0, 1)"
              />
            ) : (
              "Выйти"
            )}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
