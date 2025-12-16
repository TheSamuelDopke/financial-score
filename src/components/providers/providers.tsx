"use client";

import {
  ColorModeProvider,
  ColorModeProviderProps,
} from "@/components/ui/color-mode";
import { system } from "../../../theme";

import { ChakraProvider } from "@chakra-ui/react";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} forcedTheme="dark" />
    </ChakraProvider>
  );
}