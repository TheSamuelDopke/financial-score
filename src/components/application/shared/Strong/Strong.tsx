
import { Text } from "@chakra-ui/react";

export const Strong = ({...props}) => {
    return(
        <Text color="system.primary" as="span" {...props} fontWeight="bold">

        </Text>
    )
}