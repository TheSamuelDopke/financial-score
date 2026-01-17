
import { db } from "../db/db";
import {
  Transactions,
  validateCreateTransactions,
} from "../models/transactions";

export const TransactionService = {
  async create(rawData: unknown) {
    const validatedData = validateCreateTransactions(rawData);

    const dueDateISO = new Date(validatedData.dueDate).toISOString()

    const payDateISO = validatedData.payDate ? new Date(validatedData.payDate).toISOString() : undefined


    const transactionToSave: Transactions = {
      ...validatedData,
      created: new Date().toISOString(),
      payDate: payDateISO,
      dueDate: dueDateISO
    };

    return await db.transactions.add(transactionToSave);
  },
};
