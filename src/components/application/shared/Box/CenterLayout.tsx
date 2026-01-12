
import {Box, BoxProps} from '@chakra-ui/react'

export const CenterLayout = ({ children, ...props}: BoxProps) => {
    return(
        <Box m="auto" display="flex" flexDirection="column" justifyContent="center" textAlign="center" alignItems="center" {...props}>
            {children}
        </Box>
    )
}