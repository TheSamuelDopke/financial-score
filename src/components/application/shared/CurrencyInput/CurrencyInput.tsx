"use client";

import { NumericFormat, NumericFormatProps } from "react-number-format";
import { forwardRef } from "react";
import { Input, InputProps } from "@chakra-ui/react";

//Para padronizar com o ChakraUI
type CurrencyInputProps = Omit<
  NumericFormatProps,
  "size" | "thousandSeparator" | "decimalSeparator" | "customInput"
> &
  Pick<InputProps, "name" | "placeholder" | "disabled"> & {
    invalid?: boolean;
  };

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ invalid, ...props }, ref) => {
    return (
      <NumericFormat
      p={2}
      boxShadow='sm'
        {...props}
        getInputRef={ref}
        customInput={Input}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        decimalScale={2}
        fixedDecimalScale
        allowNegative={false}
        valueIsNumericString
        onClick={(e) => {
          const input = e.target as HTMLInputElement;
          const commaIndex = input.value.indexOf(",");
          if (commaIndex > -1) {
            input.setSelectionRange(commaIndex, commaIndex);
          }
        }}
        onFocus={(e) => {
          const input = e.target as HTMLInputElement;
          const commaIndex = input.value.indexOf(",");
          if (commaIndex > -1) {
            input.setSelectionRange(commaIndex, commaIndex);
          }
        }}
        data-invalid={invalid ? "" : undefined}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";
