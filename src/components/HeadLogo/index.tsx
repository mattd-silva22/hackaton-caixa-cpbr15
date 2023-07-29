import { Flex, Image } from '@chakra-ui/react'
import React from 'react'

// import { Container } from './styles';

const HeadLogo: React.FC = () => {
  return (
    <Flex alignSelf="flex-start">
      <Image src="/head-logo.svg" w="88px" />
    </Flex>
  )
}

export default HeadLogo
