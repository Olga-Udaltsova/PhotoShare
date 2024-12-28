import { Box, Link } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { Link as RouterLink } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";

export const CreatePost = () => (
  <Tooltip showArrow content="Создать пост" positioning={{ placement: "right" }} openDelay={500}>
    <Link
      display="flex"
      to={"/create"}
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
      <FaRegPlusSquare size={25} />
      <Box display={{ base: "none", md: "block" }}>Создать пост</Box>
    </Link>
  </Tooltip>
);
