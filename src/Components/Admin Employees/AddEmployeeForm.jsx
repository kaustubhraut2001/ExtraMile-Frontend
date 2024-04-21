import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function AddEmployeeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${apiUrl}/api/employees/create`,
        { name, email, phone, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      if (response.status === 201) {
        toast({
          title: "Employee created.",
          description: "The employee was created successfully.",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        navigate("/employeestable");
      }
      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error creating employee.",
        description: error.message,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Center>
      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isRequired
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Phone</FormLabel>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            isRequired
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="100%">
          Create Employee
        </Button>
      </form>
    </Center>
  );
}

export default AddEmployeeForm;
