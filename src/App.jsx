import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Flex>
      <Box w={{ base: "70px", md: "240px" }}>
        <Sidebar />
      </Box>
      <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100%-240px)" }}>
        <Outlet />
      </Box>
    </Flex>
  );
}

export default App;
