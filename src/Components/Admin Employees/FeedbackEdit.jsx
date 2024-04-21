import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Box,
  Heading,
  Text,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

function FeedbackEdit() {
  const location = useLocation();
  const toast = useToast();
  const { feedbacks, ...employee } = location.state.feedback;

  const [selectedFeedback, setSelectedFeedback] = useState(feedbacks[0]);

  const handleFeedbackChange = (e) => {
    const feedbackId = e.target.value;
    const feedback = feedbacks.find((fb) => fb._id === feedbackId);
    setSelectedFeedback(feedback);
  };

  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const handleFeedbackUpdate = async () => {
    try {
      const response = await axios.put(
        `${url}/api/employees/updateReview`,
        {
          email: employee.email,
          feedbackId: selectedFeedback._id,
          feedback: selectedFeedback.feedback,
          rating: selectedFeedback.rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message === "Feedback updated successfully") {
        toast({
          title: "Feedback updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }

      console.log(response.data);
      // Handle successful submission here, e.g. show a success message
    } catch (error) {
      toast({
        title: "Error updating feedback",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      console.error(error);
    }
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="md" mb={4}>
        Employee Details
      </Heading>
      <Box mb={4}>
        <Text>Employee Name: {employee.name}</Text>
        <Text>Employee Mobile: {employee.phone}</Text>
        <Text>Employee Email: {employee.email}</Text>
      </Box>

      <FormControl mt="4">
        <FormLabel>Select Feedback</FormLabel>
        <Select value={selectedFeedback._id} onChange={handleFeedbackChange}>
          {feedbacks.map((fb) => (
            <option key={fb._id} value={fb._id}>
              Feedback: {fb.feedback} - Rating: {fb.rating}
            </option>
          ))}
        </Select>
      </FormControl>

      <Box mt="8">
        <FormControl>
          <FormLabel>Feedback</FormLabel>
          <Textarea
            value={selectedFeedback.feedback}
            onChange={(e) =>
              setSelectedFeedback({
                ...selectedFeedback,
                feedback: e.target.value,
              })
            }
          />
        </FormControl>

        <FormControl mt="4">
          <FormLabel>Rating</FormLabel>
          <NumberInput
            value={selectedFeedback.rating}
            onChange={(valueString) =>
              setSelectedFeedback({
                ...selectedFeedback,
                rating: parseInt(valueString, 10),
              })
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <Button colorScheme="blue" mt="4" onClick={handleFeedbackUpdate}>
          Update Feedback
        </Button>
      </Box>
    </Box>
  );
}

export default FeedbackEdit;
