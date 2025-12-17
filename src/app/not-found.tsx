import {Text} from '@/components/application/reusable/Text/Text'
import {CenterLayout} from '../components/application/reusable/Box/CenterLayout'
import {Link} from '../components/application/reusable/Link/Link'
import {Button} from '../components/application/reusable/Button/Button'

export default function NotFound(){
    return(
        <CenterLayout
         mt={10}
         fontSize={{base: 'xs', md: 'md'}}> 
            <Text mb={2}>Erro 404: Página não encontrada!</Text>
            <Button fontSize={{base: 'xs', md: 'md'}} size={{base: 'xs', md: 'md'}} padding={0} _hover={{color: "primary.dark", textDecoration: "none"}}>
                <Link w="100%" h="100%" display="flex" href="/" padding="0px 20px">Voltar para home</Link>
            </Button>

        </CenterLayout>
    )
}