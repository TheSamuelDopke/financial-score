"use client";

import { system } from "../../../theme";

import { ChakraProvider } from "@chakra-ui/react";


export function Provider({ children }: { children: React.ReactNode }) {
  return (

      <ChakraProvider value={system}>{children}</ChakraProvider>

  );
}
