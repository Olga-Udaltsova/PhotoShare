import { useEffect, useState } from "react";
import { usePostStore } from "@/store/postStore";
import { useShowToast } from "@/hooks/useShowToast";
import { useUserProfileStore } from "@/store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

export const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const showToast = useShowToast();
  const { userProfile } = useUserProfileStore();
  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;
      setIsLoading(true);
      setPosts([]);
      try {
        const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));

        const queryShapshot = await getDocs(q);

        const posts = [];
        queryShapshot.forEach((doc) => posts.push({ ...doc.data(), id: doc.id }));

        posts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(posts);
      } catch (error) {
        showToast("Ошибка", error.message, "error");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, [setPosts, userProfile, showToast]);

  return { isLoading, posts };
};
