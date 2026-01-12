import { Box as BoxChakra } from "@chakra-ui/react"

export const Box = ({...props}) => {
    return(
        <BoxChakra {...props} minW={{base: '95%', md: 750, lg: 800, xl: 800}} >
            
        </BoxChakra>
    )
}