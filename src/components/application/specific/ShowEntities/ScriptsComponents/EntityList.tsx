"use client";

import { LuPlus } from "react-icons/lu";
import { Text } from "@/components/application/reusable/Text/Text";
import { Box } from "@/components/application/reusable/Box/Box";
import { Link } from "@/components/application/reusable/Link/Link";
import { HStack, Icon } from "@chakra-ui/react";
import { CalcTransactionsYear } from "./CalcTransactionsYear";
import { Button } from "@/components/application/reusable/Button/Button";
import { Entities, RiskLevel } from "@/data/models/entities";
import type { IconType } from "react-icons";

import { LuBadgeCheck, LuTriangle, LuCircle, LuBan } from "react-icons/lu";

interface EntityListProps {
  entities: Entities[];
  onLoadMore: () => void;
}

export const EntityList = ({ entities, onLoadMore }: EntityListProps) => {
  const RISK_META: Record<RiskLevel, { icon: IconType; color: string }> = {
    Desconhecido: { icon: LuCircle, color: "system.status.unknown" },
    Baixo: { icon: LuBadgeCheck, color: "system.status.low" },
    Médio: { icon: LuTriangle, color: "system.status.medium" },
    Alto: { icon: LuBan, color: "system.status.high" },
    "Muito Alto": { icon: LuBan, color: "system.status.veryHigh" },
  };

  if (entities.length === 0) {
    return (
      <Box
        m={0}
        mt={5}
        p={0}
        display="flex"
        flexDirection="column"
        position="sticky"
        bottom="10"
        zIndex="1"
        justifyContent="center"
        borderRadius="xs"
      >
        <Text>Nenhum resultado encontrado.</Text>
        <Box mt={5}>
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
              <Icon size={{ base: "sm", sm: "md" }}>
                <LuPlus></LuPlus>
              </Icon>
              <Text fontSize="baseSmRestMd">Cadastrar Novo</Text>
            </Button>
          </Link>
        </Box>
      </Box>
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
      onScroll={(e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget;

        if (
          element.scrollTop + element.clientHeight >=
          element.scrollHeight - 20
        ) {
          onLoadMore();
        }
      }}
    >
      {entities.map((entity) => {
        const { icon: RiskIcon, color } = RISK_META[entity.riskLevel];
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
              <Text
                textAlign="left"
                color="system.primary"
                fontSize="baseMdRestXl"
              >
                {entity.name}
              </Text>
              <HStack>
                <Icon
                  size={"xs"}
                  as={RiskIcon}
                  color={color}
                  stroke={color}
                ></Icon>
                <Text textAlign="right" fontSize="baseXsRestSm" color={color}>
                  Risco {entity.riskLevel}
                </Text>
              </HStack>
            </HStack>
            <Text textAlign="left" fontSize="baseXsRestSm">
              {entity.cpfCnpjFormatted}
            </Text>
            <Text textAlign="left">
              {entity.id && <CalcTransactionsYear entityId={entity.id} />}
            </Text>
          </Box>
        );
      })}

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
          >
            <Icon size={{ base: "sm", sm: "md" }}>
              <LuPlus></LuPlus>
            </Icon>
            <Text fontSize="baseSmRestMd">Cadastrar</Text>
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
