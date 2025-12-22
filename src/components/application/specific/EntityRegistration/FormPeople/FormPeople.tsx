"use client";
//Usando react-hook por ser mais vantajoso e otimizado do que useEffect do react puro.
import { useForm, useWatch } from "react-hook-form";
//Integração do react-hook com a validação do Zod
import { zodResolver } from "@hookform/resolvers/zod";

import { EntitySchema, Entities } from "@/data/models/entities";
import { EntityService } from "@/data/services/entitiesService";

import { Form } from "../../../reusable/Form/Form";
import { Input } from "../../../reusable/Input/Input";
import { Button } from "../../../reusable/Button/Button";

import { toaster } from "@/components/ui/toaster";

import { formatCPF } from "@/components/application/reusable/Scripts/validateCpfCnpj";

export const FormPeople = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Entities>({
    resolver: zodResolver(EntitySchema),
    mode: "onBlur",
    defaultValues: {
      type: "Person",
      name: "",
      cpfCnpj: "",
      cpfCnpjFormatted: "",
      riskLevel: "Desconhecido",
    },
  });

  const cpfValue = useWatch({
    control,
    name: "cpfCnpj",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Utilizamos o replace para permitir só números e o slice para não permitir mais de 11 números digitados, previne ctrl c + ctrl v no input

    const cpfFormated = formatCPF(e.target.value)

    setValue("cpfCnpj", cpfFormated, { shouldValidate: true });
  };

  const onSubmit = async (data: Entities) => {
    try {
      await EntityService.create(data);
      //Reseta os campos!
      reset();
      toaster.create({
        title: "Pessoa adicionada com sucesso!",
        type: "success",
      });
    } catch (e) {
      const error = e as Error;
      setError("cpfCnpj", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("name")}
        error={errors.name?.message}
        invalid={!!errors.name}
        fontSize={{ base: "md", md: "lg", lg: "lg", xl: "lg" }}
        label="Nome Completo:"
        placeholder="Samuel Pedro Dopke"
        type="text"
      ></Input>
      <Input
        error={errors.cpfCnpj?.message}
        invalid={!!errors.cpfCnpj}
        fontSize={{ base: "md", md: "lg", lg: "lg", xl: "lg" }}
        label="CPF:"
        placeholder="XXX.XXX.XXX-XX"
        type="text"
        value={cpfValue}
        onChange={handleInputChange}
      ></Input>

      <Button type="submit" loading={isSubmitting} w="100%">
        Registrar Pessoa
      </Button>
    </Form>
  );
};
