"use client";

import { useEffect, useState } from "react";
import { db } from "@/data/db/db";
import { Entities, EntitySchema } from "@/data/models/entities";
import { Text } from "../../reusable/Text/Text";
import { Box } from "../../reusable/Box/BoxNoWidth";
import { Box as BoxW } from "../../reusable/Box/BoxWhWidth";
import { CenterLayout } from "../../reusable/Box/CenterLayout";
import { NotFound } from "../../reusable/Not-Found/NotFound";
import { HStack, Icon } from "@chakra-ui/react";
import { RISK_META } from "../../reusable/RiskLevelCustom/RiskLevelCustom";
import { LuUser, LuBuilding2 } from "react-icons/lu";
import { dateFormatter } from "@/components/application/reusable/DateFormatter/DateFormatter";
import {
  LuCircleCheck, // Para "Pagas" (Círculo com check)
  LuClock, // Para "Pendentes" (Relógio)
  LuCircleX, // Para "Vencidas" (Círculo com X)
} from "react-icons/lu";

interface EntityDetailsProps {
  entityId: string;
}

export function EntityDetails({ entityId }: EntityDetailsProps) {
  const [entity, setEntity] = useState<Entities | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchEntity = async () => {
      try {
        const data = await db.entities.get(Number(entityId));
        if (!data) throw new Error("Entidade não encontrada");

        const validated = EntitySchema.parse(data);

        if (isMounted) setEntity(validated);
      } catch (error) {
        console.error("Erro ao buscar entidade:", error);
        if (isMounted) setEntity(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchEntity();

    return () => {
      isMounted = false; // evita atualizar state se o componente desmontar
    };
  }, [entityId]);

  if (loading) return <Text textAlign="center">Carregando...</Text>;
  if (!entity) return <NotFound></NotFound>;

  const { icon: RiskIcon, color } = RISK_META[entity.riskLevel];

  return (
    <CenterLayout m={0} p={0}>
      <Box
        mt={5}
        bg="system.light_dark"
        textAlign="left"
        borderRadius="10px 10px 0px 0px"
        overflow="hidden"
      >
        <Box bg="system.primary" minW="100%" padding={5}>
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
          <Text fontSize="baseMdRestXl">{entity.name}</Text>
          <Text fontSize="baseSmRestMd">
            {entity.type === "Person" ? "CPF: " : "CNPJ: "}
            {entity.cpfCnpjFormatted}
          </Text>
          <HStack>
            <Text fontSize="baseXsRestSm">Adicionado em:</Text>
            {entity.created && (
              <Text fontSize="baseXsRestSm">
                {dateFormatter.format(new Date(entity.created))}
              </Text>
            )}
          </HStack>
        </Box>

        <Box as={BoxW} padding={4}>
          {/* <Text fontSize="baseXsRestSm">Status</Text> */}
          <HStack justifyContent="center">
            <Icon size={"sm"} as={RiskIcon} color={color} stroke={color}></Icon>
            <Text
              textAlign="right"
              fontSize="baseSmRestMd"
              color={color}
              whiteSpace="nowrap"
            >
              Risco {entity.riskLevel}
            </Text>
          </HStack>
          <Text mt={5} fontSize="baseSmRestMd">
          Dados do último ano:
          </Text>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          justifyItems="center"
          alignItems="center"
          textAlign="center"
        >
          <Box py={5}>
            <LuCircleCheck size={20} />
          </Box>

          <Box py={5}>
            <LuClock size={20} />
          </Box>

          <Box py={5}>
            <LuCircleX size={20} />
          </Box>
        </Box>
      </Box>
    </CenterLayout>
  );
}
