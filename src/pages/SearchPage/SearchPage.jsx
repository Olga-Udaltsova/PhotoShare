import { Container, Flex, Heading, Input } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { useSearchUser } from "@/hooks/useSearchUser";
import { useRef } from "react";
import { SuggestedUser } from "@/components/SuggestedUsers/SuggestedUser/SuggestedUser";

export const SearchPage = () => {
  const searchRef = useRef(null);
  const { user, isLoading, getUserProfile, setUser } = useSearchUser();

  const handleSearchUser = (e) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };
  return (
    <Container mx={"auto"}>
      <Heading textAlign={"center"} my={4}>
        Поиск пользователя
      </Heading>
      <form onSubmit={handleSearchUser}>
        <Field label="Никнейм пользователя">
          <Input placeholder="Пользователь123" type="text" ref={searchRef} />
        </Field>
        <Flex w={"full"} justifyContent={"flex-end"}>
          <Button type="submit" ml={"auto"} size={"sm"} my={4} loading={isLoading}>
            Поиск
          </Button>
        </Flex>
      </form>
      {user && <SuggestedUser user={user} setUser={setUser} />}
    </Container>
  );
};
