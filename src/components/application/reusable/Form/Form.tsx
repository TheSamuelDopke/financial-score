'use client'
import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import { ReactNode, FormEvent } from 'react'

const ChakraForm = chakra('form')

type FormProps = Omit<HTMLChakraProps<'form'>, 'children' | 'onSubmit'> & {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
  children?: ReactNode

}

export const Form = ({ onSubmit, children, ...props}: FormProps) => {
  return (
    <ChakraForm
      {...props}
      onSubmit={onSubmit}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="4"

      borderRadius="md"
    >
      {children}
    </ChakraForm>
  )
}