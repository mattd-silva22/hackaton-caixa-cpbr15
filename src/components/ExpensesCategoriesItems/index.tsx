import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

interface ExpensesCategoriesItemsProps {
  moneySpent: number
  limit: number
  numberOfTransactions?: number
  title: string
  imgPath: string
}

const ExpensesCategoriesItems: React.FC<ExpensesCategoriesItemsProps> = ({
  title,
  limit,
  moneySpent,
  numberOfTransactions = 0,
  imgPath,
}) => {
  const isPositive = limit - moneySpent >= 0

  const value = isPositive
    ? (moneySpent / limit) * 100
    : (((limit - moneySpent) * -1) / limit) * 100

  function formatValueToText() {
    return isPositive
      ? `R$${moneySpent}/${limit}`
      : `R$ ${(limit - moneySpent).toFixed(2)}`
  }

  function getColorBasedOnSpent() {
    return isPositive
      ? {
          background: 'var(--divider)',
          barColor: 'var(--primary)',
        }
      : {
          background: 'var(--danger)',
          barColor: 'var(--warn)',
        }
  }

  return (
    <Flex
      gap="16px"
      alignSelf="stretch"
      alignItems="center"
      borderBottom="1px solid var(--divider)"
      padding="16px 0px"
    >
      <Image src={imgPath} w="40px" h="40px" />

      <Flex flexDir="column" gap="8px" flexGrow="1">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex flexDir="column">
            <Text color="var(--tipograthy-1)" fontWeight={700} fontSize="16px">
              {title}
            </Text>
            <Text color="var(--tipograthy-2)" fontWeight={400} fontSize="12px">
              {numberOfTransactions} transações
            </Text>
          </Flex>

          <Flex>
            <Text
              color={isPositive ? 'var(--tipograthy-1)' : 'var(--danger)'}
              fontWeight={700}
              fontSize="16px"
            >
              {formatValueToText()}
            </Text>
          </Flex>
        </Flex>

        <Flex
          borderRadius="999px"
          width="100%"
          height="6px"
          backgroundColor={getColorBasedOnSpent().background}
          position="relative"
        >
          <Flex
            borderRadius="999px"
            height="6px"
            width={`${value}%`}
            position="absolute"
            top="0px"
            left="0px"
            backgroundColor={getColorBasedOnSpent().barColor}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(ExpensesCategoriesItems)
