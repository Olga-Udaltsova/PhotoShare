import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";

function App() {
  const [authUser] = useAuthState(auth);
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
      </Flex>
    </>
  );
}

export default App;
