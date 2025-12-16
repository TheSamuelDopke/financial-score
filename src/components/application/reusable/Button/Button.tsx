import { Button as ButtonChakra } from "@chakra-ui/react";

export const Button = ({ ...props }) => {
  return (
    <ButtonChakra 
      color="white"
      bg="brand.primary"
      _hover={{ bg: "", color: "black"}}
      {...props}
    >

    </ButtonChakra>
  );
};
