
import {Box, BoxProps} from '@chakra-ui/react'

export const CenterFlexBox = ({children, ...props}: BoxProps) => {
    return(
        <Box color="white" display="flex" flexDirection="column" justifyContent="center" textAlign="center" alignItems="center" {...props}>
            {children}
        </Box>
    )
}