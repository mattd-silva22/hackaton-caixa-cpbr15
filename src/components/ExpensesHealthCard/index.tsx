import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
} from '@chakra-ui/react'
import React from 'react'

interface ExpensesHealthCardProps {
  healthValue: number
}

const ExpensesHealthCard: React.FC<ExpensesHealthCardProps> = ({
  healthValue,
}) => {
  function getProgressBarColor(healthValue: number) {
    if (healthValue > 80) {
      return 'var(--success)'
    } else if (healthValue > 30) {
      return 'var(--warn)'
    } else {
      return 'var(--danger)'
    }
  }

  return (
    <Flex
      alignItems="stretch"
      justifyContent="space-between"
      padding="24px 20px"
      borderRadius="16px"
      boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.07)"
      backgroundColor="var(--background-cards)"
    >
      <Flex flexDir="column" gap="7px">
        <Text color="var(--tipograthy-1)" fontWeight={700} fontSize="16px">
          Saúde financeira
        </Text>
        <Text color="var(--tipograthy-2)" fontWeight={400} fontSize="14px">
          Pontuação de sua educação financeira
        </Text>
      </Flex>
      <CircularProgress
        value={healthValue}
        color={getProgressBarColor(healthValue)}
        size="80px"
        thickness="8px"
        trackColor="var(--white)"
      >
        <CircularProgressLabel color="var(--tipograthy-1)">
          {healthValue}%
        </CircularProgressLabel>
      </CircularProgress>
    </Flex>
  )
}

export default ExpensesHealthCard
