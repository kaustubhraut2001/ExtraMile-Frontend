import React from "react";
import { Flex, Box, Text, Card, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function EmployeesDashboard() {
  return (
    <>
      <Flex direction={{ base: "column", md: "row" }} gap="25px">
        <Flex
          direction={{ md: "column" }}
          gap="25px"
          justifyContent="center"
          marginTop="30px"
          align="center"
        >
          {/* Chnage Link */}
          <Link
            to={{
              pathname: "/perfromacereviewlist",
              //   state: { users },
            }}
          >
            <Card
              as="flex"
              width="auto"
              textAlign="center"
              height={{ base: "100%", md: "150px" }}
              minW="150px"
              maxH="150px"
              bg="white"
              borderLeft="4px solid #FF0000"
              borderRadius="12px"
              boxShadow="md" // Add a shadow for a card-like appearance
              p="2" // Adjust padding as needed
              display="flex"
              // flexDirection={{ base: "column", md: "column", lg: "column" }}
              direction={{ base: "column", md: "row", lg: "row" }}
              justifyContent={{ base: "center", md: "space-around" }}
              alignItems="center"
              gap="20px"
            >
              {/* <img src={""} alt="Total Customers" /> */}
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Performance Review You have
              </Text>
            </Card>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}

export default EmployeesDashboard;
