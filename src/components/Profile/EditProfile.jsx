import { Input, Stack, Center, Badge } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Fieldset } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Field } from "@/components/ui/field";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { DialogActionTrigger } from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { usePreviewImg } from "@/hooks/usePreviewImg";
import { useEditProfile } from "@/hooks/useEditProfile";
import { useShowToast } from "@/hooks/useShowToast";
import { SpinnerCircular } from "spinners-react";

export const EditProfile = () => {
  const authUser = useAuthStore((state) => state.user);
  const [inputs, setInputs] = useState({
    fullName: authUser.fullName || "",
    userName: authUser.userName || "",
    bio: authUser.bio || "",
  });

  const fileRef = useRef();
  const showToast = useShowToast();
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const { editProfile, isUpdating } = useEditProfile();

  const handleEditProfile = async () => {
    try {
      await editProfile(inputs, selectedFile);
      setSelectedFile(null);
    } catch (error) {
      showToast("Ошибка", error.message);
    }
  };

  return (
    <Fieldset.Root>
      <Stack spacing={4} w={"full"} maxW={"md"} px={10} py={6} my={5}>
        <Fieldset.Legend lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }} mb={2}>
          Редактирование профиля
        </Fieldset.Legend>
        <Field alignItems={["center", "flex-start"]}>
          <Stack direction={["column", "row"]} gap={5}>
            <Center>
              <Avatar size="2xl" src={selectedFile || authUser.profilePicURL} position={"relative"}>
                <Badge
                  position={"absolute"}
                  top="-5px"
                  right="-10px"
                  variant="solid"
                  p={2}
                  size="sm"
                  rounded="full"
                  colorPalette="red"
                  cursor={"pointer"}
                  onClick={() => setSelectedFile(null)}
                >
                  <SmallCloseIcon />
                </Badge>
              </Avatar>
            </Center>

            <Center w="full">
              <Button w="full" onClick={() => fileRef.current.click()}>
                Изменить аватар
              </Button>
            </Center>
            <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
          </Stack>
        </Field>
        <Field label="Имя и фамилия">
          <Input
            placeholder="Иван Иванов"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={inputs.fullName}
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
          />
        </Field>
        <Field
          label="Никнейм"
          required
          invalid={!inputs.userName}
          errorText="Это поле обязательно для заполнения"
        >
          <Input
            placeholder="Иван123"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={inputs.userName}
            onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
          />
        </Field>
        <Field label="О себе">
          <Input
            placeholder="Несколько слов о себе..."
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={inputs.bio}
            onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
          />
        </Field>
        <Stack justifyContent={"space-between"} direction={["column", "row"]} w={"full"}>
          <Button
            as={DialogActionTrigger}
            bg={"red.400"}
            color={"white"}
            px={12}
            _hover={{
              bg: "red.500",
            }}
          >
            Отмена
          </Button>

          <Button
            as={DialogActionTrigger}
            bg={"blue.400"}
            color={"white"}
            px={12}
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleEditProfile}
            disabled={!inputs.userName}
          >
            {isUpdating ? (
              <SpinnerCircular
                thickness={100}
                speed={100}
                color="rgba(57, 172, 140, 1)"
                secondaryColor="rgba(0, 0, 0, 1)"
              />
            ) : (
              "Сохранить"
            )}
          </Button>
        </Stack>
      </Stack>
    </Fieldset.Root>
  );
};
