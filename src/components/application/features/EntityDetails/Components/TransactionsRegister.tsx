import { Box } from "@/components/application/shared/Box/BoxNoWidth";
import { Button } from "@/components/application/shared/Button/Button";
import { Form } from "@/components/application/shared/Form/Form";
import { Input } from "@/components/application/shared/Input/Input";
import { Dialog, Field, Portal, Stack } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import {
  Transactions,
  CreateTransactionsSchema,
} from "@/data/models/transactions";
import { CurrencyInput } from "@/components/application/shared/CurrencyInput/CurrencyInput";
//Usando react-hook por ser mais vantajoso e otimizado do que useEffect do react puro.
import { Controller, useForm, useWatch } from "react-hook-form";
//Integração do react-hook com a validação do Zod
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionService } from "@/data/services/transactionService";
import { toaster } from "@/components/ui/toaster";


export const TransactionsRegister = ({ entityId }: { entityId: number }) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Transactions>({
    resolver: zodResolver(CreateTransactionsSchema),
    mode: "onBlur",
    defaultValues: {
      idEntity: entityId,
      description: "",
      value: 0,
      dueDate: "",
      status: false,
    },
  });

  const isPaid = useWatch({
    control,
    name: "status",
  });

  const onSubmit = async (data: Transactions) => {
    try {
      console.log(data);
      await TransactionService.create(data);

      reset();
      toaster.create({
        title: "Transação adicionada com sucesso!",
        type: "success",
      });
    } catch (e) {
      const error = e as Error;
      setError("dueDate", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
    <Dialog.Root size={{base: 'xs', sm: 'md'}} placement="center" motionPreset="slide-in-bottom" >
      <Dialog.Trigger asChild >
        <Button
          bg="system.light_dark"
          color="system.primary"
          _hover={{ bg: "system.dark" }}
          size={{ base: "xs", sm: "lg" }}
        >
          Nova Transação
        </Button>
      </Dialog.Trigger>
      <Portal >
        <Dialog.Backdrop>
          <Dialog.Positioner>
            <Dialog.Content width={{base: 300, sm: 500}}>
              <Dialog.Header>
                <Dialog.Title>Adicionar nova fatura</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body marginTop={-5}>
                <Stack gap="4">
                  <Box>
                    <Form
                      method="POST"
                      onSubmit={handleSubmit(onSubmit, (errors) => {
                        console.log("ERROS: ", errors);
                      })}
                    >
                      <Input
                        type="hidden"
                        {...register("idEntity", { valueAsNumber: true })}
                        display="none"
                      ></Input>

                      <Input
                        {...register("description")}
                        error={errors.description?.message}
                        invalid={!!errors.description}
                        type="text"
                        label="Descrição"
                        name="description"
                        placeholder="Descrição da transação"
                      ></Input>

                      <Controller
                        name="value"
                        control={control}
                        render={({ field }) => (
                          <CurrencyInput
                            value={field.value?.toString() ?? ""}
                            onBlur={field.onBlur}
                            invalid={!!errors.value}
                            name="value"
                            placeholder="Valor da transação"
                            onValueChange={(values) => {
                              field.onChange(values.floatValue ?? 0);
                            }}
                          ></CurrencyInput>
                        )}
                      ></Controller>

                      <Input
                        {...register("dueDate")}
                        error={errors.dueDate?.message}
                        invalid={!!errors.dueDate}
                        type="date"
                        label="Data de vencimento"
                        name="dueDate"
                        placeholder="Data de vencimento"
                      ></Input>

                      <Field.Root  borderRadius="md">
                        <Checkbox.Root
                          display="flex"
                          justifyContent="flex-start"
                          variant="subtle"
                          colorPalette="green"
                          w="100%"
                          checked={isPaid}
                          onCheckedChange={(details) => {
                            setValue(
                              "status",
                              details.checked === true,
                              { shouldDirty: true, shouldTouch: true }
                            );
                          }}
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                          <Checkbox.Label padding={1} borderRadius={50}>Está pago?</Checkbox.Label>
                        </Checkbox.Root>
                      </Field.Root>

                      {isPaid && (
                        <Input
                          {...register("payDate")}
                          error={errors.payDate?.message}
                          invalid={!!errors.payDate}
                          type="date"
                          label="Data do pagamento"
                          name="payDate"
                          placeholder="Data de vencimento"
                        ></Input>
                      )}
                      <Button type="submit" loading={isSubmitting} width="100%">
                        Adicionar fatura
                      </Button>
                    </Form>
                  </Box>
                </Stack>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Backdrop>
      </Portal>
    </Dialog.Root>
  );
};
