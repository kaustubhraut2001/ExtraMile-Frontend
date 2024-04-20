import React, { useState, useEffect } from "react";
import axios from "axios";
import { Center, position, useToast, Text, Button } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

function EmployeesTable() {
  const url = import.meta.env.VITE_API_URL;
  const toast = useToast;
  const token = localStorage.getItem("token");
  const [employeelist, setEmployeelist] = useState([]);
  const navigate = useNavigate();

  const coloums = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone,
      sortable: true,
    },
  ];

  const fetchAllemployees = async () => {
    try {
      const reposne = await axios.get(`${url}/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(reposne, "res");
      if (reposne.status === 200) {
        setEmployeelist(reposne.data.allemployees);
        toast({
          title: "Success",
          description: "Employees fetched successfully",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });

      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while fetching employees",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const handleaddEmployee = async () => {
    try {
      navigate("/addemployee");
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while adding employee",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchAllemployees();
  }, []);
  return (
    <>
      <Center>
        <Text>Employee Table</Text>
      </Center>
      <Button onClick={handleaddEmployee}> +Add Employee</Button>

      <DataTable columns={coloums} data={employeelist} pagination />
    </>
  );
}

export default EmployeesTable;
