import { RiskLevel } from "@/data/models/entities";
import type { IconType } from "react-icons";

import { LuBadgeCheck, LuTriangle, LuCircle, LuBan, LuCircleCheck, LuClock, LuCircleAlert, LuCircleX } from "react-icons/lu";

import { TypeTransactionStatus } from "../../features/EntityDetails/services/getTransactionStatus";

export type RiskMetaProps = {
  icon: IconType;
  color: string;
};

export const RISK_META: Record<RiskLevel, RiskMetaProps> = {
  Desconhecido: { icon: LuCircle, color: "system.status.unknown" },
  Baixo: { icon: LuBadgeCheck, color: "system.status.low" },
  Médio: { icon: LuTriangle, color: "system.status.medium" },
  Alto: { icon: LuBan, color: "system.status.high" },
  "Muito Alto": { icon: LuBan, color: "system.status.veryHigh" },
};

export const STATUS_META: Record<TypeTransactionStatus, RiskMetaProps> = {
  "Pago em dia": {icon: LuCircleCheck, color: "system.status.low"},
  "Pendente": {icon: LuClock, color: "system.status.medium"},
  "Pago com atraso": { icon: LuCircleAlert, color: "system.status.high" },
  "Em dívida": { icon: LuCircleX, color: "system.status.veryHigh" },
};
