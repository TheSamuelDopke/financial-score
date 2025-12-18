"use client";
import { Box } from "../../reusable/Box/Box";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../../data/db/db";
import { Text } from "../../reusable/Text/Text";
import { CenterLayout } from "../../reusable/Box/CenterLayout";
import { HStack } from "@chakra-ui/react";

import { CalcTransactionsYear } from "../ScriptsComponents/CalcTransactionsYear";
import { Button } from "../../reusable/Button/Button";

import { LuPlus } from "react-icons/lu";
import { Icon } from "@chakra-ui/react";
import { Link } from "../../reusable/Link/Link";
import { Input } from "../../reusable/Input/Input";

export const ShowEntities = () => {
  const entities = useLiveQuery(() => db.entities.toArray());

  if (!entities) {
    return <Text textAlign="center">Carregando Entidades...</Text>;
  }

  return (
    <CenterLayout>
      <Box
        bg="system.light_dark"
        mt={3}
        maxHeight="90vh"
        display="flex"
        flexDirection="column"
        padding={4}
      >
        <Box display="flex" justifyContent="space-between" m={0} p={0}>
          <Text textAlign="left" fontSize="2xl" color="system.light">
            Gerencie os riscos do seu negócio!
          </Text>
          <Link href="/register">
            <Button
              textAlign="right"
              alignSelf="right"
              padding={3}
              borderRadius="xs"
              m={0}
              _hover={{
                "& p, svg": {
                  color: "black",
                  stroke: "black", 
                },
              }}
            >
              <Icon>
                <LuPlus></LuPlus>
              </Icon>
              <Text fontSize="md">Cadastrar</Text>
            </Button>
          </Link>
        </Box>
        
          <Box marginTop={4}>


                  <Input label="Buscar Empresa/Pessoa" fontWeight="normal"></Input>
          </Box>


        <Box
          mt={3}
          display="flex"
          flexDirection="column"
          gap="4"
          overflowY="auto"
          borderRadius="2xl"
          padding={1}
        >
          {entities.map((entity) => {
            return (
              <Box
                m="auto"
                cursor="pointer"
                key={entity.id}
                bg="system.teste"
                boxShadow="md"
                _hover={{
                  boxShadow:
                    "0px 0px 4px 2px var(--chakra-colors-system-primary)",
                  color: "system.primary",
                }}
                padding={4}
              >
                <HStack display="flex" justifyContent="space-between">
                  <Text textAlign="left" color="system.primary">
                    {entity.name}
                  </Text>
                  <Text textAlign="right" fontSize="xs">
                    Risco {entity.riskLevel}
                  </Text>
                </HStack>
                <Text textAlign="left">
                  {entity.id && <CalcTransactionsYear entityId={entity.id} />}
                </Text>
              </Box>
            );
          })}

          {entities.length === 0 && <Text>Nenhum registro encontrado.</Text>}
        </Box>
      </Box>
    </CenterLayout>
  );
};
