import database from './inicialize-firebase'
import { ref, set, get, child } from 'firebase/database'

const dbRef = ref(database)
export class Database {
  #database = {}

  constructor() {
    get(child(dbRef, 'teste/'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.#database = snapshot.val()
        } else {
          console.log('No data available')
        }
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    set(ref(database, 'teste/'), this.#database)
  }

  async select(table, search) {
    try {
      const response = await get(child(dbRef, 'teste/'))
      this.#database = response.val()

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
      const response = await get(child(dbRef, 'teste/'))
      this.#database = response.val()

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
      const response = await get(child(dbRef, 'teste/'))
      this.#database = response.val()

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
      const response = await get(child(dbRef, 'teste/'))
      this.#database = response.val()

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
      const response = await get(child(dbRef, 'teste/'))
      this.#database = response.val()

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
