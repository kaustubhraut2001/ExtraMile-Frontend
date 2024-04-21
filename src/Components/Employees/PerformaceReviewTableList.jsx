import React, { useState, useEffect } from "react";
import axios from "axios";
import { Center, Text, Button, Spinner, useToast } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { useLocation, useNavigate } from "react-router-dom";

function PerformaceReviewTableList() {
  const url = import.meta.env.VITE_API_URL;
  const toast = useToast();
  const token = localStorage.getItem("token");
  const [performanceReviews, setPerformanceReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem("id"); // Get the employee ID from local storage
  const [employeeName, setEmployeeName] = useState("");
  const navigate = useNavigate();

  const fetchemployeedetails = async () => {
    try {
      const response = await axios.get(
        `${url}/api/employees/getemployeedetails/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "res employee");
      if (response.status === 200) {
        setEmployeeName(response.data.name);
        toast({
          title: "Success",
          description: "Employee details fetched successfully",
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

  const fetchPerformanceReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${url}/api/employees/getperformacereview/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "res");
      if (response.status === 200) {
        setPerformanceReviews(response.data);
        toast({
          title: "Success",
          description: "Performance reviews fetched successfully",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while fetching performance reviews",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = (row) => {
    try {
      const id = row._id;
      console.log("inside handle review");
      console.log("Employee ID:", id);
      console.log("Employee Data:", row);
      navigate(`/employeeaddreview/${id}`, {
        state: {
          employeesdata: row,
        },
      });
    } catch (error) {
      console.error(error.message);
      toast({
        title: "Error",
        description: "Error while adding review",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchemployeedetails();
    fetchPerformanceReviews();
  }, []);

  const columns = [
    {
      name: "Reviewee",
      selector: () => employeeName,
      sortable: true,
    },
    {
      name: "Reviewers",
      selector: (row) => row.reviewers.join(", "),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button background={"white"} onClick={() => handleAddReview(row)}>
          Add Review
        </Button>
      ),
      sortable: true,
    },
  ];

  return (
    <>
      <Center>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Performance Review Need To Submit
        </Text>
      </Center>
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
        <DataTable columns={columns} data={performanceReviews} pagination />
      )}
    </>
  );
}

export default PerformaceReviewTableList;
