"use client";
import { Box } from "../../reusable/Box/Box";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../../data/db/db";
import { Text } from "../../reusable/Text/Text";
import { CenterLayout } from "../../reusable/Box/CenterLayout";
import { HStack } from "@chakra-ui/react";

import { CalcTransactionsYear } from "../ScriptsComponents/CalcTransactionsYear";
import { Button } from "../../reusable/Button/Button";
import { Strong } from "../../reusable/Strong/Strong";

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
        maxHeight="85vh"
        display="flex"
        flexDirection="column"
        padding={4}
      >
        <Box m={0} p={0}>
          <Text
            textAlign="left"
            fontSize={{
              base: "md",
              sm: "2xl",
              md: "2xl",
              lg: "2xl",
              xl: "2xl",
            }}
            color="system.light"
          >
            Quer fechar novos <Strong color="system.red">negócios</Strong> mas não sabe se o parceiro é <Strong>confiável?</Strong> <br />
            Faça uma <Strong>busca!</Strong>
          </Text>

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
          padding={0}
          position="relative"
        >
          {entities.map((entity) => {
            return (
              <Box
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
                flex="1"
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

          <Box
            m={0}
            p={0}
            display="flex"
            position="sticky"
            bottom="10"
            zIndex="1"
            justifyContent="flex-end"
            borderRadius="xs"
          >
            <Link href="/register">
              <Button
                opacity="0.8"
                padding={3}
                _hover={{
                  opacity: "1",
                  "& p, svg": {
                    color: "system.dark",
                    stroke: "system.dark",
                  },
                }}
                href="/"
              >
                <Icon size={{                    base: "sm",
                    sm: "md",
                    md: "md",
                    lg: "md",
                    xl: "md",}}>
                  <LuPlus></LuPlus>
                </Icon>
                <Text
                  fontSize={{
                    base: "sm",
                    sm: "md",
                    md: "md",
                    lg: "md",
                    xl: "md",
                  }}
                >
                  Cadastrar
                </Text>
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </CenterLayout>
  );
};
