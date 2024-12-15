import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { MdNotificationsNone } from "react-icons/md";
import { FaRegPlusSquare } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Logo, MobileLogo } from "@/assests/constans";
import { useLogout } from "@/hooks/useLogout";
import { Toaster } from "@/components/ui/toaster";

export const Sidebar = () => {
  const sidebarItems = [
    {
      icon: <IoHome size={25} />,
      text: "Главная",
      link: "/",
    },
    {
      icon: <IoSearch size={25} />,
      text: "Поиск",
      link: "/",
    },
    {
      icon: <MdNotificationsNone size={25} />,
      text: "Уведомления",
      link: "/",
    },
    {
      icon: <FaRegPlusSquare size={25} />,
      text: "Создать публикацию",
      link: "/",
    },
    {
      icon: <CgProfile size={25} />,
      text: "Профиль",
      link: ":username",
    },
  ];
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
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              display="flex"
              to={item.link}
              as={RouterLink}
              alignItems="center"
              gap={4}
              _hover={{ bg: "whiteAlpha.400" }}
              borderRadius={6}
              p={2}
              w={{ base: 10, md: "full" }}
              justifyContent={{ base: "center", md: "flex-start" }}
              alignContent={{ base: "center", md: "flex-start" }}
            >
              {item.icon}
              <Box display={{ base: "none", md: "block" }}>{item.text}</Box>
            </Link>
          ))}
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
            isLoading={isLoggingOut}
          >
            Выйти
          </Button>
          <Toaster />
        </Flex>
      </Flex>
    </Box>
  );
};
