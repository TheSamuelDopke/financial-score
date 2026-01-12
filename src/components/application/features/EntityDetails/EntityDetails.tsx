"use client";

import { db } from "@/data/db/db";
import { EntitySchema } from "@/data/models/entities";
import { Text } from "../../shared/Text/Text";
import { Box } from "../../shared/Box/BoxNoWidth";
import { useState } from "react";
import { CenterLayout } from "../../shared/Box/CenterLayout";
import { NotFound } from "../../shared/Not-Found/NotFound";
import { HStack, Icon } from "@chakra-ui/react";
import { RISK_META } from "../../shared/Metas/RiskLevelCustom";
import { LuUser, LuBuilding2 } from "react-icons/lu";
import { dateFormatter } from "@/components/application/shared/Scripts/formatters";
import { useLiveQuery } from "dexie-react-hooks";
import { TransactionSummary } from "./Components/TransactionsSummary";
import { TransactionsList } from "./Components/TransactionsList";
import { TransactionsRegister } from "./Components/TransactionsRegister";

export interface EntityDetailsProps {
  entityId: number;
}

export function EntityDetails({ entityId }: EntityDetailsProps) {

  const normalizedEntityId = Number(entityId)
  
  const [error, setError] = useState<string | null>(null);
  const entity = useLiveQuery(async () => {
    try {
      const data = await db.entities.get(normalizedEntityId);
      if (!data) throw new Error("Entidade não encontrada!");
      return EntitySchema.parse(data);
    } catch (error) {
      console.error("Erro ao buscar entidade:", error);
      setError("Erro ao carregar detalhes da entidade");
      return null;
    }
  }, [normalizedEntityId]);

  if (error) return <NotFound></NotFound>;

  if (entity === undefined)
    return <Text textAlign="center">Carregando...</Text>;

  if (!entity) return;

  if(Number.isNaN(normalizedEntityId)){
    return <NotFound />
  }
  // const toggleRegisterForm = () => {
  //   setShowRegister((prev) => !prev);
  // };

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
            <HStack bg="system.dark" padding={1} borderRadius={5}>
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              {entity.created && (
                <Text as="span" fontSize="baseXsRestSm">
                  {dateFormatter.format(new Date(entity.created))}
                </Text>
              )}
            </Box>
            <Box>
              <TransactionsRegister entityId={normalizedEntityId}></TransactionsRegister>
            </Box>
          </Box>
        </Box>

        <TransactionSummary entityId={normalizedEntityId}></TransactionSummary>

        <TransactionsList entityId={normalizedEntityId}></TransactionsList>
      </Box>
    </CenterLayout>
  );
}
