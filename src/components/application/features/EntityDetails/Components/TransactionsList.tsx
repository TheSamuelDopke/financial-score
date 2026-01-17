"use client";

import { Box } from "@/components/application/shared/Box/BoxNoWidth";
import { useLastYearTransactionsList } from "../hooks/useLastYearTransactionsList";
import { Text } from "@/components/application/shared/Text/Text";
import { NumericFormat } from "react-number-format";
import { dateFormatter, formatDateBR } from "@/components/application/shared/Scripts/formatters";
import { getTransactionStatus } from "../services/getTransactionStatus";
import { STATUS_META } from "@/components/application/shared/Metas/RiskLevelCustom";
import { HStack } from "@chakra-ui/react";

export const TransactionsList = ({ entityId }: { entityId: number }) => {
  const transactions = useLastYearTransactionsList(entityId);

  if (!transactions || transactions.length === 0)
    return <Text textAlign="center">Nenhuma transação encontrada!</Text>


  return (
    <Box m="0px 30px" borderRadius="md">
      {transactions.map((transaction) => {
        const status = getTransactionStatus(
          transaction.dueDate,
          transaction.payDate
        )

        const meta = STATUS_META[status]
        const Icon = meta.icon

        return (
          <Box
            key={transaction.id}
            p="20px 50px"
            m="0px 0px 30px 0px"
            bg="system.dark"
            borderRadius="md"
            display="flex"
            gap="3"
            boxShadow="md"
            flexDirection="column"
          >
            <Box display='flex' justifyContent='space-between'>
                <Text color={meta.color}>{transaction.description}</Text>            
                <HStack color={meta.color}><Icon size={18}></Icon>{status}</HStack>
            </Box>

            <Text fontSize="baseXsRestSm">
              <NumericFormat
                value={transaction.value}
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale
              ></NumericFormat>
            </Text>


            <Text as="span" fontSize="baseXsRestSm">
              Vencimento: {formatDateBR(transaction.dueDate)}
            </Text>

            {transaction.payDate && (
              <Text fontSize="baseXsRestSm">Data do pagamento: {formatDateBR(transaction.payDate)}</Text>
            )}

            {transaction.created && (
              <Text as="span" fontSize="baseXsRestSm">
                Criado em: {dateFormatter.format(new Date(transaction.created))}
              </Text>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
