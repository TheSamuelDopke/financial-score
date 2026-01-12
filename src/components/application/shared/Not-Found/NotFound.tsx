import { Box } from "../Box/BoxWhWidth";
import { CenterLayout } from "../Box/CenterLayout";
import { Button } from "../Button/Button";
import { Link } from "../Link/Link";
import { Text } from "../Text/Text";

export const NotFound = () => {
  return (
    <CenterLayout mt={10} fontSize={{ base: "xs", md: "md" }}>
      <Text mb={2}>Erro 404: Página não encontrada!</Text>
    <Box p={0} mt={3} borderRadius="xs">
      <Link href="/" display="flex" minW="fit-content" justifyContent="center">
        <Button
          padding={3}
          _hover={{
            opacity: "1",
            "& p, svg": {
              color: "system.dark",
              stroke: "system.dark",
            },
          }}
          minWidth="100px"
        >
          <Text fontSize="baseXsRestSm">Voltar para Home</Text>
        </Button>
      </Link>
    </Box>
    </CenterLayout>
  );
};
