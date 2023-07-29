// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from './database/database.js'
import { compare } from 'bcrypt'

const database = new Database()

type Error = {
  code: number
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | Error>,
) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    const users: User[] = await database.select('users', {
      email,
    })

    const userExists = users[0]

    if (!userExists) {
      return res
        .status(404)
        .json({ code: 404, message: 'Email not registered.' })
    }

    const isPasswordValid = await compare(password, userExists.password_hash)

    if (!isPasswordValid) {
      return res.status(401).json({ code: 401, message: 'Wrong password.' })
    }

    return res.status(200).json({ ...userExists, password_hash: undefined })
  }

  const code = 400

  return res.status(code).json({
    code,
    message: 'This method was not implemend.',
  })
}
