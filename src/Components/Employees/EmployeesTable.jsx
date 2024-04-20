import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Center,
  position,
  useToast,
  Text,
  Button,
  Input,
} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

function EmployeesTable() {
  const url = import.meta.env.VITE_API_URL;
  const toast = useToast;
  const token = localStorage.getItem("token");
  const [employeelist, setEmployeelist] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const navigate = useNavigate();

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

  const handledelete = async (row) => {};

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
      selector: (row) => <Button onClick={() => handleedit(row)}>Edit</Button>,
      sortable: true,
    },
    {
      name: "Delete Employee",
      selector: (row) => (
        <Button background={"red"} onClick={() => handledelete(row)}>
          Delete
        </Button>
      ),
      sortable: true,
    },
  ];

  return (
    <>
      <Center>
        <Text>Employee Table</Text>
      </Center>
      <Button onClick={handleaddEmployee}> +Add Employee</Button>
      <Input
        placeholder="Search"
        size="md"
        variant="filled"
        onChange={handleSearch}
      />
      <DataTable columns={coloums} data={filteredEmployees} pagination />
    </>
  );
}

export default EmployeesTable;
