"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/data/db/db";

export const useLastYearTransactionsList = (entityId: number) => {
  const now = new Date();
  const aYearAgo = new Date();
  aYearAgo.setFullYear(now.getFullYear() - 1);


  const transactions = useLiveQuery(async () => {
    return await db.transactions.where('[idEntity+created]').between([entityId, aYearAgo.toISOString()], [entityId, now.toISOString()]).toArray();
  })

  return transactions || []

};
