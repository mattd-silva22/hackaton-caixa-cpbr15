import { useAuth } from '@/Contexts/AuthProvider'
import { useExpensesContext } from '@/Contexts/ExpensesProvider'
import ExpensesCategoriesItems from '@/components/ExpensesCategoriesItems'
import ExpensesHealthCard from '@/components/ExpensesHealthCard'
import HeadBackButton from '@/components/HeadBackButton'
import { ConsumerProfileEnum } from '@/interface/ConsumerProfileEnum.enum'
import { Button, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { ChevronRight } from 'react-feather'
import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts'

const Expenses: React.FC = () => {
  const { user } = useAuth()
  const { back, push } = useRouter()
  const { expenses, getFinanceHealth, limitsByIncome, limits } =
    useExpensesContext()

  if (!user) {
    push('/login')
  }

  const pieData = useMemo(() => {
    return [
      {
        value: expenses.FOOD,
        name: 'FOOD',
        color: '#d53131',
      },
      {
        value: expenses.HEALTH,
        name: 'HEALTH',
        color: '#43dd46',
      },
      {
        value: expenses.TRANSPORT,
        name: 'TRANSPORT',
        color: '#43dd46',
      },
      {
        value: expenses.HYGIENE,
        name: 'HYGIENE',
        color: '#43dd46',
      },
      {
        value: expenses.LEISURE,
        name: 'LEISURE',
        color: '#43dd46',
      },
    ]
  }, [expenses])

  function consumerProfileLabel(profile?: ConsumerProfileEnum) {
    switch (profile) {
      case ConsumerProfileEnum.AVENTUREIRO:
        return 'Aventureiro (a)'
      case ConsumerProfileEnum.CONSERVADOR:
        return 'Conservador (a)'
      case ConsumerProfileEnum.EQUILIBRADO:
        return 'Equilibrado (a)'
      case ConsumerProfileEnum.VISIONARIO:
        return 'Visionario (a)'
      default:
        return 'Faça uma projeção financeira'
    }
  }

  function consumerProfileDescription(profile?: ConsumerProfileEnum) {
    switch (profile) {
      case ConsumerProfileEnum.AVENTUREIRO:
        return 'Você é alguém que busca emoção e adora desfrutar do dinheiro, mas é importante lembrar de manter um certo equilíbrio financeiro para evitar problemas futuros.'
      case ConsumerProfileEnum.CONSERVADOR:
        return 'A segurança financeira é a sua prioridade, e você valoriza a estabilidade e o planejamento a longo prazo.'
      case ConsumerProfileEnum.EQUILIBRADO:
        return 'Você busca o equilíbrio entre aproveitar a vida e fazer o dinheiro render, tomando decisões financeiras ponderadas.'
      case ConsumerProfileEnum.VISIONARIO:
        return 'Seus objetivos financeiros são ambiciosos, e você está disposto(a) a correr alguns riscos para alcançá-los.'
      default:
        return 'Faremos uma análise baseada no seu uso'
    }
  }

  return (
    <>
      <main>
        <Flex
          backgroundColor="var(--background-main)"
          height="100%"
          width="100%"
          flexDirection="column"
          padding="24px 16px"
          gap="24px"
        >
          <HeadBackButton onClick={() => back()} />

          <Text
            color="var(--tipograthy-1)"
            fontWeight={700}
            fontSize="16px"
            alignSelf="center"
          >
            Despesas
          </Text>

          {Object.values(expenses).some((item) => item > 0) && (
            <Flex
              justifyContent="center"
              alignItems="center"
              display="flex"
              __css={{
                '.recharts-sector': {
                  stroke: 'var(--background-main)',
                },
              }}
            >
              <ResponsiveContainer width={200} height={140}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Flex>
          )}

          <Button width="100%" onClick={() => push('/register-income')}>
            Registrar deposito
          </Button>

          <Button width="100%" onClick={() => push('/register-expense')}>
            Registrar despesa
          </Button>

          <ExpensesHealthCard healthValue={getFinanceHealth()} />

          <Flex flexDir="column" width="100%">
            <ExpensesCategoriesItems
              title="Alimentação"
              imgPath="/expenses/burguer.svg"
              limit={limitsByIncome.FOOD}
              limitOfTotal={limits.FOOD}
              moneySpent={expenses.FOOD}
            />
            <ExpensesCategoriesItems
              title="Saúde"
              imgPath="/expenses/pills.svg"
              limit={limitsByIncome.HEALTH}
              limitOfTotal={limits.HEALTH}
              moneySpent={expenses.HEALTH}
            />
            <ExpensesCategoriesItems
              title="Transporte"
              imgPath="/expenses/fuel.svg"
              limit={limitsByIncome.TRANSPORT}
              limitOfTotal={limits.TRANSPORT}
              moneySpent={expenses.TRANSPORT}
            />
            <ExpensesCategoriesItems
              title="Higiene"
              imgPath="/expenses/shampoo.svg"
              limit={limitsByIncome.HYGIENE}
              limitOfTotal={limits.HYGIENE}
              moneySpent={expenses.HYGIENE}
            />
            <ExpensesCategoriesItems
              title="Lazer"
              imgPath="/expenses/lazer.svg"
              limit={limitsByIncome.LEISURE}
              limitOfTotal={limits.LEISURE}
              moneySpent={expenses.LEISURE}
            />
          </Flex>

          <Flex
            padding="22px 18px"
            borderRadius="16px"
            backgroundColor="var(--background-cards)"
            boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.07)"
            gap="8px"
            cursor="pointer"
            onClick={() => push('/profile-form')}
          >
            <Flex flexDir="column" gap="8px">
              <Text
                fontWeight="700"
                fontSize="16px"
                color="var(--tipograthy-1)"
              >
                {consumerProfileLabel(user?.['consumer-profile'])}
              </Text>
              <Text
                fontWeight="400"
                fontSize="14px"
                color="var(--tipograthy-1)"
                fontStyle="italic"
              >
                {consumerProfileDescription(user?.['consumer-profile'])}
              </Text>
            </Flex>

            <ChevronRight
              color="var(--tipograthy-1)"
              width="80px"
              height="80px"
            />
          </Flex>
        </Flex>
      </main>
    </>
  )
}

export default Expenses
