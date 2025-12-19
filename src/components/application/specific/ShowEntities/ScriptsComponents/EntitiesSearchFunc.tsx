import {useLiveQuery} from "dexie-react-hooks"
import {db} from "../../../../../data/db/db"
import { Entities } from "@/data/models/entities"
import { TypeSearch } from "../ShowEntities"

export const useEntitiesSearchFunc = (searchValues: Partial<TypeSearch>) => {
    return useLiveQuery(async (): Promise<Entities[]> => {
         //Padronizamos a consulta para resolver a reclamação do TS com relação a tipos indefinidos e valores nulos, fazendo com que query e type sempre existam, e que o sistema não trave caso o usuário consiga mandar letras nas queries de cpf/cnpj
         const {type = "name", query = ""} = searchValues

         if(!query.trim()) {
            return (await db.entities.toArray()) as Entities[]
         }

         const cleanQuery = query.replace(/\D/g, "")

         if (type === "name"){
            return (await db.entities.where("name").startsWithIgnoreCase(query).toArray()) as Entities[]
         }

         if (type === "cpf" || type === "cnpj"){
            const entityType = type === "cpf" ? "Person" : "Company"

            return (await db.entities.where("type").equals(entityType).filter((item) => item.cpfCnpj.startsWith(cleanQuery)).toArray()) as Entities[]
         }

         return []

    }, [searchValues.query, searchValues.type])
}
