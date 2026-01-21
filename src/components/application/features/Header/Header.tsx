'use client'

import { Box } from "@chakra-ui/react";

import { FinancialScore } from "../../shared/Logo/FinancialScore";

export const Header = () => {
    return(
        <Box bg="system.dark" boxShadow="md" h="70px" display="flex" alignItems="center" justifyContent='space-around'>
            <FinancialScore></FinancialScore>
        </Box>
    )
}