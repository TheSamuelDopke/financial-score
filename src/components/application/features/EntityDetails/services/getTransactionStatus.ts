
import { dateToNumber } from "@/components/application/shared/Scripts/formatters";
import { now } from "@/components/application/shared/Scripts/nowDate";

export type TypeTransactionStatus = "Pago em dia" | "Pendente" | "Pago com atraso" | "Em dívida"

export const getTransactionStatus = (
  dueDate: string,
  payDate?: string | null
): TypeTransactionStatus => {

  const due = dateToNumber(new Date(dueDate))
  const paid = payDate ? dateToNumber(new Date(payDate)) : null;
  const nowNormalized = dateToNumber(now)


  if (paid) {
    return paid > due ? "Pago com atraso" : "Pago em dia";
  }

  return nowNormalized > due ? "Em dívida" : "Pendente";
};