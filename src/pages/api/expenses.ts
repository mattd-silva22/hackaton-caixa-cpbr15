// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from './database/database.js'

const database = new Database()

type Data = {
  name: string
  email: string
}

type Error = {
  code: number
  message: string
}
const TABLE_NAME = 'user-expenses'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | Error>,
) {
  if (req.method === 'GET') {
    const { id } = req.query

    const userExpenses = database.selectOne(TABLE_NAME, {
      id,
    })

    return res.status(200).json({
      userExpenses,
    })
  }

  if (req.method === 'POST') {
    const { id, value, category } = req.body

    let userExpenses: UserExpenses[] = await database.select(TABLE_NAME, {
      id,
    })

    if (!userExpenses[0]) {
      const user = await database.selectOne('users', { id })

      if (!user) {
        throw new Error('User is not created yet')
      }

      await database.insert(TABLE_NAME, {
        id,
        expenses: [],
        incomes: [],
      })
    }

    userExpenses = await database.select(TABLE_NAME, {
      id,
    })

    const expense = {
      date: new Date(),
      value,
      category,
    }

    console.log(userExpenses[0])

    const userExpense = {
      ...userExpenses[0],
      incomes: userExpenses[0].incomes ?? [],
      expenses: userExpenses[0].expenses.concat(expense).sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateB.getTime() - dateA.getTime()
      }),
    }

    const updated = await database.update(TABLE_NAME, id, userExpense)

    return res.status(201).json({ userExpense: updated })
  }

  if (req.method === 'PATCH') {
    const code = 400

    return res.status(code).json({
      code,
      message: 'This method was not implemend.',
    })
  }

  if (req.method === 'DELETE') {
    const code = 400

    return res.status(code).json({
      code,
      message: 'This method was not implemend.',
    })
  }

  const code = 400

  return res.status(code).json({
    code,
    message: 'This method was not implemend.',
  })
}
