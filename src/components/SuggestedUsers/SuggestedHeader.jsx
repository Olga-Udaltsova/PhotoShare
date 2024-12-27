import { Button, Flex, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { useLogout } from "@/hooks/useLogout";
import { useAuthStore } from "@/store/authStore";
import { Link } from "react-router-dom";

export const SuggestedHeader = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) return null;

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${authUser.userName}`}>
          <Avatar size={"lg"} src={authUser.profilePicURL} />
        </Link>

        <Link to={`${authUser.userName}`}>
          <Text fontSize={12} fontWeight={"bold"}>
            {authUser.userName}
          </Text>
        </Link>
      </Flex>
      <Button
        size={"xs"}
        bg={"transparent"}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
        onClick={handleLogout}
        loading={isLoggingOut.toString()}
      >
        Выйти
      </Button>
    </Flex>
  );
};
