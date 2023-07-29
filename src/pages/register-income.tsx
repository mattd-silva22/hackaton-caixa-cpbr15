import Head from 'next/head'
import {
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { FormEvent } from 'react'
import { useAuth } from '@/Contexts/AuthProvider'
import { useRouter } from 'next/router'
import HeadBackButton from '@/components/HeadBackButton'
import { useExpensesContext } from '@/Contexts/ExpensesProvider'

export default function RegisterIncome() {
  const { user } = useAuth()
  const { registerIncome } = useExpensesContext()
  const { push, back } = useRouter()

  if (!user) {
    push('/login')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const income = event.currentTarget.income.value

    try {
      await registerIncome(user?.id as string, income)

      push('/expenses')
    } catch (error) {
      alert('Não foi possivel registrar deposito')
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
        {/* <HeadLogo /> */}
        <HeadBackButton onClick={() => back()} />

        <Text
          color="var(--tipograthy-1)"
          fontWeight={700}
          fontSize="16px"
          alignSelf="center"
        >
          Registrar deposito
        </Text>

        <Flex alignSelf="stretch" alignItems="stretch" flexDir="column">
          <form onSubmit={(e) => handleSubmit(e)}>
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
                  <AddIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  name="income"
                  type="number"
                  placeholder="R$ XXXX"
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
              mt="24px"
              width="100%"
              bg="var(--secondary)"
              color="white"
            >
              Registrar
            </Button>
          </form>
        </Flex>
      </Flex>
    </>
  )
}
