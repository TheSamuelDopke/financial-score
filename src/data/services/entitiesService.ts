import { db } from "../db/db";
import { Entities, validateEntity } from "../models/entities";
import {
  formatCPF,
  formatCNPJ,
} from "@/components/application/reusable/Scripts/getValidateCpfCnpj";

function formatCpfCnpj(entity: Entities) {
  if (entity.type === "Person") {
    return formatCPF(entity.cpfCnpj);
  }
  return formatCNPJ(entity.cpfCnpj);
}

type EntityFormatted = Entities & {
  cpfCnpjFormatted: string;
};

export const EntityService = {
  async create(rawData: unknown) {
    const validatedData = validateEntity(rawData);

    const cpfCnpjExists = await db.entities
      .where({ type: validatedData.type, cpfCnpj: validatedData.cpfCnpj })
      .first();

    if (cpfCnpjExists) {
      const label = validatedData.type === "Person" ? "CPF" : "CNPJ";

      throw new Error(`Este ${label} já está cadastrado no sistema!`);
    }

    const entityToSave: EntityFormatted = {
      ...validatedData,
      cpfCnpjFormatted: formatCpfCnpj(validatedData),
      created: new Date().toISOString(),
    };

    return await db.entities.add(entityToSave);
  },
};
