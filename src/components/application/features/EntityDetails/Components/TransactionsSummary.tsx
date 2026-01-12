'use client'

import { Box } from "@/components/application/shared/Box/BoxNoWidth";
import { Text } from "@/components/application/shared/Text/Text";

import {
  LuCircleAlert,
  LuCircleCheck,
  LuCircleX,
  LuClock,
} from "react-icons/lu";
import { useTransactionsSummary } from "../hooks/useTransactionsSummary";

interface TransactionsSummaryProps {
  entityId: number
}

export const TransactionSummary = ({entityId}: TransactionsSummaryProps) => {

    const summary = useTransactionsSummary(entityId)

    if(!summary) return <Text>Carregando...</Text>

  return (
    <Box
      padding={4}
      maxW="100%"
    >
      <Text mt={2} fontSize="baseMdRestLg">
        Resumo das transações no último ano:
      </Text>

      <Box
        display="grid"
        gridTemplateColumns={{
          base: "repeat(2, 2fr)",
          sm: "repeat(4, 1fr)",
        }}
        justifyItems="center"
        alignItems="center"
        textAlign="center"
        maxW="100%"
      >
        <Box
          py={5}
            display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          noOflines={1}
          color="system.status.low"
        >
          <LuCircleCheck size={20} />
          <Text fontSize="baseSmRestMd">
            Pagas <br />
            {summary?.paid ?? 0}
          </Text>
        </Box>

        <Box
          py={5}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          noOflines={1}
          color="system.status.medium"
        >
          <LuClock size={20} />
          <Text fontSize="baseSmRestMd">
            Pendentes
            <br />
            {summary?.pending ?? 0}
          </Text>
        </Box>

        <Box
          py={5}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          noOflines={1}
          color="system.status.high"
        >
          <LuCircleAlert size={20} />
          <Box>
            <Text fontSize="baseSmRestMd">
              Pago com Atraso <br />
              {summary?.paidLate ?? 0}
            </Text>
          </Box>
        </Box>

        <Box
          py={5}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          noOflines={1}
          color="system.status.high"
        >
          <LuCircleX size={20} />
          <Text fontSize="baseSmRestMd">
            Em dívida <br />
            {summary?.debt ?? 0}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
