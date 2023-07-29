import ExpensesCategoriesItems from '@/components/ExpensesCategoriesItems'
import ExpensesHealthCard from '@/components/ExpensesHealthCard'
import HeadBackButton from '@/components/HeadBackButton'
import { Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts'

const Expenses: React.FC = () => {
  const { back } = useRouter()

  const exampleData = [
    {
      name: 'alimentacao',
      value: 10,
      color: '#153131',
    },
    {
      name: 'saude',
      value: 30,
      color: '#532534',
    },
  ]

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
            <ResponsiveContainer width={200} height={120}>
              <PieChart>
                <Pie
                  data={exampleData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  label
                >
                  {exampleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Flex>

          <ExpensesHealthCard healthValue={10} />

          <Flex flexDir="column" width="100%">
            <ExpensesCategoriesItems
              title="Alimentação"
              imgPath="/expenses/burguer.svg"
              limit={200}
              moneySpent={400}
            />
            <ExpensesCategoriesItems
              title="Saúde"
              imgPath="/expenses/pills.svg"
              limit={200}
              moneySpent={50}
            />
            <ExpensesCategoriesItems
              title="Transporte"
              imgPath="/expenses/fuel.svg"
              limit={800}
              moneySpent={400}
            />
            <ExpensesCategoriesItems
              title="Higiene"
              imgPath="/expenses/shampoo.svg"
              limit={200}
              moneySpent={400}
            />
            <ExpensesCategoriesItems
              title="Lazer"
              imgPath="/expenses/lazer.svg"
              limit={200}
              moneySpent={70}
            />
            <ExpensesCategoriesItems
              title="Outros"
              imgPath="/expenses/others.svg"
              limit={200}
              moneySpent={70}
            />
          </Flex>
        </Flex>
      </main>
    </>
  )
}

export default Expenses
