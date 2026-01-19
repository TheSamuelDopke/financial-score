"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/data/db/db";
import { now } from "@/components/application/shared/Scripts/nowDate";


export const useLastYearTransactionsList = (entityId: number) => {
  const aYearAgo = new Date();
  aYearAgo.setFullYear(now.getFullYear() - 1);


  const transactions = useLiveQuery(async () => {
    return await db.transactions.where('[idEntity+created]').between([entityId, aYearAgo.toISOString()], [entityId, "9999-12-31"]).toArray();
  }, [entityId])

  return transactions;

  

};
