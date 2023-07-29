interface Caixinha {
  value: number
  date: Date
}

interface CaixinhaResponse {
  id: string
  caixinhas: Caixinha[]
}
