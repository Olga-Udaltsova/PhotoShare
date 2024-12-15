import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { Toaster } from "@/components/ui/toaster";

export const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { loading, login } = useLogin();
  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        type="email"
        value={inputs.email}
        size={"sm"}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <Input
        placeholder="Пароль"
        fontSize={14}
        type="password"
        value={inputs.password}
        size={"sm"}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />

      <Button
        w="full"
        colorScheme="blue"
        size="sm"
        fontSize={14}
        isLoading={loading}
        onClick={() => login(inputs)}
      >
        Войти
      </Button>
      <Toaster />
    </>
  );
};
