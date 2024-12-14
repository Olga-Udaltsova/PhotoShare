import { Flex, GridItem, Image, Text, Box, VStack } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import { MdDelete } from "react-icons/md";
import { Comment } from "@/components/Comment/Comment";
import { PostFooter } from "@/components/FeedPosts/FeedPost/PostFooter";

export const ProfilePost = ({ post }) => {
  const { img, likes, comments } = post;
  return (
    <DialogRoot placement={"center"} size={{ base: "sm", md: "xl" }}>
      <DialogTrigger asChild>
        <GridItem
          cursor={"pointer"}
          borderRadius={4}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"whiteAlpha.300"}
          position={"relative"}
          aspectRatio={1 / 1}
        >
          <Flex
            opacity={0}
            _hover={{ opacity: 1 }}
            position={"absolute"}
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg={"blackAlpha.700"}
            transition={"all 0.3s ease"}
            zIndex={1}
            justifyContent={"center"}
          >
            <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
              <Flex>
                <AiFillHeart size={20} />
                <Text fontWeight={"bold"} ml={2}>
                  {likes}
                </Text>
              </Flex>
              <Flex>
                <FaComment size={20} />
                <Text fontWeight={"bold"} ml={2}>
                  {comments}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Image src={img} alt="Картинка поста" w={"full"} h={"full"} objectFit={"cover"} />
        </GridItem>
      </DialogTrigger>

      <DialogContent>
        <DialogBody bg={"black"} pb={5}>
          <Flex gap={2} w={{ base: "90%", sm: "70%", md: "full" }} mx={"auto"}>
            <Box
              borderRadius={4}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"whiteAlpha.300"}
              flex={1.5}
              maxH={"max-content"}
            >
              <Image src={img} alt="Картинка поста" />
            </Box>
            <Flex flex={1} flexDirection={"column"} px={10} display={{ base: "none", md: "flex" }}>
              <Flex alignItems={"center"} justifyContent={"space-between"} mb={3}>
                <Flex alignItems={"center"} gap={4}>
                  <Avatar src="/img1.jpg" alt="Аватарка пользователя" size="sm" />
                  <Text fontWeight={"bold"} fontSize={12}>
                    Профиль
                  </Text>
                </Flex>

                <Box _hover={{ bg: "whiteAlpha.300", color: "red.600" }} borderRadius={4} p={1}>
                  <MdDelete size={20} cursor={"pointer"} />
                </Box>
              </Flex>

              <VStack w="full" alignItems={"start"} maxH={"350px"} overflowY={"auto"} mt={3} mb={3}>
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
              </VStack>

              <PostFooter isProfilePage={true} />
            </Flex>
          </Flex>
        </DialogBody>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
