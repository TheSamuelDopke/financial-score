import { Box } from "@/components/application/reusable/Box/BoxWhWidth";
import { Button } from "@/components/application/reusable/Button/Button";
import { Link } from "@/components/application/reusable/Link/Link";
import { Text } from "@/components/application/reusable/Text/Text";
import { Icon } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

export function BtnRegister() {
  return (
    <Box p={0} mt={3} borderRadius="xs" >
      <Link href="/register" display="flex" minW="fit-content">
        <Button
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
          <Icon size={{ base: "sm", sm: "md" }}>
            <LuPlus></LuPlus>
          </Icon>
          <Text fontSize="baseSmRestMd">Cadastrar Novo Parceiro</Text>
        </Button>
      </Link>
    </Box>
  );
}
