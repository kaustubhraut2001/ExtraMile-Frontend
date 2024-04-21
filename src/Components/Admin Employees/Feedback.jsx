import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Center,
  position,
  useToast,
  Text,
  Button,
  Input,
  Spinner,
} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const url = import.meta.env.VITE_API_URL;
  const toast = useToast;
  const token = localStorage.getItem("token");
  const [employeelist, setEmployeelist] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [deletstate, useStatedelete] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAllemployees = async () => {
    setLoading(true);
    try {
      const reposne = await axios.get(`${url}/getAllEmployeesWithFeedback`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(reposne, "res");
      if (reposne.status === 200) {
        setEmployeelist(reposne.data.employeesWithFeedback);
        setFilteredEmployees(reposne.data.employeesWithFeedback);
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

  const handleedit = (row) => {
    navigate(`/editfeedback`, {
      state: {
        feedback: row,
      },
    });
  };

  useEffect(() => {
    fetchAllemployees();
  }, [deletstate]);

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
      name: "Employee Feedbacks",
      selector: (row) =>
        row.feedbacks.length > 0
          ? row.feedbacks.map((feed) => `${feed.feedback}\n`).join("")
          : "NA",
      sortable: true,
      cell: (row) => (
        <div style={{ whiteSpace: "pre-wrap" }}>
          {row.feedbacks.length > 0
            ? row.feedbacks.map((feed) => `${feed.feedback}\n`).join("")
            : "NA"}
        </div>
      ),
    },
    {
      name: "Ratings",
      selector: (row) =>
        row.feedbacks.length > 0
          ? row.feedbacks.map((feed) => `${feed.rating}\n`).join("")
          : "NA",
      sortable: true,
      cell: (row) => (
        <div style={{ whiteSpace: "pre-wrap" }}>
          {row.feedbacks.length > 0
            ? row.feedbacks.map((feed) => `${feed.rating}\n`).join("")
            : "NA"}
        </div>
      ),
    },

    {
      name: "Feedback Date",
      selector: (row) =>
        row.feedbacks.length > 0
          ? row.feedbacks.map((feed) => `${feed.date?.slice(0, 10)}\n`).join("")
          : "NA",
      sortable: true,
      cell: (row) => (
        <div style={{ whiteSpace: "pre-wrap" }}>
          {row.feedbacks.length > 0
            ? row.feedbacks
                .map((feed) => `${feed.date?.slice(0, 10)}\n`)
                .join("")
            : "NA"}
        </div>
      ),
    },

    {
      name: "Action",
      selector: (row) => <Button onClick={() => handleedit(row)}>Edit</Button>,
      sortable: true,
    },
  ];

  return (
    <>
      <Center>
        <Text>Employee Feedback</Text>
      </Center>
      {/* <Button onClick={handleaddEmployee}> +Add Employee</Button> */}
      <Input
        placeholder="Search"
        size="md"
        variant="filled"
        onChange={handleSearch}
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
    </>
  );
}

export default Feedback;
