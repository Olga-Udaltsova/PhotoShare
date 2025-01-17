import { Box, Center, Flex } from "@chakra-ui/react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { Toaster } from "@/components/ui/toaster";
import { SpinnerCircular } from "spinners-react";

function App() {
  const [authUser, loading] = useAuthState(auth);

  if (loading)
    return (
      <Center my={100}>
        <SpinnerCircular
          thickness={100}
          speed={100}
          color="rgba(57, 172, 140, 1)"
          secondaryColor="rgba(0, 0, 0, 1)"
        />
      </Center>
    );
  return (
    <>
      <Flex flexDirection={!authUser ? "column" : "row"}>
        {authUser ? (
          <Box w={{ base: "70px", md: "240px" }}>
            <Sidebar />
          </Box>
        ) : (
          <Navbar />
        )}
        <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100%-240px)" }} mx={"auto"}>
          <Outlet />
        </Box>
        <Toaster />
      </Flex>
    </>
  );
}

export default App;
