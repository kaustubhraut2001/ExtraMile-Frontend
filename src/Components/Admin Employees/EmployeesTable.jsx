import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Center,
  Text,
  Button,
  Input,
  Spinner,
  Box,
  useToast,
} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

function EmployeesTable() {
  const url = import.meta.env.VITE_API_URL;
  const toast = useToast();
  const token = localStorage.getItem("token");
  const [employeelist, setEmployeelist] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [deletstate, useStatedelete] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAllemployees = async () => {
    setLoading(true);
    try {
      const reposne = await axios.get(`${url}/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(reposne, "res");
      if (reposne.status === 200) {
        setEmployeelist(reposne.data.allemployees);
        setFilteredEmployees(reposne.data.allemployees);
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
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = employeelist.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm)
    );
    setFilteredEmployees(filtered);
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

  const handleedit = (row) => {
    navigate(`/editemployee`, {
      state: {
        employee: row,
      },
    });
  };

  const handledelete = async (row) => {
    try {
      const response = await axios.post(
        `${url}/removeemployee`,
        {
          email: row.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "res");
      useStatedelete(response.data);
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Employee deleted successfully",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        fetchAllemployees();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while deleting employee",
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
    {
      name: "Edit Employee",
      selector: (row) => (
        <Button colorScheme="blue" onClick={() => handleedit(row)}>
          Edit
        </Button>
      ),
      sortable: true,
    },
    {
      name: "Delete Employee",
      selector: (row) => (
        <Button colorScheme="red" onClick={() => handledelete(row)}>
          Delete
        </Button>
      ),
      sortable: true,
    },
  ];

  return (
    <Box p={4}>
      <Center>
        <Text fontSize="2xl" mb={4}>
          Employee Table
        </Text>
      </Center>
      <Button onClick={handleaddEmployee} colorScheme="teal" mb={4}>
        + Add Employee
      </Button>
      <Input
        placeholder="Search"
        size="md"
        variant="filled"
        onChange={handleSearch}
        mb={4}
      />
      {loading ? (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : (
        <DataTable columns={coloums} data={filteredEmployees} pagination />
      )}
    </Box>
  );
}

export default EmployeesTable;
