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

export const ShowEntities = () => {
  const entities = useLiveQuery(() => db.entities.toArray());

  if (!entities) {
    return <Text>Carregando Entidades...</Text>;
  }

  return (
    <CenterLayout>
      <Box bg="system.light_dark" boxShadow="md" mt={5}>
        <Text textAlign="left" fontSize="xl">
          Entidades:
        </Text>
        {entities.map((entity) => {
          return (
            <Box
              cursor="pointer"
              key={entity.id}
              m={5}
              bg="system.teste"
              boxShadow="md"
              _hover={{
                boxShadow:
                  "0px 0px 4px 2px var(--chakra-colors-system-primary)",
                color: "system.primary",
              }}
            >
              <HStack display="flex" justifyContent="space-between">
                <Text textAlign="left">{entity.name}</Text>
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
        <Box display="flex" justifyContent="flex-end">
          <Link href="/register">
          
          <Button textAlign="right" alignSelf="right" padding={0} borderRadius="full">
            <Icon>
              <LuPlus></LuPlus>
            </Icon>
          </Button>
          </Link>
        </Box>
      </Box>
    </CenterLayout>
  );
};
