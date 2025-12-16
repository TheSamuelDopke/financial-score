import {Text} from '@chakra-ui/react'

import {CenterLayout} from '../components/application/reusable/Box/CenterLayout'

import {Link} from '../components/application/reusable/Link/Link'

import {Button} from '../components/application/reusable/Button/Button'

import { FinancialScore } from '@/components/application/reusable/Logo/FinancialScore'



export default function NotFound(){
    return(
        <CenterLayout
         mt={10}
         fontSize={{base: 'xs', md: 'md'}}> 
            <FinancialScore></FinancialScore>
            <Text mb={2}>Erro 404: Página não encontrada!</Text>
            <Button fontSize={{base: 'xs', md: 'md'}} size={{base: 'xs', md: 'md'}}>
                <Link w="100%" h="100%" display="flex" href="/" p={5}>Voltar para home</Link>
            </Button>

        </CenterLayout>
    )
}