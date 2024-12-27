import { useState } from "react";
import { useShowToast } from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

export const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  const getUserProfile = async (userName) => {
    setIsLoading(true);
    setUser(null);
    try {
      const q = query(collection(firestore, "users"), where("userName", "==", userName));
      const queryShaphot = await getDocs(q);

      if (queryShaphot.empty) return showToast("Ошибка", "Пользователь не найден", "error");

      queryShaphot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      showToast("Ошибка", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, getUserProfile, user, setUser };
};
