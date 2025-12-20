import { db} from "@/data/db/db"
import { EntityService } from "../services/entitiesService";
import dataFromJson from "./data.json"

export const seedDatabase = async () => {
  // 1. Pega todos os registros que já existem
  const existingRecords = await db.entities.toArray();
  const existingKeys = new Set(existingRecords.map(e => e.cpfCnpj));

  // 2. Filtramos o JSON para processar apenas o que NÃO existe
  const newItems = dataFromJson.filter(item => {
    const cleanCpfCnpj = item.cpfCnpj.replace(/\D/g, "");
    return !existingKeys.has(cleanCpfCnpj);
  });

  if (newItems.length === 0) return;

  console.log(`Semeando ${newItems.length} novas entidades...`);


  // Promise.allSettled para permitir que mesmo que um registro falhe, os outros continuem
  await Promise.allSettled(newItems.map(item => EntityService.create(item)));
};