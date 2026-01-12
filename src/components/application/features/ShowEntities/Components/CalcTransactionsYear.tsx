"use client";

import { Text } from "../../../shared/Text/Text";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../../../data/db/db";

export const CalcTransactionsYear = ({ entityId }: { entityId: number }) => {

  const transactions = useLiveQuery(async () => {

    const now = new Date();
    const aYearAgo = new Date();
    aYearAgo.setFullYear(aYearAgo.getFullYear() - 1);

    return await db.transactions
      .where("idEntity")
      .between(
        [entityId, aYearAgo.toISOString()],
        [entityId, now.toISOString()],
        true,
        true
      )
      .toArray();
  }, [entityId]);

  if (!transactions) return null;

  return (
    <Text as="span" fontSize="xs" color="gray.500">
      {transactions.length} transações encontradas no último ano
    </Text>
  );
};
