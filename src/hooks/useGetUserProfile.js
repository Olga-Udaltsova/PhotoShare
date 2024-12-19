import { useEffect, useState } from "react";
import { useShowToast } from "./useShowToast";
import { collection, query, getDocs, where } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { userUserProfileStore } from "@/store/userProfileStore";

export const useGetUserProfile = (userName) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = userUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(firestore, "users"), where("userName", "==", userName));
        const queryShaphot = await getDocs(q);

        if (queryShaphot.empty) return setUserProfile(null);
        let userDoc;
        queryShaphot.forEach((doc) => {
          userDoc = doc.data();
        });

        setUserProfile(userDoc);
      } catch (error) {
        showToast("Ошибка", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [setUserProfile, userName, showToast]);
  return { isLoading, userProfile };
};
