import React from "react";
import { Flex, Box, Text, Card, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Dashboard() {
  const role = localStorage.getItem("role");
  return (
    <>
      <Flex
        direction="column"
        align="center"
        justify="center"
        bg="blue.400"
        py="4"
      >
        <Heading as="h1" size="xl" color="white">
          {`${role} Dashboard`}
        </Heading>
      </Flex>
      <Flex direction={{ base: "column", md: "row" }} gap="25px" p="4">
        <Flex
          direction="column"
          gap="25px"
          justifyContent="center"
          marginTop="30px"
          align="center"
        >
          <Link
            to={{
              pathname: "/addEmployee",
            }}
          >
            <Card
              as="flex"
              width="auto"
              textAlign="center"
              height="150px"
              minW="150px"
              maxH="150px"
              bg="white"
              borderLeft="4px solid #FF0000"
              borderRadius="12px"
              boxShadow="md"
              p="4"
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="20px"
            >
              <Text fontSize="1.2rem" fontWeight="bold">
                Add Employees
              </Text>
            </Card>
          </Link>
        </Flex>
        <Flex
          direction="column"
          gap="25px"
          justifyContent="center"
          marginTop="30px"
          align="center"
        >
          <Link
            to={{
              pathname: "/employeestable",
            }}
          >
            <Card
              as="flex"
              width="auto"
              textAlign="center"
              height="150px"
              minW="150px"
              maxH="150px"
              bg="white"
              borderLeft="4px solid #FF0000"
              borderRadius="12px"
              boxShadow="md"
              p="4"
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="20px"
            >
              <Text fontSize="1.2rem" fontWeight="bold">
                Total Employees
              </Text>
              <Heading size="lg" color="black"></Heading>
            </Card>
          </Link>
        </Flex>

        <Flex
          direction="column"
          gap="25px"
          justifyContent="center"
          marginTop="30px"
          align="center"
        >
          <Link
            to={{
              pathname: "/feedback",
            }}
          >
            <Card
              as="flex"
              width="auto"
              textAlign="center"
              height="150px"
              minW="150px"
              maxH="150px"
              bg="white"
              borderLeft="4px solid #FF0000"
              borderRadius="12px"
              boxShadow="md"
              p="4"
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="20px"
            >
              <Text fontSize="1.2rem" fontWeight="bold">
                Employees Review
              </Text>
              <Heading size="lg" color="black"></Heading>
            </Card>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}

export default Dashboard;
