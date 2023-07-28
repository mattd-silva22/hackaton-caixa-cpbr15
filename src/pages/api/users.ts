// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from './database/database.js'
import { randomUUID } from 'node:crypto'

let database: Database

import('./database/db.json').then((data) => {
  database = new Database(JSON.stringify(data))
})

type Data = {
  name: string
  email: string
}

type Error = {
  code: number
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | Error>,
) {
  if (req.method === 'GET') {
    const user = await database.select('users', req.query)

    return res.status(200).json(user)
  }

  if (req.method === 'POST') {
    const { email, name } = req.body

    const userExists = database.select('users', {
      email,
    })

    if (userExists) {
      const code = 403

      return res.status(code).json({ code, message: 'User already exists' })
    }

    const user = {
      id: randomUUID(),
      name,
      email,
    }

    database.insert('users', user)

    return res.status(201).json({ name, email })
  }

  if (req.method === 'PATCH') {
    console.log(typeof req.body)
    return res.status(201).json({ name: 'John Doe' })
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
