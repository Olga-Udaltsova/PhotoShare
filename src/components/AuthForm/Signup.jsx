import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import { useState } from "react";
import { useSignUp } from "@/hooks/useSignUp";
import { useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";

export const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, signup } = useSignUp(navigate);

  return (
    <>
      <Input
        placeholder="Имя и фамилия пользователя"
        fontSize={14}
        type="text"
        value={inputs.fullName}
        size={"sm"}
        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
      />
      <Input
        placeholder="Никнейм пользователя"
        fontSize={14}
        type="text"
        value={inputs.userName}
        size={"sm"}
        onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
      />
      <Input
        placeholder="Email"
        fontSize={14}
        type="email"
        value={inputs.email}
        size={"sm"}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <InputGroup
        w={"full"}
        endElement={
          <Button
            h="full"
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        }
      >
        <Input
          placeholder="Пароль"
          fontSize={14}
          type={showPassword ? "text" : "password"}
          value={inputs.password}
          size={"sm"}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
      </InputGroup>
      <Button w="full" colorScheme="blue" size="sm" fontSize={14} onClick={() => signup(inputs)}>
        {loading ? (
          <SpinnerCircular
            thickness={100}
            speed={100}
            color="rgba(57, 172, 140, 1)"
            secondaryColor="rgba(0, 0, 0, 1)"
          />
        ) : (
          "Зарегистрироваться"
        )}
      </Button>
    </>
  );
};
