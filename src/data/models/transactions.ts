import { z } from "zod";

export const StatusEnum = z.enum([
  "Pendente",
  "Em dívida",
  "Pago",
  "Pago atrasado",
]);

export const valueSchema = z.number().int().positive();

export const TransactionsSchema = z.object({
  id: z.number().optional(),
  idEntity: z.number().min(1, "Deve estar vínculado a uma entidade!"),
  description: z.string().min(5),
  value: valueSchema,
  dueDate: z.iso.datetime(),
  status: StatusEnum,
  payDate: z.union([z.iso.datetime(), z.null()]).optional(),
  created: z.string().optional(),
});

export type Transactions = z.infer<typeof TransactionsSchema>;

export function validateTransaction(data: unknown): Transactions {
  return TransactionsSchema.parse(data);
}
