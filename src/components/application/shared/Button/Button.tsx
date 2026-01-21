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
    bg,
    ...rest
  } = props


  return (
    <ButtonChakra
    ref={ref}
    type={type}
    disabled={disabled || loading}
      color="system.primary"
      bg={bg}
      _hover={{ color: "system.primary"}}
      {...rest}
    >
      {children}
    </ButtonChakra>
  );
});

Button.displayName = "Button";

export {Button}
