
import { formatDateBR } from "@/components/application/shared/Scripts/formatters";
import { now } from "@/components/application/shared/Scripts/nowDate";

export type TypeTransactionStatus = "Pago em dia" | "Pendente" | "Pago com atraso" | "Em dívida"

export const getTransactionStatus = (
  dueDate: string,
  payDate?: string | null
): TypeTransactionStatus => {

  const due = formatDateBR(dueDate)
  const paid = payDate ? formatDateBR(payDate) : null;
  const nowNormalized = formatDateBR(now.toISOString())

  if (paid) {
    return paid > due ? "Pago com atraso" : "Pago em dia";
  }

  return nowNormalized > due ? "Em dívida" : "Pendente";
};