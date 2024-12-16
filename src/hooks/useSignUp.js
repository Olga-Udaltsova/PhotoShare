import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { doc, getDocs, setDoc } from "firebase/firestore";
import { useShowToast } from "./useShowToast";
import { useAuthStore } from "@/store/authStore";
import { collection, query, where } from "firebase/firestore";

export const useSignUp = (navigate) => {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const signup = async (inputs) => {
    if (!inputs.email || !inputs.password || !inputs.userName || !inputs.fullName) {
      showToast("Ошибка", "Пожалуйста, заполните все поля", "error");
      return;
    }

    const userRef = collection(firestore, "users");

    const q = query(userRef, where("userName", "==", inputs.userName));
    const querySnapShot = await getDocs(q);

    if (!querySnapShot.empty) {
      showToast("Ошибка", "Пользователь с таким именем уже существует", "error");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      if (!newUser && error) {
        showToast("Ошибка", error.message, "error");
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
        loginUser(userDoc);
        navigate("/");
      }
    } catch (error) {
      showToast("Ошибка", error.message, "error");
    }
  };
  return { loading, signup };
};
