import { db } from "../db/db";
import {
  Transactions,
  validateCreateTransactions,
} from "../models/transactions";

export const TransactionService = {
  async create(rawData: unknown) {
    const validatedData = validateCreateTransactions(rawData);

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const dueDate = new Date(validatedData.dueDate);

    let status: Transactions["status"];

    if (validatedData.payDate) {
      const payDate = new Date(validatedData.payDate);
      status = payDate > dueDate ? "Pago atrasado" : "Pago"
    } else {
      status = today > dueDate ? "Em dívida" : "Pendente";
    }

    const transactionToSave: Transactions = {
      ...validatedData,
      status,
      created: new Date().toISOString(),
    };

    return await db.transactions.add(transactionToSave);
  },
};
