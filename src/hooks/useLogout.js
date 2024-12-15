import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useShowToast } from "./useShowToast";
import { useAuthStore } from "@/store/authStore";

export const useLogout = () => {
  const [signOut, isLoggingOut] = useSignOut(auth);
  const showToast = useShowToast();
  const logoutUser = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser();
    } catch (error) {
      showToast("Ошибка", error.message, "error");
    }
  };

  return { handleLogout, isLoggingOut };
};
