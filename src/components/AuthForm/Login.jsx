import { Input } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { loading, login } = useLogin(navigate);

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
        loading={loading}
        onClick={() => login(inputs)}
      >
        Войти
      </Button>
    </>
  );
};
