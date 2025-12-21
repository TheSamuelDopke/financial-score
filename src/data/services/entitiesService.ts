import { db } from "../db/db";
import { Entities, validateEntity } from "../models/entities";

function formatCpfCnpj(entity: Entities){
    if (entity.type === "Person"){
        return entity.cpfCnpj.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    )}

    return entity.cpfCnpj.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
    )
    
}

type EntityFormatted = Entities & {
    cpfCnpjFormatted: string
}

export const EntityService = {
    async create(rawData: unknown){
        const validatedData = validateEntity(rawData)

        const cpfCnpjExists = await db.entities.where({type: validatedData.type, cpfCnpj: validatedData.cpfCnpj}).first()

        if(cpfCnpjExists){
            const label = validatedData.type === "Person" ? "CPF" : "CNPJ"

            throw new Error(`Este ${label} já está cadastrado no sistema!`)
        }

 

        const entityToSave: EntityFormatted = {
            ...validatedData,
            cpfCnpjFormatted: formatCpfCnpj(validatedData),
            created: new Date().toISOString()
        }

        return await db.entities.add(entityToSave)
    }


}