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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function AssignPerformanceReview() {
  const url = import.meta.env.VITE_API_URL;
  const toast = useToast();
  const token = localStorage.getItem("token");
  const [employeelist, setEmployeelist] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [deletstate, useStatedelete] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedReviewers, setSelectedReviewers] = useState([]);

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
    const filtered = employeelist.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm) &&
        employee.role === "user"
    );
    setFilteredEmployees(filtered);
  };

  useEffect(() => {
    fetchAllemployees();
  }, [deletstate]);

  const handleedit = (employee) => {
    setSelectedEmployee(employee);
    onOpen();
  };

  const handleSelectReviewer = (e) => {
    const selectedOption = Array.isArray(e.target.value)
      ? e.target.value
      : [e.target.value];
    setSelectedReviewers(selectedOption);
  };

  const handleAssignReview = async () => {
    try {
      const response = await axios.post(
        `${url}/assigntoemployee`,
        {
          reviewee: selectedEmployee._id,
          reviewers: selectedReviewers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "response");
      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Performance review assigned successfully",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        setSelectedEmployee(null);
        setSelectedReviewers([]);
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Error while assigning performance review",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

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
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Assign Employee",
      selector: (row) =>
        row.role === "user" && (
          <Button onClick={() => handleedit(row)}>Assign</Button>
        ),
      sortable: true,
    },
  ];

  return (
    <>
      <Center>
        <Text>Assign Review Table</Text>
      </Center>

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
        <div>
          <table>
            <thead>
              <tr>
                {coloums.map((coloum, index) => (
                  <th key={index}>{coloum.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.role}</td>
                  <td>
                    {employee.role === "user" && (
                      <Button onClick={() => handleedit(employee)}>
                        Assign
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assign Performance Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Select Reviewers:</Text>
            <Select
              placeholder="Select Reviewers"
              onChange={handleSelectReviewer}
            >
              {employeelist
                .filter(
                  (employee) =>
                    employee.role === "user" &&
                    employee._id !== selectedEmployee?._id
                )
                .map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name}
                  </option>
                ))}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAssignReview}>
              Assign
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AssignPerformanceReview;
