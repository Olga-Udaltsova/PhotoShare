import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { useShowToast } from "./useShowToast";
import { useAuthStore } from "@/store/authStore";
import { doc, getDoc } from "firebase/firestore";

export const useLogin = () => {
  const [signInWithEmailAndPassword, , loading] = useSignInWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return showToast("Ошибка", "Пожалуйста, заполните все поля", "error");
    }
    try {
      const userCerd = await signInWithEmailAndPassword(inputs.email, inputs.password);
      if (userCerd) {
        const docRef = doc(firestore, "users", userCerd.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
      }
    } catch (error) {
      showToast("Ошибка", error.message, "error");
    }
  };
  return { loading, login };
};
