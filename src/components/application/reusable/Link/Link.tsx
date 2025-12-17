import { Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react"
import NextLink from "next/link"
import {LinkProps as NextLinkProps} from "next/link"

//Pegamos apenas propriedades especificas do NextLink para podermos customizar os componentes nas paginas, sem que isso interfira no código, visto que há erro no "...props" se não fizermos isso, pois o componente ChakraLink tenta pegar props do NextLink que não são compatíveis com ele!
type NextLinkSpecificProps = Pick<NextLinkProps, "href" | "replace" | "scroll" | "prefetch">


//Omitimos aqui a prop "as" pois já estamos definindo a prop asChild que é boolean e diz que será renderizado no filho sem precisar especificar como no caso da as=algumacoisa
//Omitimos o href para evitar conflitos já que temos o href do NextLinkSpecificProps(esse estamos usando para melhor performance) e do ChakraLinkProps(que estamos omitindo com o Omit<>) para não causar duplicidades 
type CombinedLinkProps = NextLinkSpecificProps & Omit<ChakraLinkProps, "as" | "href">


export const Link = ({
    //NextLinkProps
    href,
    replace,
    scroll,
    prefetch,
    //ChakraProps
    children, 
    ...props}: CombinedLinkProps) => {
  return (
    <ChakraLink _hover={{color: "system.dark"}} textDecoration="none" asChild {...props} color="system.link" >
      <NextLink href={href} replace={replace} scroll={scroll} prefetch={prefetch}>{children}</NextLink>
    </ChakraLink>
  )
}