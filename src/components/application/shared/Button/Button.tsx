'use client'

import { Button as ButtonChakra, ButtonProps } from "@chakra-ui/react";
import { forwardRef } from "react";

type Props = ButtonProps & {
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    type = "button",
    loading,
    disabled,
    children,
    ...rest
  } = props


  return (
    <ButtonChakra
    ref={ref}
    type={type}
    disabled={disabled || loading}
      color="white"
      bg="system.primary"
      _hover={{ bg: "", color: "black"}}
      {...rest}
    >
      {children}
    </ButtonChakra>
  );
});

Button.displayName = "Button";

export {Button}
