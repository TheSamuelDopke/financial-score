"use client";
import { Transactions } from "@/data/models/transactions";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/data/db/db";
import { now } from "../../../shared/Scripts/nowDate";
import { formatDateBR } from "@/components/application/shared/Scripts/formatters";


export const useTransactionsSummary = (entityId: number) => {
  const now = new Date()
  const aYearAgo = new Date();
  aYearAgo.setFullYear(now.getFullYear() - 1);

  const transactions = useLiveQuery(async () => {
    return await db.transactions
      .where("[idEntity+created]")
      .between(
        [entityId, aYearAgo.toISOString()],
        [entityId, now.toISOString()],
      )
      .toArray();
  }, [entityId]);

  return transactions?.reduce(
    (acc, t: Transactions) => {
      //Data de vencimento
      const dueDate = formatDateBR(t.dueDate);

      const nowNormalized = formatDateBR(now.toISOString())

      //Data de pagamento
      const payDate = t.payDate ? formatDateBR(t.payDate) : null;

      if (t.status && payDate) {
        if (payDate > dueDate) {
          acc.paidLate += 1;
        } else {
          acc.paid += 1;
        }
      } else {
        if (dueDate < nowNormalized) {
          acc.debt += 1;
        } else {
          acc.pending += 1;
        }
      }

      return acc;
    },
    { paid: 0, pending: 0, paidLate: 0, debt: 0 },
  );
};
