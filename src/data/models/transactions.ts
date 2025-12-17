import {z} from 'zod'

//Não mais utilizado! Estamos usando Zod
// export interface Transactions{
//     id?: number
//     idEntity: number
//     description: string
//     value: number
//     dueDate: string
//     paid: boolean
//     payDate?: string | null
// }

export const valueSchema = z.number().int().positive()

export const TransactionsSchema = z.object({
    id: z.number().optional(),
    idEntity: z.number().min(1, "Deve estar vínculado a uma entidade!"),
    description: z.string().min(5),
    value: valueSchema,
    dueDate: z.iso.datetime(),
    status: z.enum(['Pending', 'Overdue', 'Paid', 'Late Paid']),
    payDate: z.union([z.iso.datetime(), z.null()]).optional()
})

export type Transactions = z.infer<typeof TransactionsSchema>

export function validateTransaction(data: unknown): Transactions{
    return TransactionsSchema.parse(data)
}