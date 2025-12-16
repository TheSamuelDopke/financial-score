import {Text as TextChakra} from '@chakra-ui/react'


export const Text = ({...props}) => {
    return(
        <TextChakra fontSize={{ base: "16px", md: "xl", lg: "xl", xl: "xl" }} color="white" {...props}>

        </TextChakra>
    )
}

