import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { FcLike } from "react-icons/fc";
import { PiHeart } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { useMemo, useState } from "react";
import { getString } from "@/helpers/getString";

export const PostFooter = ({ userName, isProfilePage }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(100);
  const numberOfLike = useMemo(() => getString(likes), [likes]);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
      return;
    }
    setLiked(true);
    setLikes(likes + 1);
  };

  return (
    <Box mb={10} mt={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLike} cursor={"pointer"} fontSize={18}>
          {!liked ? <PiHeart size={25} /> : <FcLike size={25} />}
        </Box>
        <Box cursor={"pointer"} fontSize={18}>
          <FaRegComment size={22} />
        </Box>
      </Flex>
      <Text fontSize="sm" fontWeight={600}>
        {numberOfLike}
      </Text>

      {!isProfilePage && (
        <>
          <Text fontSize={"sm"} fontWeight={700}>
            {userName}
            <Text as="span" fontWeight={400} ml={2}>
              Какой-то комментарий
            </Text>
          </Text>
          <Text fontSize={"sm"} color="gray">
            Посмотреть все комментарии
          </Text>
        </>
      )}

      <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
        <InputGroup
          flex="1"
          endElement={
            <Button
              fontSize={14}
              color={"blue.500"}
              fontWeight={600}
              cursor={"pointer"}
              _hover={{ color: "white" }}
              bg={"transparent"}
            >
              Опубликовать
            </Button>
          }
        >
          <Input variant={"flushed"} placeholder={"Добавить комментарий..."} fontSize={14} />
        </InputGroup>
      </Flex>
    </Box>
  );
};
