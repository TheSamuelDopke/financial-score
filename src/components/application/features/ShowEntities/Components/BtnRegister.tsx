import { Box } from "@/components/application/shared/Box/BoxWhWidth";
import { Button } from "@/components/application/shared/Button/Button";
import { Link } from "@/components/application/shared/Link/Link";
import { Text } from "@/components/application/shared/Text/Text";
import { Icon } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

export function BtnRegister() {
  return (
    <Box p={0} mt={3} borderRadius="xs" >
      <Link href="/register" display="flex" minW="fit-content">
        <Button
        bg="system.primary"
        height={{ base: "40px", md: "50px", lg: "50px", xl: "50px" }}
          padding={3}
          _hover={{
            opacity: "1",
            "& p, svg": {
              color: "system.dark",
              stroke: "system.dark",
            },
          }}
          minWidth="100%"
        >
          <Icon size={{ base: "sm", sm: "md" }} color="white">
            <LuPlus></LuPlus>
          </Icon>
          <Text fontSize="baseSmRestMd">Cadastrar Novo Parceiro</Text>
        </Button>
      </Link>
    </Box>
  );
}
