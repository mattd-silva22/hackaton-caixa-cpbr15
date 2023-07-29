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
const TABLE_NAME = 'caixinha'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | Error>,
) {
  if (req.method === 'GET') {
    const { id } = req.query

    const caixinha: CaixinhaResponse = await database.selectOne(TABLE_NAME, {
      id,
    })

    if (!caixinha) {
      const newUserExpenses = await database.insert(TABLE_NAME, {
        id,
        incomes: [],
        expenses: [],
      })
      return res.status(201).json(newUserExpenses)
    }

    return res.status(200).json(caixinha)
  }

  if (req.method === 'POST') {
    const { id, value } = req.body

    let caixinhas: CaixinhaResponse = await database.selectOne(TABLE_NAME, {
      id,
    })

    if (!caixinhas) {
      const user = await database.selectOne('users', { id })

      if (!user) {
        throw new Error('User is not created yet')
      }

      await database.insert(TABLE_NAME, {
        id,
        caixinhas: [],
      })
    }

    caixinhas = await database.select(TABLE_NAME, {
      id,
    })

    const novaCaxinha: Caixinha = {
      value,
      date: new Date(),
    }

    const caixinha = {
      ...caixinhas,
      caixinhas: caixinhas.caixinhas.concat([novaCaxinha]).sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateB.getTime() - dateA.getTime()
      }),
    }

    const updated = await database.update(TABLE_NAME, id, caixinha)

    return res.status(201).json(updated)
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
