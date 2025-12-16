import {Button as ButtonChakra} from '@chakra-ui/react'

export const Button = ({...props}) => {
    return(
        <div>
            <ButtonChakra bg="brand.btn" _hover={{bg: "brand.btnHover.dark"}}  {...props}>

            </ButtonChakra>
        </div>
    )
}