'use client'

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../../../data/db/db";
import { Entities } from "@/data/models/entities";
import { TypeSearch } from "../ShowEntities";

export const useEntities = (
  searchValues: Partial<TypeSearch>,
  page: number
) => {
  const PAGE_SIZE = 10;
  const MAX_ENTITIES = 30;

  return useLiveQuery(async (): Promise<Entities[]> => {
    //Padronizamos a consulta para resolver a reclamação do TS com relação a tipos indefinidos e valores nulos, fazendo com que query e type sempre existam, e que o sistema não trave caso o usuário consiga mandar letras nas queries de cpf/cnpj
    const { type = "name", query = "" } = searchValues;

    let result: Entities[] = [];

    if (!query.trim()) {
      result = (await db.entities
        .limit(PAGE_SIZE * page)
        .toArray()) as Entities[];
    } else if (type === "name") {
      result = (await db.entities
        .where("name")
        .startsWithIgnoreCase(query)
        .limit(PAGE_SIZE * page)
        .toArray()) as Entities[];
    } else {
      const cleanQuery = query.replace(/\D/g, "");

      const entityType = type === "cpf" ? "Person" : "Company";

      result = (await db.entities
        .where("[type+cpfCnpj]")
        .between([entityType, cleanQuery], [entityType, cleanQuery + "\uffff"])
        .limit(PAGE_SIZE * page)
        .toArray()) as Entities[];
    }

    if (result.length > MAX_ENTITIES){
      return result.slice(result.length - MAX_ENTITIES)
    }

    return result
  }, [searchValues.query, searchValues.type, page]);
};
