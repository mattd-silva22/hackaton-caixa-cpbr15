// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from './database/database.js'
import { compare } from 'bcrypt'

// let database: Database

// import('./database/db.json').then((data) => {
//   database = new Database(JSON.stringify(data))
// })
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

    const users: User[] = database.select('users', {
      email,
    })

    console.log(users)
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

    const { email: userEmail, name, id } = userExists

    return res.status(200).json({ name, email: userEmail, id })
  }

  const code = 400

  return res.status(code).json({
    code,
    message: 'This method was not implemend.',
  })
}
