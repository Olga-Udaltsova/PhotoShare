import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useShowToast } from "./useShowToast";
import { collection, getDocs, orderBy, query, where, limit } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

export const useGetSuggestedUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      try {
        const usersRef = collection(firestore, "users");
        const q = query(
          usersRef,
          where("uid", "not-in", [authUser.uid, ...authUser.following]),
          orderBy("uid"),
          limit(3)
        );

        const queryShaphot = await getDocs(q);
        const users = [];

        queryShaphot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });

        setSuggestedUsers(users);
      } catch (error) {
        showToast("Ошибка", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) getSuggestedUsers();
  }, [authUser, showToast]);

  return { isLoading, suggestedUsers };
};
