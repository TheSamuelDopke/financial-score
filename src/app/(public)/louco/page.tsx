
import {Box, Text, Heading} from '@chakra-ui/react'

interface PostProps{
    id: number;
    title: string;
    body: string;
    userId: number
}

interface ResponseProps {
    posts: PostProps[]
}

const response = await fetch(`https://dummyjson.com/posts`)
const data: ResponseProps = await response.json()

console.log(data)

export default function Louco(){
    return(
        <Box colorScheme="dark" color="brand.primary">Louco Loucura
            <Text>Posts:</Text>

            <Box m={10} border="1px solid black">
                {data.posts.map(post =>(
                    <Box m={10} border="1px solid black" p={5} key={post.id}>
                        <Heading as="h1">{post.title}</Heading>
                        <Text>{post.body}</Text>
                    </Box>
                ))}
            </Box>

        </Box>
    )
}