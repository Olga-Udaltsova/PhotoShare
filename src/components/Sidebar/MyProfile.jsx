import { Box, Link } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { Link as RouterLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useAuthStore } from "@/store/authStore";

export const MyProfile = () => {
  const authUser = useAuthStore((state) => state.user);
  return (
    <Tooltip showArrow content="Мой профиль" positioning={{ placement: "right" }} openDelay={500}>
      <Link
        display="flex"
        to={`/${authUser?.userName}`}
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
        <CgProfile size={25} />
        <Box display={{ base: "none", md: "block" }}>Профиль</Box>
      </Link>
    </Tooltip>
  );
};
