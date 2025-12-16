import Dexie from 'dexie'


import { Entities } from '../models/entities'
import { Transactions } from '../models/transactions'
import { Invoices } from '../models/invoices'





class FinanceDB extends Dexie {
    entities!: Dexie.Table<Entities, number>
    transactions!: Dexie.Table<Transactions, number>
    invoices!: Dexie.Table<Invoices, number>

    constructor(name: string){
        super(name)
        this.version(1).stores({
            entities: '++id, cpfCnpj, [type+cpfCnpj]',
            transactions: '++id, idEntity, dueDate, paid',
            invoices: '++id, idTransaction, payDate'
        })
    }

}

export const db = new FinanceDB("FinanceDB")


db.version(1).stores({
    entities: '++id, cpfCnpj, [type+cpfCnpj]',
    transactions: '++id, idEntity, dueDate, paid',
    invoices: '++id, idTransaction, payDate'
}) 

db.open().then(() => console.log('Database Created'))