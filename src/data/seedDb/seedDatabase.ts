import { db} from "@/data/db/db"
import dataFromJson from "./data.json"
import { EntitySchema } from "../models/entities";

export const seedDatabase = async () => {
  // 1. Pega todos os registros que já existem
  try{
  const count = await db.entities.count()
  if (count > 0) return

  const validatedItems = dataFromJson.map(item => EntitySchema.parse(item))

  await db.transaction('rw', db.entities, async () => {
    await db.entities.bulkAdd(validatedItems)
  })

  console.log("Populado com sucesso!")
}catch(error){
  console.error("Erro na população: ", error)
} 
};