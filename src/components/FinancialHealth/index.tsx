import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { ChevronRight, Heart } from 'react-feather'

interface FinancialHealthProps {
  onClick: () => void
  value: number
}

export default function FinancialHealth({
  onClick,
  value,
}: FinancialHealthProps) {
  return (
    <Flex
      className="saude-financeira"
      align={'center'}
      justifyContent={'space-between'}
      border={'1px solid #333333'}
      borderRadius={'5px'}
      bgColor="#110404"
      onClick={onClick}
      cursor="pointer"
    >
      <Flex gap={'8px'} justify={'flex-start'} p="0 18px">
        <Heart size={'24px'} color="#D33939" />
        <Text color={'#FFF'} fontWeight={'bold'}>
          Saúde Financeira
        </Text>
      </Flex>

      <Text
        color={'#fff'}
        fontWeight={'bold'}
        p="14px 20px"
        fontSize={'24px'}
        bg="#D33939"
        borderRadius={' 0 5px 5px 0 '}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="8px"
      >
        {value}%
        <ChevronRight width="26px" height="26px" color="white" />
      </Text>
    </Flex>
  )
}
