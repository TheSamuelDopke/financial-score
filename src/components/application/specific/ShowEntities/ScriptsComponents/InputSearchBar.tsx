import { Box, Group, NativeSelect } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { UseFormRegister } from "react-hook-form";
import { Input } from "../../../reusable/Input/Input";
import { TypeSearch } from "../ShowEntities";
import { LuChevronDown } from "react-icons/lu";

interface EntitySearchBarProps {
  register: UseFormRegister<TypeSearch>;
}

export const InputSearchBar = ({ register }: EntitySearchBarProps) => {
  return (
    <Group
      attached
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="md"
    >
      <NativeSelect.Root
        display="flex"
        width="max-content"
        color="system.primary"
        alignItems="center"
      >
        <NativeSelect.Field
          display="flex"
          justifyContent="center"
          _focus={{
            borderColor: "system.primary",
            outline: "none",
            boxShadow: "none",
          }}
          {...register("type")}
          borderRightRadius="0"
          m={0}
          marginRight="1px"
          textAlign="center"
          fontSize={{
            base: "xs",
            sm: "sm",
            md: "sm",
            lg: "sm",
            xl: "sm",
          }}
          padding={{
            base: "0px 0px 0px 5px",
            sm: "0px 0px 0px 10px",
            md: "0px 0px 0px 10px",
            lg: "0px 0px 0px 10px",
            xl: "0px 0px 0px 10px",
          }}
          width={{
            base: "60px",
            sm: "74px",
            md: "74px",
            lg: "74px",
            xl: "74px",
          }}
          cursor="pointer"
        >
          <option
            style={{ textAlign: "left", backgroundColor: "#252525" }}
            value="cpf"
          >
            CPF
          </option>
          <option
            style={{ textAlign: "left", backgroundColor: "#252525" }}
            value="name"
          >
            NOME
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
          right={{ base: "2px", sm: "5px", md: "5px", lg: "5px", xl: "5px" }}
          p={0}
          m={0}
          textAlign="center"
          color="system.primary"
        >
          <LuChevronDown />
        </NativeSelect.Indicator>
      </NativeSelect.Root>

      <Box
        flex="1"
        css={{ "& label": { display: "none", padding: 0, margin: 0 } }}
      >
        <Input
          _focus={{
            borderColor: "system.primary",
            outline: "none",
            boxShadow: "none",
          }}
          {...register("query")}
          placeholder="Digite para pesquisar..."
          borderLeftRadius="0"
          startElement={<LuSearch />}
          pl={10}
        />
      </Box>
    </Group>
  );
};
