"use client";

import { Box } from "@/components/application/shared/Box/BoxNoWidth";
import { useLastYearTransactionsList } from "../hooks/useLastYearTransactionsList";
import { Text } from "@/components/application/shared/Text/Text";
import { NumericFormat } from "react-number-format";
import { dateFormatter } from "@/components/application/shared/Scripts/formatters";

export const TransactionsList = ({ entityId }: { entityId: number }) => {
  const transactions = useLastYearTransactionsList(entityId);

  if (!transactions || transactions.length === 0)
    return <Text textAlign="center">Nenhuma transação encontrada!</Text>;

  return (
    <Box m="0px 30px" borderRadius="md">
      {transactions.map((transaction) => {
        return (
          <Box
            key={transaction.id}
            p={4}
            m="0px 0px 20px 0px"
            bg="system.dark"
            borderRadius="md"
            display="flex"
            gap="3"
            flexDirection="column"
          >
            <Text>{transaction.description}</Text>
            <Text>
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

            <Text>{transaction.status}</Text>
            {transaction.dueDate && (
              <Text as="span" fontSize="baseXsRestSm">
                Vencimento: {dateFormatter.format(new Date(transaction.dueDate))}
              </Text>
            )}
            {transaction.created && (
              <Text as="span" fontSize="baseXsRestSm">
              Criado em: {dateFormatter.format(new Date(transaction.created))}
              </Text>
            )}
            {/* <Text>{dateFormatter.format(new Date(transaction.created))}</Text> */}
          </Box>
        );
      })}
    </Box>
  );
};
