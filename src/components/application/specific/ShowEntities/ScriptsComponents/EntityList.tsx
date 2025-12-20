import { LuPlus } from "react-icons/lu";
import { Text } from "@/components/application/reusable/Text/Text";
import { Box } from "@/components/application/reusable/Box/Box";
import { Link } from "@/components/application/reusable/Link/Link";
import { HStack, Icon } from "@chakra-ui/react";
import { CalcTransactionsYear } from "./CalcTransactionsYear";
import { Button } from "@/components/application/reusable/Button/Button";
import { Entities } from "@/data/models/entities";

interface EntityListProps {
  entities: Entities[];
}

export const EntityList = ({ entities }: EntityListProps) => {
  if (entities.length === 0) {
    return (
      <Text mt={4} textAlign="center">
        Nenhum registro encontrado.
        <Box
        m={0}
        mt={5}
        p={0}
        display="flex"
        position="sticky"
        bottom="10"
        zIndex="1"
        justifyContent="center"
        borderRadius="xs"
      >
        <Link href="/register">
          <Button
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
            <Icon size={{ base: "sm", sm: "md"}}>
              <LuPlus></LuPlus>
            </Icon>
            <Text
              fontSize="baseSmRestMd"
            >
              Cadastrar Novo
            </Text>
          </Button>
        </Link>
      </Box>
      </Text>
    );
  }

  return (
    <Box
      mt={3}
      display="flex"
      flexDirection="column"
      gap="4"
      overflowY="auto"
      borderRadius="2xl"
      padding={1}
      position="relative"
      boxShadow="none"
    >
      {entities.map((entity) => {
        return (
          <Box
            cursor="pointer"
            key={entity.id}
            bg="system.teste"
            boxShadow="md"
            _hover={{
              boxShadow: "0px 0px 4px 2px var(--chakra-colors-system-primary)",
              color: "system.primary",
            }}
            padding={4}
            flex="1"
          >
            <HStack display="flex" justifyContent="space-between">
              <Text textAlign="left" color="system.primary" fontSize="baseMdRestXl">
                {entity.name}
              </Text>
              <Text textAlign="right" fontSize="baseXsRestSm">
                Risco {entity.riskLevel}
              </Text>
            </HStack>
            <Text textAlign="left" fontSize="baseXsRestSm">
              {entity.type === "Person" ? "CPF: " : "CNPJ: "}
              {entity.type === "Person"
                ? entity.cpfCnpj
                    .replace(/(\={0,3})(\d{1,3})/, "$1$2")
                    .replace(/(\d{3})(\d)/, "$1.$2")
                    .replace(/(\d{3})(\d)/, "$1.$2")
                    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
                : entity.cpfCnpj
                    .replace(/^(\d{2})(\d)/, "$1.$2")
                    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
                    .replace(/\.(\d{3})(\d)/, ".$1/$2")
                    .replace(/(\d{4})(\d)/, "$1-$2")}
            </Text>
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
            <Icon size={{ base: "sm", sm: "md"}}>
              <LuPlus></LuPlus>
            </Icon>
            <Text
              fontSize="baseSmRestMd"
            >
              Cadastrar
            </Text>
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
