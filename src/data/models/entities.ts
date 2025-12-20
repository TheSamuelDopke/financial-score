import {z} from 'zod'


export const BaseEntity = z.object({
    id: z.number().optional(),
    name: z.string().min(3, "O nome deve conter pelo menos 3 caracteres."),
    type: z.enum(['Person', 'Company']),
    riskLevel: z.enum(['Desconhecido', 'Baixo', 'Médio', 'Alto', 'Muito Alto']),
    created: z.string().optional()
})

const PersonSchema = BaseEntity.extend({
    type: z.literal('Person'),
    cpfCnpj: z.string().transform(val => val.replace(/\D/g, "")).refine(val => val.length === 11 && !/^(.)\1{10}$/.test(val), {message: "CPF Inválido!"})
})

const CompanySchema = BaseEntity.extend({
    type: z.literal('Company'),
    cpfCnpj: z.string().transform(val => val.replace(/\D/g, "")).refine(val => val.length === 14 && !/^(.)\1{10}$/.test(val), {message: "CNPJ Inválido!"})
})

export const EntitySchema = z.discriminatedUnion("type", [PersonSchema, CompanySchema])

export type Entities = z.infer<typeof EntitySchema>

export function validateEntity(data: unknown): Entities {
    return EntitySchema.parse(data)
}