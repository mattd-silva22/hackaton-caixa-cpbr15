// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from './database/database.js'
import { randomUUID } from 'node:crypto'
import { hash } from 'bcrypt'

const database = new Database()

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
    const users: User[] = await database.select('users', req.query)

    const filteredUsers = users.map((user) => ({
      ...user,
      password_hash: undefined,
    }))

    return res.status(200).json({
      users: filteredUsers,
    })
  }

  if (req.method === 'POST') {
    const { email, name, password } = req.body

    const users = database.select('users', {
      email,
    })

    if (users[0]) {
      const code = 403

      return res.status(code).json({ code, message: 'User already exists' })
    }

    const passwordHash = await hash(password, 6)

    const user = {
      id: randomUUID(),
      name,
      email,
      password_hash: passwordHash,
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
