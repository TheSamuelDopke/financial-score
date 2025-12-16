import {Text} from '@chakra-ui/react'

import {CenterFlexBox} from '../components/app/CenterFlexBox/CenterFlexBox'

import {Link} from '../components/app/Link/Link'

import {Button} from '../components/app/Button/Button'

import { FinancialScore } from '@/components/app/FinancialScore'



export default function NotFound(){
    return(
        <CenterFlexBox
         mt={10}
         fontSize={{base: 'xs', md: 'md'}}> 
            <FinancialScore></FinancialScore>
            <Text mb={2}>Erro 404: Página não encontrada!</Text>
            <Button fontSize={{base: 'xs', md: 'md'}} size={{base: 'xs', md: 'md'}}>
                <Link w="100%" h="100%" display="flex" href="/">Voltar para home</Link>
            </Button>

        </CenterFlexBox>
    )
}