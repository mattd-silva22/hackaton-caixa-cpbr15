import Head from 'next/head'
import {
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
} from '@chakra-ui/react'
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  EmailIcon,
  LockIcon,
  MoonIcon,
} from '@chakra-ui/icons'
import { FormEvent } from 'react'
import { useAuth } from '@/Contexts/AuthProvider'
import { useRouter } from 'next/router'

export default function Register() {
  const { signUp, user } = useAuth()
  const { push } = useRouter()

  if (user) {
    push('/')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const name = event.currentTarget.nome.value
    const email = event.currentTarget.email.value
    const password = event.currentTarget.password.value

    try {
      signUp({
        name,
        email,
        password,
      })
    } catch (error) {
      alert('Não foi possível criar conta')
    }
  }

  return (
    <>
      <Head>
        <title>Caixa Teens</title>
        <meta name="description" content="Nova forma de desenvolvimento" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        background="var(--primary)"
        w="100%"
        h="100vh"
        flexDir="column"
        gap="24px"
        padding="36px"
        alignItems="center"
      >
        <Flex height="120px">
          <Image src="/login/logo-branca.svg" width="200px" />
        </Flex>

        <Flex gap="4px" alignItems="center" w="100%" padding="0px">
          <Link
            onClick={() => push('/login')}
            fontSize="16px"
            fontWeight="500"
            justifyContent="flex-start"
            color="white"
          >
            <ChevronLeftIcon w="32px" h="32px" />
            {'Voltar'}
          </Link>
        </Flex>

        <Flex alignSelf="stretch" alignItems="stretch" flexDir="column">
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormControl isRequired>
              <InputGroup
                _focusWithin={{
                  svg: {
                    color: 'var(--secondary)',
                  },
                }}
              >
                <InputLeftElement pointerEvents="none">
                  <MoonIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  name="nome"
                  type="name"
                  placeholder="name"
                  background="white"
                  _focus={{
                    borderColor: 'var(--secondary)',
                  }}
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <InputGroup
                mt="16px"
                _focusWithin={{
                  svg: {
                    color: 'var(--secondary)',
                  },
                }}
              >
                <InputLeftElement pointerEvents="none">
                  <EmailIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  background="white"
                  _focus={{
                    borderColor: 'var(--secondary)',
                  }}
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <InputGroup
                mt="16px"
                _focusWithin={{
                  svg: {
                    color: 'var(--secondary)',
                  },
                }}
              >
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  name="password"
                  type="password"
                  placeholder="Senha"
                  background="white"
                  _focus={{
                    borderColor: 'var(--secondary)',
                  }}
                  minLength={6}
                />
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              mt="16px"
              width="100%"
              bg="var(--secondary)"
              color="white"
            >
              Cadastrar
            </Button>
          </form>
        </Flex>
      </Flex>
    </>
  )
}
