
import { Box, Heading, Flex } from "@chakra-ui/react";

import { FinancialScore } from "../../reusable/Logo/FinancialScore";

export const Header = () => {
    return(
        <Box bg="brand.dark" boxShadow="md" h="70px" display="flex" alignItems="center" justifyContent='space-around'>
            <FinancialScore></FinancialScore>
        </Box>
    )
}