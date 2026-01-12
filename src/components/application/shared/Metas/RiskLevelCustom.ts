  import { RiskLevel } from "@/data/models/entities";
  import type { IconType } from "react-icons";
  
  import { LuBadgeCheck, LuTriangle, LuCircle, LuBan } from "react-icons/lu";

  export type RiskMetaProps = {
    icon: IconType
    color: string
  }
  
  export const RISK_META: Record<RiskLevel, RiskMetaProps> = {
    Desconhecido: { icon: LuCircle, color: "system.status.unknown" },
    Baixo: { icon: LuBadgeCheck, color: "system.status.low" },
    Médio: { icon: LuTriangle, color: "system.status.medium" },
    Alto: { icon: LuBan, color: "system.status.high" },
    "Muito Alto": { icon: LuBan, color: "system.status.veryHigh" },
  };