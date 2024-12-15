import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useShowToast } from "./useShowToast";

export const useSignUp = () => {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const signup = async (inputs) => {
    if (!inputs.email || !inputs.password || !inputs.userName || !inputs.fullName) {
      showToast("Ошибка", "Пожалуйста, заполните все поля", "error");
      return;
    }
    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      if (!newUser && error) {
        showToast("Ошибка", error.message, "error");
        return;
      }
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          userName: inputs.userName,
          fullName: inputs.fullName,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
      }
    } catch (error) {
      showToast("Ошибка", error.message, "error");
    }
  };
  return { loading, signup };
};
