"use client";
import { Box } from "../../reusable/Box/Box";
import { Text } from "../../reusable/Text/Text";
import { CenterLayout } from "../../reusable/Box/CenterLayout";
import { Strong } from "../../reusable/Strong/Strong";

import { useForm, useWatch } from "react-hook-form";

import { InputSearchBar } from "./ScriptsComponents/InputSearchBar";

import { useEntitiesSearchFunc } from "./ScriptsComponents/EntitiesSearchFunc";

import { EntityList } from "./ScriptsComponents/EntityList";

export interface TypeSearch {
  type: "name" | "cpf" | "cnpj";
  query: string;
}

export const ShowEntities = () => {
  const { register, control } = useForm<TypeSearch>({
    defaultValues: { type: "name", query: "" },
  });

  const searchValues = useWatch({ control });

  const entities = useEntitiesSearchFunc(searchValues)

  if (!entities) {
    return <Text textAlign="center">Carregando Entidades...</Text>;
  }

  return (
    <CenterLayout>
      <Box
        bg="system.light_dark"
        mt={3}
        maxHeight="85vh"
        display="flex"
        flexDirection="column"
        padding={4}
      >
        <Box m={0} p={0}>
          <Text
            textAlign="left"
            fontSize={{
              base: "sm",
              sm: "xl",
              md: "xl",
              lg: "xl",
              xl: "xl",
            }}
            color="system.light"
          >
            Quer fechar novos <Strong color="system.red">negócios</Strong> mas
            não sabe se o parceiro é <Strong>confiável?</Strong> <br />
            Faça uma <Strong>busca!</Strong>
          </Text>
        </Box>

        <Box marginTop={4} p={0} boxShadow="none">
          <InputSearchBar register={register}></InputSearchBar>
        </Box>

        <EntityList entities={entities}></EntityList>
        

      </Box>
    </CenterLayout>
  );
};
