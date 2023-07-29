import fs from 'node:fs/promises'

// const databasePath = new URL("../db.json", import.meta.url);

const databasePath = './src/pages/api/database/db.json'

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  async select(table, search) {
    try {
      const response = await fs.readFile(databasePath, 'utf8')
      this.#database = JSON.parse(response)

      const data = this.#database[table] ?? []

      if (search) {
        return data.filter((row) => {
          return Object.entries(search).some(([key, value]) => {
            return !row[key] || row[key].includes(value)
          })
        })
      }

      return data
    } catch (err) {
      this.#persist()
    }
  }

  async selectOne(table, search) {
    try {
      const response = await fs.readFile(databasePath, 'utf8')
      this.#database = JSON.parse(response)

      const data = this.#database[table] ?? []

      if (search) {
        return data.filter((row) => {
          return Object.entries(search).some(([key, value]) => {
            return !row[key] || row[key].includes(value)
          })
        })[0]
      }

      return data
    } catch (err) {
      this.#persist()
    }
  }

  async insert(table, data) {
    try {
      const response = await fs.readFile(databasePath, 'utf8')
      this.#database = JSON.parse(response)

      if (Array.isArray(this.#database[table])) {
        this.#database[table].push(data)
      } else {
        this.#database[table] = [data]
      }

      this.#persist()

      return data
    } catch (err) {
      this.#persist()
    }
  }

  async update(table, id, data) {
    try {
      const response = await fs.readFile(databasePath, 'utf8')
      this.#database = JSON.parse(response)

      const rowIndex = this.#database[table].findIndex((row) => row.id === id)

      if (rowIndex > -1) {
        const user = { id, ...this.#database[table][rowIndex], ...data }

        this.#database[table][rowIndex] = user
        this.#persist()

        return user
      }

      throw new Error('User não existe.')
    } catch (err) {
      this.#persist()
    }
  }

  async delete(table, id) {
    try {
      const response = await fs.readFile(databasePath, 'utf8')
      this.#database = JSON.parse(response)

      const rowIndex = this.#database[table].findIndex((item) => item.id === id)

      if (rowIndex > -1) {
        this.#database[table].splice(rowIndex, 1)
        this.#persist()
      }
    } catch (err) {
      this.#persist()
    }
  }
}
