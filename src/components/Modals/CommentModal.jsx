import {
  DialogBody,
  DialogHeader,
  DialogTitle,
  DialogCloseTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Flex, Input } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Comment } from "@/components/Comment/Comment";
import { usePostComment } from "@/hooks/usePostComment";
import { useEffect, useRef } from "react";
import { SpinnerCircular } from "spinners-react";

export const CommentModal = ({ post }) => {
  const { handlePostComment, isCommenting } = usePostComment();
  const commentRef = useRef(null);
  const commentsContainerRef = useRef(null);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    await handlePostComment(post.id, commentRef.current.value);
    commentRef.current.value = "";
  };

  useEffect(() => {
    const scrollToBottom = () => {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    };

    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [post.comments.length]);

  return (
    <DialogContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
      <DialogHeader>
        <DialogTitle>Комментарии</DialogTitle>
      </DialogHeader>
      <DialogBody pb={6}>
        <Flex
          mb={4}
          gap={4}
          flexDir={"column"}
          maxH={"250px"}
          overflowY={"auto"}
          ref={commentsContainerRef}
        >
          {post.comments.map((comment, idx) => (
            <Comment key={idx} comment={comment} />
          ))}
        </Flex>
        <form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
          <Input placeholder="Комментарий" size={"sm"} ref={commentRef} />
          <Flex w={"full"} justifyContent={"flex-end"}>
            <Button type="submit" ml={"auto"} size={"sm"} my={4}>
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
          </Flex>
        </form>
      </DialogBody>

      <DialogCloseTrigger />
    </DialogContent>
  );
};
