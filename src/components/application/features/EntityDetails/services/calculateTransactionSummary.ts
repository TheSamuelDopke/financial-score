import { dateToNumber } from "@/components/application/shared/Scripts/formatters"
import { Transactions } from "@/data/models/transactions"

export type TransactionSummary = {
    paid:number
    paidLate: number
    pending: number
    debt: number
    total: number
}

export function calculateTransactionSummary(transactions: Transactions[], now: Date): TransactionSummary{
    const fiveYearsAgo = new Date()
    fiveYearsAgo.setFullYear(now.getFullYear() - 5)

    return transactions.reduce((acc, t) => {
        const dueDate = new Date(t.dueDate)
        const payDateNormalized = t.payDate ? dateToNumber(new Date(t.payDate)) : null
        const nowNormalized = dateToNumber(now)
        const dueDateNormalized = dateToNumber(dueDate)

        if(payDateNormalized){
            if(payDateNormalized > dueDateNormalized){
                acc.paidLate++
                acc.total++
            } 
            else{
                acc.paid++
                acc.total++
            } 

        }else{
            if(dueDateNormalized < nowNormalized){
                if(dueDate > fiveYearsAgo){
                    acc.debt++
                    acc.total++
                } 
            }else{
                acc.pending++
                acc.total++
            }
        }

        return acc
    }, {paid: 0, paidLate: 0, pending: 0, debt: 0, total: 0})
}