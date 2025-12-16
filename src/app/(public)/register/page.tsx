import { Button } from "@/components/application/reusable/Button/Button";
import { CenterLayout } from "@/components/application/reusable/Box/CenterLayout";

import { Box } from "@/components/application/reusable/Box/Box";
import { HStack } from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5";
import { Text } from "@/components/application/reusable/Text/Text";
import {PageFormEntities} from "@/components/application/specific/PageFormEntities/PageFormEntities"

export default function RegisterPage() {
  return (
    <CenterLayout p={{ base: "20px 0px", md: 5, lg: 5, xl: 5 }}>
      <Box>
        <HStack>
          <Button
            h={{ base: "6", md: "8", lg: "8", xl: "8" }}
            w={{ base: "2", md: "8", lg: "8", xl: "8" }}
            size={{ base: "xs", md: "sm", lg: "sm", xl: "sm" }}
            padding={0}
          >
            <IoChevronBack></IoChevronBack>
          </Button>
          <Text textAlign="left">Cadastro de Pessoa:</Text>
        </HStack>
        <PageFormEntities>
        </PageFormEntities>
      </Box>
    </CenterLayout>
  );
}
