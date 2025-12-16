

import {z} from 'zod'

export type EntityType = 'Person' | 'Company'

// Não será mais utilizado! Usaremos Zod
// export interface Entities{
//     id?: number
//     name: string
//     type: EntityType
//     cpfCnpj: string
//     created: string
// }

export const EntitySchema = z.object({
    id: z.number().optional(),
    name: z.string().min(3, "O nome deve conter pelo menos 3 caracteres."),
    type: z.enum(['Person', 'Company']),
    cpfCnpj: z.string().regex(/^[0-9.-]{11,18}$/, "CPF/CNPJ inválido"),
    created: z.iso.datetime()
})

export type Entities = z.infer<typeof EntitySchema>

export function validateEntity(data: unknown): Entities {
    return EntitySchema.parse(data)
}