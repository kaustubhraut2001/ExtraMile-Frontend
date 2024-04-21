import React from "react";
import { Flex, Card, Text, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function EmployeesDashboard() {
  const role = localStorage.getItem("role");
  const handlelogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

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
        <Button onClick={handlelogout}>Log out</Button>
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
              pathname: "/perfromacereviewlist",
            }}
          >
            <Card
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
                Performance Review You Have
              </Text>
            </Card>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}

export default EmployeesDashboard;
