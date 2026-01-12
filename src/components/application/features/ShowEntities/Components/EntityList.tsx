"use client";

import { Text } from "@/components/application/shared/Text/Text";
import { Box } from "@/components/application/shared/Box/BoxWhWidth";
import { Link } from "@/components/application/shared/Link/Link";
import { HStack, Icon } from "@chakra-ui/react";
import { CalcTransactionsYear } from "./CalcTransactionsYear";
import { Entities } from "@/data/models/entities";
import { RISK_META } from "@/components/application/shared/Metas/RiskLevelCustom";

interface EntityListProps {
  entities: Entities[];
  onLoadMore: () => void;
  isLoadingMore: boolean;
}

export const EntityList = ({
  entities,
  onLoadMore,
  isLoadingMore,
}: EntityListProps) => {
  if (entities.length === 0) {
    return (
      <Box mt={3}>
        <Text>Nenhum resultado encontrado.</Text>
      </Box>
    );
  }

  const MAX_VISIBLE = 30
  const visibleEntities = entities.length > MAX_VISIBLE ? entities.slice(entities.length - MAX_VISIBLE) : entities

  return (
    <Box
      mt={3}
      display="flex"
      flexDirection="column"
      gap="4"
      overflowY="auto"
      padding={1}
      position="relative"
      boxShadow="none"
      css={{
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#111111", 
          borderRadius: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#444444", 
          borderRadius: "6px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#666666", 
        },
      }}
      onScroll={(e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget;

        const reachedBottom =
          element.scrollTop + element.clientHeight >= element.scrollHeight - 20;
        if (
          reachedBottom && !isLoadingMore
        ) {
          onLoadMore();
        }
      }}
    >
      {visibleEntities.map((entity) => {
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
