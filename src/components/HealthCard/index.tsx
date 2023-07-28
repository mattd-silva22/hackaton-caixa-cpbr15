import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Heart } from '@phosphor-icons/react'

interface HealthCardProps {
  healthValue: number
}

const HealthCard: React.FC<HealthCardProps> = ({ healthValue }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      alignSelf="stretch"
      padding="1px"
      paddingLeft="24px"
      borderRadius="10px"
    >
      <Flex gap="8px">
        <Heart color="var(--red)" width="24px" height="24px" />
        <Text fontWeight="700" fontSize="16px">
          Saúde Financeira
        </Text>
      </Flex>
      <Flex
        height="100%"
        color="var(--white)"
        fontWeight="700"
        fontSize="24px"
        background="var(--red)"
        borderTopRightRadius="10px"
        borderBottomRightRadius="10px"
        padding="6px 12px"
      >
        {healthValue}%
      </Flex>
    </Flex>
  )
}

export default HealthCard
