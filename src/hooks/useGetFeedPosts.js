import { useEffect, useState } from "react";
import { usePostStore } from "@/store/postStore";
import { useAuthStore } from "@/store/authStore";
import { useUserProfileStore } from "@/store/userProfileStore";
import { useShowToast } from "./useShowToast";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

export const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const { setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      if (authUser.following.length === 0) {
        setIsLoading(false);
        setPosts([]);
        return;
      }
      const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following));
      try {
        const queryShapshot = await getDocs(q);
        const feedPosts = [];

        queryShapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });

        feedPosts.sort((a, b) => b.createdBy - a.createdBy);
        setPosts(feedPosts);
      } catch (error) {
        showToast("Ошибка", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) getFeedPosts();
  }, [authUser, showToast, setPosts, setUserProfile]);

  return { isLoading, posts };
};
