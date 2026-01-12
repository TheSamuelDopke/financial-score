'use client'
import { Transactions } from '@/data/models/transactions';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/data/db/db';

export const useTransactionsSummary = (entityId: number) => {

  const now = new Date()
  const aYearAgo = new Date()
  aYearAgo.setFullYear(now.getFullYear() - 1)

  const transactions = useLiveQuery(async () => {
    return await db.transactions.where('[idEntity+created]').between([entityId, aYearAgo.toISOString()], [entityId, now.toISOString()]).toArray();
  }, [entityId])

  return transactions?.reduce(
    (acc, t: Transactions) => {
      switch (t.status) {
        case "Pago": acc.paid += 1; break;
        case "Pendente": acc.pending += 1; break;
        case "Pago atrasado": acc.paidLate += 1; break;
        case "Em dívida": acc.debt += 1; break;
      }
      return acc;
    },
    { paid: 0, pending: 0, paidLate: 0, debt: 0 }
  )
};
