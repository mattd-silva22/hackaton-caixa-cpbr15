import fs from 'node:fs/promises'

// const databasePath = new URL("../db.json", import.meta.url);

const databasePath = './src/pages/api/database/db.json'

export class Database {
  #database = {}

  constructor(data) {
    if (!data) {
      fs.readFile(databasePath, 'utf8')
        .then((data) => {
          this.#database = JSON.parse(data)
        })
        .catch(() => {
          this.#persist()
        })
    } else {
      this.#database = JSON.parse(data)
    }
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    const data = this.#database[table] ?? []

    if (search) {
      return data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return !row[key] || row[key].includes(value)
        })
      })
    }

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex > -1) {
      const user = { id, ...data }

      this.#database[table][rowIndex] = user
      this.#persist()

      return user
    }

    throw new Error('User não existe.')
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((item) => item.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}
