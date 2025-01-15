import { Container, Flex, Heading, Image, Input, Textarea } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { CloseButton } from "@/components/ui/close-button";
import { SpinnerCircular } from "spinners-react";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { usePreviewImg } from "@/hooks/usePreviewImg";
import { useShowToast } from "@/hooks/useShowToast";
import { useAuthStore } from "@/store/authStore";
import { useUserProfileStore } from "@/store/userProfileStore";
import { usePostStore } from "@/store/postStore";
import { useLocation } from "react-router-dom";
import { firestore, storage } from "@/firebase/firebase";
import { doc, addDoc, updateDoc, arrayUnion, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function CreatePage() {
  const [caption, setCaption] = useState("");
  const imageRef = useRef(null);
  const { selectedFile, setSelectedFile, handleImageChange } = usePreviewImg();
  const showToast = useShowToast();
  const { isLoading, handleCreatePost } = useCreatePost();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption);
      setCaption("");
      setSelectedFile("");
    } catch (error) {
      showToast("Ошибка", error.message, "error");
    }
  };

  return (
    <Container px={40}>
      <Heading textAlign={"center"} my={4}>
        Создать пост
      </Heading>
      <Flex direction={"column"} gap={2}>
        <Textarea
          placeholder="Текст..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Input type="file" hidden ref={imageRef} onChange={handleImageChange} />
        <BsFillImageFill
          style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
          size={20}
          onClick={() => imageRef.current.click()}
        />
        {selectedFile && (
          <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
            <Image src={selectedFile} alt="Выбранная картинка" />
            <CloseButton
              position={"absolute"}
              top={2}
              right={2}
              onClick={() => setSelectedFile("")}
            />
          </Flex>
        )}

        <Button mr={3} alignSelf={"flex-end"} onClick={handlePostCreation}>
          {isLoading ? (
            <SpinnerCircular
              thickness={100}
              speed={100}
              color="rgba(57, 172, 140, 1)"
              secondaryColor="rgba(0, 0, 0, 1)"
            />
          ) : (
            "Создать"
          )}
        </Button>
      </Flex>
    </Container>
  );
}

function useCreatePost() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const { createPost } = usePostStore();
  const { addPost, userProfile } = useUserProfileStore();
  const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return;
    if (!selectedFile) return showToast("Ошибка", "Пожалуйста, выберите изображение", "error");
    setIsLoading(true);
    const newPost = {
      caption,
      likes: [],
      comments: [],
      createAt: Date.now(),
      createBy: authUser.uid,
    };

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      if (userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocRef.id });

      if (pathname !== "/" ?? userProfile.uid === authUser.uid)
        addPost({ ...newPost, id: postDocRef.id });

      showToast("Успешно", "Пост успешно создан", "success");
    } catch (error) {
      showToast("Ошибка", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
}
