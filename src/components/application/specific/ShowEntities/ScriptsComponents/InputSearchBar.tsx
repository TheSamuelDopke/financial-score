import { Box, Group, NativeSelect } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { Input } from "../../../reusable/Input/Input";
import { TypeSearch } from "../ShowEntities";
import { LuChevronDown } from "react-icons/lu";
import {
  useWatch,
  Control,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface EntitySearchBarProps {
  register: UseFormRegister<TypeSearch>;
  control: Control<TypeSearch>;
  setValue: UseFormSetValue<TypeSearch>;
}

export const InputSearchBar = ({
  register,
  control,
  setValue,
}: EntitySearchBarProps) => {
  const selectedType = useWatch({
    control,
    name: "type",
  });

  const placeholderText = {
    name: "Pesquise por nome...",
    cpf: "Pesquise por CPF...",
    cnpj: "Pesquise por CNPJ...",
  };

  const formatCpfCnpj = (value: string, type: string) => {
    const digits = value.replace(/\D/g, "");

    if (type === "cpf") {
      const validateDigits = digits.slice(0, 11);
      return validateDigits
        .replace(/(\={0,3})(\d{1,3})/, "$1$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    if (type === "cnpj") {
      const validateDigits = digits.slice(0, 14);
      return validateDigits
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return value;
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
        alignItems="center"
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
          textAlign="center"
          fontSize="baseXsRestSm"
          paddingRight={{
            base: "5px",
            sm: "10px",
          }}
          width={{
            base: "60px",
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
          textAlign="center"
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
