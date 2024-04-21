import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const EmployeesReviewFrom = () => {
  const location = useLocation();
  console.log(location);
  const { employeesdata } = location.state;
  const id = employeesdata._id;
  const toast = useToast();

  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${url}/addreviewpreformace/${id}`,
        { feedback, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setLoading(false);
      if (response) {
        toast({
          title: "Review Added",
          description: "Review Added Successfully",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
      // Optionally, you can redirect the user after successful submission
      // history.push("/success");
    } catch (error) {
      console.error(error);
      setError("Error adding review");
      setLoading(false);
      toast({
        title: "Error",
        description: "Error adding review",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <form onSubmit={handleSubmit}>
        <FormControl id="feedback" isRequired>
          <FormLabel>Feedback</FormLabel>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback"
          />
        </FormControl>
        <FormControl id="rating" isRequired mt={4}>
          <FormLabel>Rating</FormLabel>
          <Input
            type="string"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Enter rating (1-5)"
          />
        </FormControl>
        {error && <Box color="red.500">{error}</Box>}
        <Button
          colorScheme="blue"
          mt={4}
          type="submit"
          isLoading={loading}
          loadingText="Submitting"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default EmployeesReviewFrom;
