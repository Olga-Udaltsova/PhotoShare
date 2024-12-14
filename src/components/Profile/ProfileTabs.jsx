import { Box, Flex, Text } from "@chakra-ui/react";
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs";

export const ProfileTabs = () => (
  <Flex
    w={"full"}
    justifyContent={"center"}
    gap={{ base: 4, sm: 10 }}
    textTransform={"uppercase"}
    fontWeight={"bold"}
  >
    <Flex
      _active={{ borderTop: "1px solid white" }}
      alignItems={"center"}
      p="3"
      gap={1}
      cursor={"pointer"}
    >
      <Box fontSize={20}>
        <BsGrid3X3 />
      </Box>
      <Text fontSize={12} display={{ base: "none", sm: "block" }}>
        публикации
      </Text>
    </Flex>

    <Flex
      _active={{ borderTop: "1px solid white" }}
      alignItems={"center"}
      p="3"
      gap={1}
      cursor={"pointer"}
    >
      <Box fontSize={20}>
        <BsBookmark />
      </Box>
      <Text fontSize={12} display={{ base: "none", sm: "block" }}>
        сохраненное
      </Text>
    </Flex>

    <Flex
      _active={{ borderTop: "1px solid white" }}
      alignItems={"center"}
      p="3"
      gap={1}
      cursor={"pointer"}
    >
      <Box fontSize={20}>
        <BsSuitHeart />
      </Box>
      <Text fontSize={12} display={{ base: "none", sm: "block" }}>
        понравившееся
      </Text>
    </Flex>
  </Flex>
);
