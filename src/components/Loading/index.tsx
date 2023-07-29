import { Flex, Image, chakra, shouldForwardProp } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'
import React from 'react'

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
})

const Loading: React.FC = () => {
  return (
    <Flex
      backgroundColor="var(--primary)"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <ChakraBox
        animate={{
          rotate: [360, 0],
        }}
        // @ts-ignore
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        <Image
          src={'/logox.svg'}
          animation="1s ease-in-out infinite"
          width="120px"
          height="120px"
        />
      </ChakraBox>
    </Flex>
  )
}

export default Loading
