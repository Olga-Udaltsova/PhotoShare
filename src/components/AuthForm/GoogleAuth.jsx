import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useShowToast } from "@/hooks/useShowToast";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

export const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast("Ошибка", error.message, "error");
        return;
      }
      const userRef = doc(firestore, "users", newUser.user.uid);
      const userShap = await getDoc(userRef);
      if (userShap.exists()) {
        const userDoc = userShap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
        navigate("/");
        return;
      } else {
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          userName: newUser.user.email.split("@")[0],
          fullName: newUser.user.displayName,
          bio: "",
          profilePicURL: newUser.user.photoURL,
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
  return (
    <Flex justifyContent="center" alignItems="center" cursor="pointer" onClick={handleGoogleAuth}>
      <Image src="/google.png" w={9} alt="логотип Google" />
      <Text
        mx={2}
        color={"blue.500"}
        textAlign={"center"}
        overflowWrap={"break-word"}
        lineHeight={1.2}
      >
        {prefix} с помощью Google
      </Text>
    </Flex>
  );
};
