import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import { AvatarGroup, Avatar } from "@/components/ui/avatar";

export const ProfileHeader = () => (
  <Flex gap={{ base: 4, sm: 10 }} py={3} flexDirection={{ base: "column", sm: "row" }}>
    <AvatarGroup
      size={{ base: "xl", md: "2xl" }}
      justifySelf={"center"}
      alignSelf={"self-start"}
      mx={"auto"}
    >
      <Avatar src="/img1.jpg" alt="Аватар профиля" />
    </AvatarGroup>
    <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
      <Flex
        gap={4}
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent={{ base: "center", sm: "flex-start" }}
        alignItems={"center"}
        w={"full"}
      >
        <Text fontSize={{ base: "sm", md: "lg" }}>Профиль</Text>
        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
          <Button
            bg={"white"}
            color={"black"}
            _hover={{ bg: "whiteAlpha.800" }}
            size={{ base: "xs", md: "sm" }}
          >
            Редактировать профиль
          </Button>
        </Flex>
      </Flex>
      <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
        <Text fontSize={{ base: "xs", md: "sm" }}>
          <Text as="span" fontWeight={"bold"} mr={1}>
            4
          </Text>
          поста
        </Text>

        <Text fontSize={{ base: "xs", md: "sm" }}>
          <Text as="span" fontWeight={"bold"} mr={1}>
            449
          </Text>
          подписок
        </Text>

        <Text fontSize={{ base: "xs", md: "sm" }}>
          <Text as="span" fontWeight={"bold"} mr={1}>
            100
          </Text>
          подписчиков
        </Text>
      </Flex>
      <Flex alignItems={"center"} gap={4}>
        <Text fontSize={"sm"} fontWeight={"bold"}>
          Профиль
        </Text>
      </Flex>
      <Text fontSize={"sm"}>цитата</Text>
    </VStack>
  </Flex>
);
