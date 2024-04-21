import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
} from "@chakra-ui/react";

function EditEmployeeForm() {
  const locationdata = useLocation();
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_API_URL;
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setName(locationdata.state.employee.name);
    setEmail(locationdata.state.employee.email);
    setPhone(locationdata.state.employee.phone);
    setPassword(locationdata.state.employee.password);
  }, [locationdata]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const email = locationdata.state.employee.email;
    try {
      const response = await axios.put(
        `${url}/api/employees/updateemployeesdetails`,
        {
          name,
          email,
          phone,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast({
        title: "Success",
        description: "Employee details updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>
        Edit Employee
      </Heading>
      <form onSubmit={handleEdit}>
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Phone</FormLabel>
          <Input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Update Employee
        </Button>
      </form>
    </Box>
  );
}

export default EditEmployeeForm;
