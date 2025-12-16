'use client'

import {Box, Button} from '@chakra-ui/react'
import {FinancialScore} from '../../components/app/FinancialScore'


export default function TestChakra() {
    return(
        <Box p={8} m={4} color="white" borderRadius="lg" boxShadow="xl">
            <FinancialScore></FinancialScore>

            

            <Button colorScheme="dark" size="lg">
                Meu botão de teste

            </Button>

        </Box>



    )
}