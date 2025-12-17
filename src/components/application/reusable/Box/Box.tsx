import { Box as BoxChakra } from "@chakra-ui/react"

export const Box = ({...props}) => {
    return(
        <BoxChakra {...props} bg='system.light_dark' borderRadius='sm' minW={{base: '95%', md: 750, lg: 800, xl: 800}}   padding={{base: 3, md: 5, lg: 5, xl: 5}} >
            
        </BoxChakra>
    )
}