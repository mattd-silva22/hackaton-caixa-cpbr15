import Head from 'next/head'
import {
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from '@chakra-ui/react'
import { MinusIcon } from '@chakra-ui/icons'
import { FormEvent } from 'react'
import { useAuth } from '@/Contexts/AuthProvider'
import { useRouter } from 'next/router'
import HeadBackButton from '@/components/HeadBackButton'
import { useExpensesContext } from '@/Contexts/ExpensesProvider'
import { CategoriesEnum } from '@/interface/ConsumerProfileEnum.enum'

export default function RegisterExpense() {
  const { registerExpense } = useExpensesContext()
  const { user } = useAuth()
  const { push, back } = useRouter()

  if (!user) {
    push('/login')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const expense = event.currentTarget.expense.value
    const category = event.currentTarget.category.value

    try {
      await registerExpense(user?.id as string, expense, category)

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
          Registrar despesa
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
                  <MinusIcon color="gray.300" />
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

            <FormControl isRequired>
              <Select placeholder="Categoria" name="category">
                <option value={CategoriesEnum.FOOD}>Alimentação</option>
                <option value={CategoriesEnum.HEALTH}>Saúde</option>
                <option value={CategoriesEnum.TRANSPORT}>Transporte</option>
                <option value={CategoriesEnum.HYGIENE}>Higiene</option>
                <option value={CategoriesEnum.LEISURE}>Lazer</option>
              </Select>
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
