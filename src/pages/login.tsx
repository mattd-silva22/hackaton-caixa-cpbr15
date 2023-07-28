import Head from 'next/head'
import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'

export default function Login() {
  return (
    <>
      <Head>
        <title>Caixa Teens</title>
        <meta name="description" content="Nova forma de desenvolvimento" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex>
          <Icon href="/logo-branca.svg" />

          <Flex>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="gray.300" />
              </InputLeftElement>
              <Input type="email" placeholder="Email" />
            </InputGroup>
          </Flex>
        </Flex>
      </main>
    </>
  )
}
