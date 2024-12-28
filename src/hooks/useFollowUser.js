import { useEffect } from "react";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useUserProfileStore } from "@/store/userProfileStore";
import { useShowToast } from "./useShowToast";
import { firestore } from "@/firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export const useFollowUser = (userId) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { user, setUser } = useAuthStore();
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  useEffect(() => {
    if (user) {
      const isFollowing = user.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [user, userId]);

  const handleFollowUser = async () => {
    try {
      const currentUserRef = doc(firestore, "users", user.uid);
      const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(userToFollowOrUnfollowRef, {
        followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });

      if (isFollowing) {
        setUser({ ...user, following: user.following.filter((uid) => uid !== userId) });
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter((uid) => uid !== user.uid),
          });
        }
        localStorage.setItem(
          "user-info",
          JSON.stringify({ ...user, following: user.following.filter((uid) => uid !== userId) })
        );
      } else {
        setUser({
          ...user,
          following: [...user.following, userId],
        });
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, user.uid],
          });
        }
        localStorage.setItem(
          "user-info",
          JSON.stringify({ ...user, following: [...user.following, userId] })
        );
        setIsFollowing(true);
      }
    } catch (error) {
      showToast("Ошибка", error.message, "error");
    } finally {
    }
  };

  return { isFollowing, handleFollowUser };
};
