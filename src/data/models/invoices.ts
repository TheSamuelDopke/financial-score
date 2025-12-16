import {z} from 'zod'

import { valueSchema } from './transactions'

// Não mais utilizado, estamos usando Zod!
// export interface Invoices{
//     id?: number
//     idTransaction: number
//     payDate: string
//     value: number
// }

export const InvoicesSchema = z.object({
    id: z.number().optional(),
    idTransaction: z.number().min(1, "Deve haver vínculo com uma transação!"),
    payDate: z.iso.datetime(),
    value: valueSchema
})

export type Invoices = z.infer<typeof InvoicesSchema>

export function validateInvoice(data: unknown): Invoices{
    return InvoicesSchema.parse(data)
}