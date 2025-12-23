"use client";

import { Box } from "../../reusable/Box/BoxWhWidth";
import { Text } from "../../reusable/Text/Text";
import { CenterLayout } from "../../reusable/Box/CenterLayout";
import { Strong } from "../../reusable/Strong/Strong";

import { useForm, useWatch } from "react-hook-form";

import { InputSearchBar } from "./Components/InputSearchBar";

import { useEntities } from "./Components/useEntities";

import { EntityList } from "./Components/EntityList";

import { useDebounce } from "./Components/useDebounce";

import { useState, useEffect } from "react";
import { BtnRegister } from "./Components/BtnRegister";

export interface TypeSearch {
  type: "name" | "cpf" | "cnpj";
  query: string;
}

export const ShowEntities = () => {
  const { register, control, setValue } = useForm<TypeSearch>({
    defaultValues: { type: "name", query: "" },
  });

  const searchValues = useWatch({ control });
  const debouncedSearchValues = useDebounce(searchValues, 300);
  const [page, setPage] = useState(1);

  useEffect(() => {
    //Para evitar renderizações desnecessárias
    queueMicrotask(() => {
      setPage((prev) => (prev !== 1 ? 1 : prev));
    });
  }, [debouncedSearchValues.query, debouncedSearchValues.type]);

  const entities = useEntities(debouncedSearchValues, page);

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
          <Text textAlign="left" fontSize="baseSmRestXl" color="system.light">
            Quer fechar novos <Strong color="system.red">negócios</Strong> mas
            não sabe se o parceiro é <Strong>confiável?</Strong> <br />
            Faça uma <Strong>busca!</Strong>
          </Text>
        </Box>

        <Box marginTop={4} p={0} boxShadow="none">
          <InputSearchBar
            register={register}
            control={control}
            setValue={setValue}
          ></InputSearchBar>
        </Box>

        <BtnRegister></BtnRegister>

        <EntityList
          entities={entities}
          onLoadMore={() => setPage((p) => p + 1)}
        ></EntityList>
      </Box>
    </CenterLayout>
  );
};
