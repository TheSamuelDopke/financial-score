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
  error?: string;
  invalid?: boolean
};

export const Input = ({
  error,
  invalid,
  fontSize,
  label,
  startElement,
  ...props
}: InputPropsExtended) => {
  return (
    <Field.Root invalid={invalid}>
      <Field.Label color="white" fontSize={fontSize} ml={1}>{label}</Field.Label>
      <InputGroup fontSize={fontSize} startElement={startElement}>
        <ChakraInput color="system.light" boxShadow='sm' {...props}></ChakraInput>

      </InputGroup>
      {error && (
        <Field.ErrorText>{error}</Field.ErrorText>
      )}

    </Field.Root>
  );
};
