import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { FcLike } from "react-icons/fc";
import { PiHeart } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { useMemo, useRef, useState } from "react";
import { getString } from "@/helpers/getString";
import { usePostComment } from "@/hooks/usePostComment";
import { useAuthStore } from "@/store/authStore";
import { SpinnerCircular } from "spinners-react";

export const PostFooter = ({ post, userName, isProfilePage }) => {
  const authUser = useAuthStore((state) => state.user);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(100);
  const numberOfLike = useMemo(() => getString(likes), [likes]);
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
      return;
    }
    setLiked(true);
    setLikes(likes + 1);
  };

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };

  return (
    <Box mb={10} mt={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLike} cursor={"pointer"} fontSize={18}>
          {!liked ? <PiHeart size={25} /> : <FcLike size={25} />}
        </Box>
        <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
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

      {authUser && (
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
                onClick={handleSubmitComment}
              >
                {isCommenting ? (
                  <SpinnerCircular
                    thickness={100}
                    speed={100}
                    color="rgba(57, 172, 140, 1)"
                    secondaryColor="rgba(0, 0, 0, 1)"
                  />
                ) : (
                  "Опубликовать"
                )}
              </Button>
            }
          >
            <Input
              variant={"flushed"}
              placeholder={"Добавить комментарий..."}
              fontSize={14}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              ref={commentRef}
            />
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};
