import { useState } from "react";
import { useShowToast } from "./useShowToast";
import { useAuthStore } from "@/store/authStore";
import { usePostStore } from "@/store/postStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

export const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);

  const addComment = usePostStore((state) => state.addComment);

  const handlePostComment = async (postId, comment) => {
    if (isCommenting) return;
    if (!authUser)
      return showToast(
        "Ошибка",
        "Вы должны быть авторизованы, чтобы оставлять комментарии",
        "error"
      );
    setIsCommenting(true);
    const newComment = {
      comment,
      createAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };

    try {
      await updateDoc(doc(firestore, "posts", postId), {
        comments: arrayUnion(newComment),
      });

      addComment(postId, newComment);
    } catch (error) {
      showToast("Ошибка", error.message, "error");
    } finally {
      setIsCommenting(false);
    }
  };
  return { isCommenting, handlePostComment };
};
