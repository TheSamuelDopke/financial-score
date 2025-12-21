'use client'

import { Text } from "../../../reusable/Text/Text"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../../../../../data/db/db"

  
export  const CalcTransactionsYear = ({ entityId }: { entityId: number }) => {
    const transactions = useLiveQuery(async () => {
      const aYearAgo = new Date()
      aYearAgo.setFullYear(aYearAgo.getFullYear() - 1)

      return await db.transactions.where('idEntity').equals(entityId).filter(t => new Date(t.dueDate) >= aYearAgo).toArray()}, [entityId])
      
      

      if (!transactions) return null;

    return (
      <Text as="span" fontSize="xs" color="gray.500">
        {transactions.length} transações encontradas no último ano
      </Text>
    )

}