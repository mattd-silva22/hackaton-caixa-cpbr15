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

const TABLE_NAME = 'incomes'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | Error>,
) {
  if (req.method === 'GET') {
    const code = 400

    return res.status(code).json({
      code,
      message: 'This method was not implemend.',
    })
  }

  if (req.method === 'POST') {
    const { id, value } = req.body

    let userExpenses: UserExpenses[] = database.select(TABLE_NAME, {
      id,
    })

    if (!userExpenses[0]) {
      database.insert(TABLE_NAME, {
        id,
        expenses: [],
        incomes: [],
      })
    }

    userExpenses = database.select(TABLE_NAME, {
      id,
    })

    const income = {
      date: new Date(),
      value,
    }

    const userExpense = {
      ...userExpenses[0],
      incomes: userExpenses[0].incomes
        .concat(income)
        .sort((a, b) => b.date.getTime() - a.date.getTime()),
    }

    database.insert(TABLE_NAME, userExpense)

    return res.status(201).json({ userExpense })
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