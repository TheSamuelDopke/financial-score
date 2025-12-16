import { Text, Box, HStack } from "@chakra-ui/react";

export function FinancialScore() {
  return (
    <Box color="white" fontSize="2xl" fontFamily="system-ui" fontWeight="bold">
    <HStack> 

        <Text>
          Financial
        </Text>

        <Text color="brand.primary">
          Score
        </Text>
        
      </HStack>
    </Box>
  );
}
