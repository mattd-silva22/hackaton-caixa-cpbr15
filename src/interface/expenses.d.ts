interface Expenses {
  date: Date
  category: CategoriesEnum
  value: number
}

interface Incomes {
  date: Date
  value: number
}

interface UserExpenses {
  id: string
  incomes: Incomes[]
  expenses: Expenses[]
}
