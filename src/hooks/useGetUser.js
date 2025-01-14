import { useEffect, useState } from "react";
import { useShowToast } from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

export const useGetUser = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      setUserProfile(null);
      try {
        const userRef = await getDoc(doc(firestore, "users", userId));
        if (userRef.exists()) {
          setUserProfile(userRef.date());
        }
      } catch (error) {
        showToast("Ошибка", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [showToast, setIsLoading, setUserProfile, userId]);

  return { isLoading, userProfile, setUserProfile };
};
