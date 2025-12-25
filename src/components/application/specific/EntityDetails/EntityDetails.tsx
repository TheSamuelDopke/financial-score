"use client";

import { db } from "@/data/db/db";
import { EntitySchema } from "@/data/models/entities";
import { Text } from "../../reusable/Text/Text";
import { Box } from "../../reusable/Box/BoxNoWidth";

import { CenterLayout } from "../../reusable/Box/CenterLayout";
import { NotFound } from "../../reusable/Not-Found/NotFound";
import { HStack, Icon } from "@chakra-ui/react";
import { RISK_META } from "../../reusable/Metas/RiskLevelCustom";
import { LuUser, LuBuilding2 } from "react-icons/lu";
import { dateFormatter } from "@/components/application/reusable/Scripts/getDateFormatter";
import { useLiveQuery } from "dexie-react-hooks";

import { useState } from "react";
import { TransactionSummary } from "./Components/TransactionsSummary";
import { Button } from "../../reusable/Button/Button";
import { Link } from "../../reusable/Link/Link";

export interface EntityDetailsProps {
  entityId: string;
}

export function EntityDetails({ entityId }: EntityDetailsProps) {
  const [error, setError] = useState<string | null>(null);

  const entity = useLiveQuery(async () => {
    try {
      const data = await db.entities.get(Number(entityId));
      if (!data) throw new Error("Entidade não encontrada!");
      return EntitySchema.parse(data);
    } catch (error) {
      console.error("Erro ao buscar entidade:", error);
      setError("Erro ao carregar detalhes da entidade");
      return null;
    }
  }, [entityId]);

  if (error) return <NotFound></NotFound>;

  if (entity === undefined)
    return <Text textAlign="center">Carregando...</Text>;

  if (!entity) return;

  const { icon: RiskIcon, color } = RISK_META[entity.riskLevel];

  return (
    <CenterLayout m={0} p={0}>
      <Box
        mt={5}
        bg="system.light_dark"
        textAlign="left"
        borderRadius="10px 10px 0px 0px"
        overflow="hidden"
        width={{ base: "100%", sm: "95%" }}
      >
        <Box bg="system.primary" padding={5}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <HStack>
              <Text>
                {entity.type === "Person" ? (
                  <LuUser></LuUser>
                ) : (
                  <LuBuilding2></LuBuilding2>
                )}{" "}
              </Text>
              <Text fontSize="baseMdRestXl">
                {entity.type === "Person" ? "Pessoa Física" : "Empresa"}
              </Text>
            </HStack>
            <HStack bg="system.light_dark" padding={1} borderRadius={5}>
              <Icon
                size={"sm"}
                as={RiskIcon}
                color={color}
                stroke={color}
              ></Icon>
              <Text
                textAlign="right"
                fontSize="baseXsRestSm"
                color={color}
                whiteSpace="nowrap"
              >
                Risco {entity.riskLevel}
              </Text>
            </HStack>
          </Box>
          <Text fontSize="baseMdRestXl">{entity.name}</Text>
          <Text fontSize="baseSmRestMd">
            {entity.type === "Person" ? "CPF: " : "CNPJ: "}
            {entity.cpfCnpjFormatted}
          </Text>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              {entity.created && (
                <Text as="span" fontSize="baseXsRestSm">
                  {dateFormatter.format(new Date(entity.created))}
                </Text>
              )}
            </Box>
            <Box>
              <Link href={`/entities/${entity.id}/register-transactions`}>
              <Button bg="system.light" color="system.primary" _hover={{bg: "system.primary_light",}} size="sm">
                Nova Transação
              </Button>
              </Link>
            </Box>
          </Box>
        </Box>
        <Box
          maxW={{
            base: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "100%",
          }}
        >
          <TransactionSummary entityId={entityId}></TransactionSummary>
        </Box>
      </Box>
    </CenterLayout>
  );
}
