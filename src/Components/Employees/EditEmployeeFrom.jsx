import { position } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function EditEmployeeFrom() {
  const locationdata = useLocation();
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_API_URL;
  const toast = useToast();
  console.log(locationdata.state.employee, "location date");
  const handleedit = async () => {
    try {
      const response = await axios.put(`${url}/update`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        name,
        phone,
        password,
      });
    } catch (error) {
      toast({
        type: "error",
        title: "Error",
        description: error.message,
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    handleedit();
  }, []);
  return <div>EditEmployeeFrom</div>;
}

export default EditEmployeeFrom;
