import { Box } from "@/components/application/reusable/Box/BoxNoWidth";
import { Text } from "@/components/application/reusable/Text/Text";

import {
  LuCircleAlert,
  LuCircleCheck,
  LuCircleX,
  LuClock,
} from "react-icons/lu";
import { getTransactionsSummary } from "../services/getTransactionsSummary";
import { EntityDetailsProps } from "../EntityDetails";
import { useLiveQuery } from "dexie-react-hooks";

export const TransactionSummary = ({ entityId }: EntityDetailsProps) => {
  const summary = useLiveQuery(
    () => getTransactionsSummary(Number(entityId)),
    [entityId],
    { paid: 0, pending: 0, paidLate: 0, debt: 0 }
  );

  return (
    <Box
      padding={4}
      maxW="100%"

      //   margin="auto"
    >
      <Text mt={2} fontSize="baseMdRestLg">
        Transações no último ano:
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
