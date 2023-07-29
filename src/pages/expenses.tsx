import { useExpensesContext } from '@/Contexts/ExpensesProvider'
import ExpensesCategoriesItems from '@/components/ExpensesCategoriesItems'
import ExpensesHealthCard from '@/components/ExpensesHealthCard'
import HeadBackButton from '@/components/HeadBackButton'
import { Button, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts'

const Expenses: React.FC = () => {
  const { back, push } = useRouter()
  const { expenses, getFinanceHealth, limitsByIncome } = useExpensesContext()

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
        value: expenses.HYGIEANE,
        name: 'HYGIEANE',
        color: '#43dd46',
      },
      {
        value: expenses.LEISURE,
        name: 'LEISURE',
        color: '#43dd46',
      },
    ]
  }, [expenses])

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
              moneySpent={expenses.FOOD}
            />
            <ExpensesCategoriesItems
              title="Saúde"
              imgPath="/expenses/pills.svg"
              limit={limitsByIncome.HEALTH}
              moneySpent={expenses.HEALTH}
            />
            <ExpensesCategoriesItems
              title="Transporte"
              imgPath="/expenses/fuel.svg"
              limit={limitsByIncome.TRANSPORT}
              moneySpent={expenses.TRANSPORT}
            />
            <ExpensesCategoriesItems
              title="Higiene"
              imgPath="/expenses/shampoo.svg"
              limit={limitsByIncome.HYGIEANE}
              moneySpent={expenses.HYGIEANE}
            />
            <ExpensesCategoriesItems
              title="Lazer"
              imgPath="/expenses/lazer.svg"
              limit={limitsByIncome.LEISURE}
              moneySpent={expenses.LEISURE}
            />
          </Flex>
        </Flex>
      </main>
    </>
  )
}

export default Expenses
