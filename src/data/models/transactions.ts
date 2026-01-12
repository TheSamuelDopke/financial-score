import { z } from "zod";

// export const StatusEnum = z.enum([
//   "Pendente",
//   "Em dívida",
//   "Pago",
//   "Pago atrasado",
// ]);

// export const valueSchema = z.number().positive();

export const CreateTransactionsSchema = z
  .object({
    id: z.number().optional(),
    idEntity: z.number().min(1, "Deve estar vínculado a uma entidade!"),
    description: z
      .string()
      .min(5, "Deve conter no mínimo 5 caracteres de descrição!"),
    value: z
      .number()
      .positive("Valor deve ser maior que zero")
      .optional()
      .refine((v) => v !== undefined, {
        message: "Valor obrigatório!",
      }),
    dueDate: z.string().min(1, "Obrigatório informar data de vencimento!"),

    // status: StatusEnum,
    payDate: z.string().optional(),
    created: z.iso.datetime().optional(),
  })
  .superRefine((data, ctx) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const isPaid = data.status === "Pago" || data.status === "Pago atrasado";

    if (isPaid) {
      if (!data.payDate) {
        ctx.addIssue({
          path: ["payDate"],
          message: "Informe a data de pagamento!",
          code: "custom",
        });
        return;
      }

      const payDate = new Date(data.payDate);

      if (payDate > today) {
        ctx.addIssue({
          path: ["payDate"],
          message: "Data de pagamento não pode ser futura!",
          code: "custom",
        });
        return;
      }
    } else if (data.payDate) {
      ctx.addIssue({
        path: ["payDate"],
        message: "Data de pagamento só pode existir quando o status for pago.",
        code: "custom",
      });
    }
  });

export type Transactions = z.infer<typeof CreateTransactionsSchema>;

export function validateCreateTransactions(data: unknown): Transactions {
  return CreateTransactionsSchema.parse(data);
}
