import { createContext, ReactNode, useContext } from 'react'

type PersistContextType = {
  store: (key: string, payload: string | object | number) => void
  getPersistDataByKey: (key: string) => void
}

type PersistContextProviderProps = {
  children: ReactNode
}

export const PersistContext = createContext({} as PersistContextType)

export function PersistContextProvider(props: PersistContextProviderProps) {
  async function store(key: string, payload: any) {
    console.log()
  }

  async function getPersistDataByKey(key: string) {
    console.log()
  }

  return (
    <PersistContext.Provider
      value={{
        store,
        getPersistDataByKey,
      }}
    >
      {props.children}
    </PersistContext.Provider>
  )
}

export function usePersistContext() {
  const context = useContext(PersistContext)

  return context
}
