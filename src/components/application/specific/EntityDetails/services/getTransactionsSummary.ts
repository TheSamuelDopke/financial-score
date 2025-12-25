// services/transactions.ts
import { db } from "../../../../../data/db/db";
import { TransactionsSchema } from "../../../../../data/models/transactions";

export interface TransactionSummary {
  paid: number;
  pending: number;
  paidLate: number;
  debt: number;
}

export async function getTransactionsSummary(entityId: number): Promise<TransactionSummary> {
  const now = new Date();
  const aYearAgo = new Date();
  aYearAgo.setFullYear(aYearAgo.getFullYear() - 1);

  const transactions = await db.transactions
    .where("[idEntity+created]")
    .between([entityId, aYearAgo.toISOString()], [entityId, now.toISOString()])
    .toArray();

  return transactions.reduce<TransactionSummary>((acc, raw) => {
    const t = TransactionsSchema.parse(raw);

    switch (t.status) {
      case "Pago":
        acc.paid += 1;
        break;
      case "Pendente": 
        acc.pending += 1;
        break;
      case "Pago atrasado":
        acc.paidLate += 1;
        break;
      case "Em dívida":
        acc.debt += 1;
        break;
    }

    return acc;
  }, { paid: 0, pending: 0, paidLate: 0, debt: 0 });
}
