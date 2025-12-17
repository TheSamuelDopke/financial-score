import { db } from "../db/db";
import { Entities, validateEntity } from "../models/entities";

export const EntityService = {
    async create(rawData: unknown){
        const validatedData = validateEntity(rawData)

        const cpfCnpjExists = await db.entities.where({type: validatedData.type, cpfCnpj: validatedData.cpfCnpj}).first()

        if(cpfCnpjExists){
            const label = validatedData.type === "Person" ? "CPF" : "CNPJ"

            throw new Error(`Este ${label} já está cadastrado no sistema!`)
        }

        const entityToSave: Entities = {
            ...validatedData,
            created: new Date().toISOString()
        }

        return await db.entities.add(entityToSave)

    }


}