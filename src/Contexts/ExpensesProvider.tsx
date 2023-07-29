import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useAuth } from './AuthProvider'
import axios from 'axios'

type ExpensesData = {
  [key in CategoriesEnum]: number
}

type ExpensesContextType = {
  userExpenses: UserExpenses | undefined
  limitsByIncome: ExpensesData
  expenses: ExpensesData
  getFinanceHealth: () => number
}

type ExpensesContextProviderProps = {
  children: ReactNode
}

export const ExpensesContext = createContext({} as ExpensesContextType)

const limits = {
  FOOD: 20,
  TRANSPORT: 20,
  HEALTH: 20,
  HYGIEANE: 20,
  LEISURE: 20,
}

export function ExpensesContextProvider(props: ExpensesContextProviderProps) {
  const { user } = useAuth()
  const [userExpenses, setUserExpenses] = useState<UserExpenses | undefined>()

  useEffect(() => {
    async function getUserExpenses(id: string) {
      const response: UserExpenses = await axios.get(
        `${process.env.APIT_PATH ?? ''}/api/expenses?id=${id}`,
      )

      setUserExpenses(response)
    }

    if (user) {
      getUserExpenses(user.id)
    }
  }, [user])

  const income = useMemo(() => {
    if (!userExpenses) {
      return 0
    }

    return userExpenses.incomes.reduce((sum, item) => item.value + sum, 0)
  }, [userExpenses])

  const expenses = useMemo(() => {
    const expenses = {
      FOOD: 0,
      TRANSPORT: 0,
      HEALTH: 0,
      HYGIEANE: 0,
      LEISURE: 0,
    }

    if (!userExpenses) {
      return expenses
    }

    userExpenses.expenses.forEach((item) => {
      if (typeof expenses[item.category] !== 'undefined') {
        expenses[item.category] += item.value
      }
    })

    return expenses
  }, [userExpenses])

  const limitsByIncome = useMemo(() => {
    const limitsWithValues = {
      FOOD: expenses.FOOD * limits.FOOD,
      TRANSPORT: expenses.TRANSPORT * limits.TRANSPORT,
      HEALTH: expenses.HEALTH * limits.HEALTH,
      HYGIEANE: expenses.HYGIEANE * limits.HYGIEANE,
      LEISURE: expenses.LEISURE * limits.LEISURE,
    }

    return limitsWithValues
  }, [])

  function getFinanceHealth() {
    if (!userExpenses || !userExpenses.expenses.length) {
      return 100
    }

    const health = Object.keys(limits).reduce((health, key: string) => {
      if (!income) {
        return 0
      }

      if (expenses[key] > (income * limits[key]) / 100) {
        return health - limits[key]
      }

      return health
    }, 100)

    return health
  }

  return (
    <ExpensesContext.Provider
      value={{
        userExpenses,
        limitsByIncome,
        getFinanceHealth,
        expenses,
      }}
    >
      {props.children}
    </ExpensesContext.Provider>
  )
}

export function useExpensesContext() {
  const context = useContext(ExpensesContext)

  return context
}
