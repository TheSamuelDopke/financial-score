"use client";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/data/db/db";
import { calculateTransactionSummary } from "../services/calculateTransactionSummary";


export const useTransactionsSummary = (entityId: number) => {
 
  const now = new Date()
  

  const aYearAgo = new Date();
  aYearAgo.setFullYear(now.getFullYear() - 1)


  const transactions = useLiveQuery(async () => {
    return await db.transactions
      .where("[idEntity+created]")
      .between(
        [entityId, aYearAgo.toISOString()],
        [entityId, "9999-12-31"],
      )
      .toArray();
  }, [entityId]);

  if(!transactions) return undefined

  return calculateTransactionSummary(transactions, new Date())

};
