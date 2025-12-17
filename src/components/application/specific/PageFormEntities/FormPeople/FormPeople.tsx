"use client";

import { Form } from "../../../reusable/Form/Form";
import { Input } from "../../../reusable/Input/Input";
import { Button } from "../../../reusable/Button/Button";

export const FormPeople = () => {
  return (
    <Form>
      <Input
        fontSize={{ base: "md", md: "lg", lg: "lg", xl: "lg" }}
        label="Nome Completo:"
        placeholder="Samuel Pedro Dopke"
        type="text"
      ></Input>
      <Input
        fontSize={{ base: "md", md: "lg", lg: "lg", xl: "lg" }}
        label="CPF:"
        placeholder="XXX.XXX.XXX-XX"
        type="text"
      ></Input>
      <Button w="100%">Registrar Pessoa</Button>
    </Form>
  );
};