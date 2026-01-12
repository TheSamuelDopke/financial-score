"use client";
import { Transactions } from "@/data/models/transactions";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/data/db/db";

export const useTransactionsSummary = (entityId: number) => {
  const now = new Date();

  const aYearAgo = new Date();
  aYearAgo.setFullYear(now.getFullYear() - 1);

  const normalizeDate = (date: Date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d
  }

  const nowNormalized = normalizeDate(now)

  const transactions = useLiveQuery(async () => {
    return await db.transactions
      .where("[idEntity+created]")
      .between(
        [entityId, aYearAgo.toISOString()],
        [entityId, now.toISOString()]
      )
      .toArray();
  }, [entityId]);

  return transactions?.reduce(
    (acc, t: Transactions) => {
      //Data de vencimento
      const dueDate = normalizeDate(new Date(t.dueDate))

      //Data de pagamento
      const payDate = t.payDate ? normalizeDate(new Date(t.payDate)) : null

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
    { paid: 0, pending: 0, paidLate: 0, debt: 0 }
  );
};
