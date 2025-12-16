import {
  Input as ChakraInput,
  InputProps,
  InputGroup,
  Field,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type InputPropsExtended = InputProps & {
  children?: ReactNode;
  startElement?: ReactNode;
  label?: ReactNode;
};

export const Input = ({
  fontSize,
  label,
  startElement,
  ...props
}: InputPropsExtended) => {
  return (
    <Field.Root>
      <Field.Label color="white" fontSize={fontSize} ml={1}>{label}</Field.Label>
      <InputGroup fontSize={fontSize} startElement={startElement}>
        <ChakraInput boxShadow='sm' {...props}></ChakraInput>
      </InputGroup>
    </Field.Root>
  );
};
