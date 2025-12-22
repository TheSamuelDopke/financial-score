'use client'

import { Box, Group, NativeSelect } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { Input } from "../../../reusable/Input/Input"
import { TypeSearch } from "../ShowEntities"
import { LuChevronDown } from "react-icons/lu"
import {
  useWatch,
  Control,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form"
import { formatCNPJ, formatCPF } from "../../../reusable/Scripts/validateCpfCnpj"

interface EntitySearchBarProps {
  register: UseFormRegister<TypeSearch>
  control: Control<TypeSearch>
  setValue: UseFormSetValue<TypeSearch>

}

export const InputSearchBar = ({
  register,
  control,
  setValue,

}: EntitySearchBarProps) => {

  //Adicionado fallback ?? 'name' pois inicialmente o selectedType é undefined no server, no entanto foi padronizado para 'name' no client (o que estava causando erro de hidratação)!
  const selectedType = useWatch({
    control,
    name: "type",
  }) 



  const placeholderText = {
    name: "Pesquise por nome...",
    cpf: "Pesquise por CPF...",
    cnpj: "Pesquise por CNPJ...",
  }  

  const formatCpfCnpj = (value: string, type: string) => {

    if (type === "cpf") {
      const validateDigits = formatCPF(value)
      return validateDigits
    }

    if (type === "cnpj") {
      const validateDigits = formatCNPJ(value)
      return validateDigits
    }

    return value
  };

  return (
    <Group
      attached
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="md"
      borderRadius="5px"
    >
      <NativeSelect.Root
        display="flex"
        width="max-content"
        color="system.primary"


      >
        <NativeSelect.Field
          borderRadius="5px"
          _focus={{
            borderColor: "system.primary",
            outline: "none",
            boxShadow: "lg",
          }}
          {...register("type", {
            onChange: () => setValue("query", ""),
          })}
          borderRightRadius="0"
          m={0}
          marginRight="1px"
          fontSize="baseXsRestSm"
          paddingRight={{
            base: "0px",
            sm: "0px",
          }}
          width={{
            base: "63px",
            sm: "74px",
          }}
          cursor="pointer"

        >
          {" "}
          <option
            style={{ textAlign: "left", backgroundColor: "#252525" }}
            value="name"
          >
            Nome
          </option>
          <option
            style={{ textAlign: "left", backgroundColor: "#252525" }}
            value="cpf"
          >
            CPF
          </option>
          <option
            style={{ textAlign: "left", backgroundColor: "#252525" }}
            value="cnpj"
          >
            CNPJ
          </option>
        </NativeSelect.Field>
        <NativeSelect.Indicator
          position="absolute"
          right={{ base: "3.5px", sm: "5px" }}
          p={0}
          m={0}

          color="system.primary"
          fontSize="baseMdRestXl"
        >
          <LuChevronDown />
        </NativeSelect.Indicator>
      </NativeSelect.Root>

      <Box
        flex="1"
        //Para evitar trazer o label do nosso componente Input - Estava causando bugs visuais!
        css={{ "& label": { display: "none", padding: 0, margin: 0 } }}
      >
        <Input
          _focus={{
            borderColor: "system.primary",
            outline: "none",
            boxShadow: "none",
          }}
          {...register("query")}
          placeholder={
            placeholderText[selectedType as keyof typeof placeholderText]
          }
          borderLeftRadius="0"
          startElement={<LuSearch />}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (selectedType !== "name") {
              e.target.value = formatCpfCnpj(e.target.value, selectedType);
            }
          }}
        />
      </Box>
    </Group>
  );
};
