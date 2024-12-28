import { Flex, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useLogout } from "@/hooks/useLogout";
import { useAuthStore } from "@/store/authStore";
import { Link } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";

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
  );
};
