import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import axios, { AxiosResponse } from 'axios'

type AuthContextType = {
  user: User | null
  signIn: (payload: SignInCredentials) => void
  signUp: (payload: SignUpCredentials) => void
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({
  user: null,
} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const signIn = async ({ email, password }: SignInCredentials) => {
    const response: AxiosResponse<User> = await axios.post(
      `${process.env.API_PATH ?? ''}api/authenticate`,
      {
        email,
        password,
      },
    )

    setUser(response.data)
  }

  const signUp = async ({ email, password, name }: SignUpCredentials) => {
    const response: AxiosResponse<User> = await axios.post(
      `${process.env.API_PATH ?? ''}api/users`,
      {
        email,
        name,
        password,
      },
    )

    setUser(response.data)
  }

  return (
    <AuthContext.Provider
      value={{
        signUp,
        user,
        signIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
