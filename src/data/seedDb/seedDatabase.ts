"use client"
import { db} from "@/data/db/db"
import entitiesFromJson from "./entitiesData.json"
import transactionsFromJson from "./transactionsData.json"
import { EntitySchema } from "../models/entities";
import { calculateRisk } from "../services/calculateRisk";
import { TransactionService } from "../services/transactionService";

export const seedDatabase = async () => {
  try{
  const transactionsCount = await db.transactions.count()
  // const count = await db.entities.count()
  if (transactionsCount > 10) return

  const validatedEntities = entitiesFromJson.map(item => EntitySchema.parse(item))

  await transactionsFromJson.map(item => TransactionService.create(item))

  await db.transaction('rw', db.transactions, db.entities, async () => {
    const ids = await db.entities.bulkAdd(validatedEntities, {allKeys: true})

    for(const id of ids){
      await calculateRisk(id as number)
    }



  })

  console.log("Populado com sucesso!")
}catch(error){
  console.error("Erro na população: ", error)
} 
};