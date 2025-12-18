"use client";

import { useState } from "react";

import { Button } from "@/components/application/reusable/Button/Button";
import { FormPeople } from "./FormPeople/FormPeople";
import { Box } from "@/components/application/reusable/Box/Box";
import { HStack, Icon } from "@chakra-ui/react";
import { Text } from "@/components/application/reusable/Text/Text";
import { FormCompany } from "./FormCompany/FormCompany";

//Icons
import { IoChevronBack } from "react-icons/io5";
import { LuUser, LuBuilding2 } from "react-icons/lu";
import { Link } from "../../reusable/Link/Link";

export const GeneralFormEntities = () => {
  const [typeActive, setTypeactive] = useState("person");

  return (
    <Box bg="system.light_dark" padding={4}>
      <HStack>
        <Link href="/">
        <Button
          
          h={{ base: "6", md: "8", lg: "8", xl: "8" }}
          w="auto"
          size={{ base: "xs", md: "sm", lg: "sm", xl: "sm" }}
          padding="0px 5px"
        >
          <IoChevronBack></IoChevronBack>
        </Button>
        </Link>
        <Text textAlign="left">
          Cadastro de {typeActive === "person" ? "Pessoa" : "Empresa"}:
        </Text>
      </HStack>
      <Box display="flex" gap="4" justifyContent="space-around" padding={4}>
        <Button
          bg="system.light_dark"
          flex="1"
          h="120px"
          boxShadow={
            typeActive === "person"
              ? "0px 0px 4px 2px var(--chakra-colors-system-primary)"
              : "0px 0px 4px 2px var(--chakra-colors-system-dark)"
          }
          color={typeActive === "person" ? "system.primary" : "system.light"}
          onClick={() => setTypeactive("person")}
          _hover={{
            color: typeActive === "person" ? "system.primary" : "system.light",
          }}
        >
          <Icon>
            <LuUser></LuUser>
          </Icon>
          Pessoa
        </Button>
        <Button
          flex="1"
          h="120px"
          bg="system.light_dark"
          boxShadow={
            typeActive === "company"
              ? "0px 0px 4px 2px var(--chakra-colors-system-primary)"
              : "0px 0px 4px 2px var(--chakra-colors-system-dark)"
          }
          color={typeActive === "company" ? "system.primary" : "system.light"}
          onClick={() => setTypeactive("company")}
          _hover={{
            color: typeActive === "company" ? "system.primary" : "system.light",
          }}
        >
          <LuBuilding2></LuBuilding2>
          Empresa
        </Button>
      </Box>
      {typeActive === "person" ? (
        <FormPeople></FormPeople>
      ) : (
        <FormCompany></FormCompany>
      )}
    </Box>
  );
};
