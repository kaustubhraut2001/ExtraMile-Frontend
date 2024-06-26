import React, { useState, useRef, useEffect } from "react";

import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Image,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Login() {
  const [loader, setLoader] = useState(false);
  const username = useRef();
  const password = useRef();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const url = import.meta.env.VITE_API_URL;
  const handleLogin = async (e) => {
    const user = {
      email: username.current.value,
      password: password.current.value,
    };
    console.log(user);
    setLoader(true);
    try {
      const response = await axios.post(`${url}/api/employees/login`, user);

      console.log(response);
      if (response.status === 200) {
        console.log(response.data.token, "token");
        // localStorage.setItem("user", JSON.stringify(response.employee.data));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.employee.role);
        localStorage.setItem("id", response.data.employee._id);
        localStorage.setItem("email", response.data.employee.email);
        localStorage.setItem("name", response.data.employee.name);

        toast({
          title: "Login Success",
          description: "Login Sucessful",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        setLoader(false);
        if (role === "admin") {
          navigate("/dashboard");
        }

        if (role === "user") {
          navigate("/employeesdashboard");
        }
        // window.location.replace("/");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid Credentials",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      setLoader(false);
      console.log(error);
    }
  };

  const handleshow = () => {
    setShow(!show);
    if (show) {
      password.current.type = "password";
    } else {
      password.current.type = "text";
    }
  };
  return loader ? (
    <Center height={"100vh"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  ) : (
    <>
      <Box
        bg={"whitesmoke"}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh" // Ensure the content takes up at least the full viewport height
      >
        <Box width={["300px", "500px"]} padding={"2rem"} bg={"white"}>
          <Center fontSize={"1.5rem"} fontWeight={"600"}>
            Login
          </Center>

          <Box
            display="flex"
            justifyContent={"center"}
            flexDirection="column"
            alignItems="center"
            textAlign={"center"}
            // Set a maximum width for responsiveness
            // Take up 90% of the parent container's width
            mt="20px" // Add margin at the top
          >
            <Box width="100%" mb="20px">
              {" "}
              {/* Adjust width and add margin-bottom */}
              <Input ref={username} placeholder="UserName" />
            </Box>
            <Box width="100%" mb="20px">
              <Input type="password" ref={password} placeholder="Password" />
              <button onClick={handleshow}>Show</button>
            </Box>
            <Button
              height="3rem"
              width="100%"
              borderRadius="6px"
              color="#fff"
              background="teal"
              fontSize={["0.9rem", "1.3rem"]}
              fontWeight={700}
              fontFamily='"Poppins", sans-serif'
              mb="20px" // Add margin-bottom
              _hover={{ background: "FloralWhite", color: "black" }}
              onClick={handleLogin}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Login;
