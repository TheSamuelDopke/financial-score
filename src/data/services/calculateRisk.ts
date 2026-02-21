"use client"
import { RiskLevel } from "../models/entities";
import { calculateTransactionSummary } from "@/components/application/features/EntityDetails/services/calculateTransactionSummary";
import { db } from "../db/db";



export async function calculateRisk(IdEntity: number){
    

    const transactions = await db.transactions.where("idEntity").equals(IdEntity).toArray()

    const summary = calculateTransactionSummary(transactions, new Date())

    if(!summary) return await db.entities.update(IdEntity, {riskLevel: "Desconhecido"})

    let riskLevel: RiskLevel = "Baixo"
    if(summary.total < 1){
        riskLevel = "Desconhecido"
    }else if(summary.debt > 0){
        riskLevel = "Muito Alto"
    }else{
        const porcentagePaidLate = (summary.paidLate / summary.total) * 100

        if(porcentagePaidLate > 50) riskLevel = "Muito Alto"
        else if (porcentagePaidLate > 30) riskLevel = "Alto"
        else if (porcentagePaidLate > 10) riskLevel = "Médio"

    }

    return await db.entities.update(IdEntity, {riskLevel})

}