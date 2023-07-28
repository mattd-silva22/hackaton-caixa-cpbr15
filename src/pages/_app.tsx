import { AuthContextProvider } from '@/Contexts/AuthProvider'
import { PersistContextProvider } from '@/Contexts/PersistProvider'
import Loading from '@/components/Loading'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!!window && typeof window !== 'undefined') {
      setIsLoading(false)
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <PersistContextProvider>
          <ChakraProvider>
            <AuthContextProvider>
              <Component {...pageProps} />
            </AuthContextProvider>
          </ChakraProvider>
        </PersistContextProvider>
      )}
    </>
  )
}
