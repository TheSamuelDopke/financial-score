"use client";

import { LuPlus } from "react-icons/lu";
import { Text } from "@/components/application/reusable/Text/Text";
import { Box } from "@/components/application/reusable/Box/BoxWhWidth";
import { Link } from "@/components/application/reusable/Link/Link";
import { HStack, Icon } from "@chakra-ui/react";
import { CalcTransactionsYear } from "./CalcTransactionsYear";
import { Button } from "@/components/application/reusable/Button/Button";
import { Entities } from "@/data/models/entities";
import { RISK_META } from "@/components/application/reusable/Metas/RiskLevelCustom";

interface EntityListProps {
  entities: Entities[];
  onLoadMore: () => void;
}

export const EntityList = ({ entities, onLoadMore }: EntityListProps) => {
  if (entities.length === 0) {
    return (
      <Box mt={3}>
        <Text>Nenhum resultado encontrado.</Text>
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
      css={{
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#111111", // fundo da track combinando com o background
          borderRadius: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#444444", // tom suave sobre o div bg
          borderRadius: "6px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#666666", // hover levemente mais claro
        },
      }}
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
            as={Link}
            display="block"
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
            href={`/entities/${entity.id}`}
          >
            <HStack display="flex" justifyContent="space-between">
              <Text
                textAlign="left"
                color="system.primary"
                fontSize="baseMdRestXl"
                noOflines={1}
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
                <Text
                  textAlign="right"
                  fontSize="baseXsRestSm"
                  color={color}
                  whiteSpace="nowrap"
                >
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
    </Box>
  );
};
