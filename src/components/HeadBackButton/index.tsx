import { Flex, Link } from '@chakra-ui/react'
import { CaretLeft } from '@phosphor-icons/react'
import React from 'react'

// import { Container } from './styles';

interface HeadBackButtonProps {
  color?: string
  onClick: () => void
}

const HeadBackButton: React.FC<HeadBackButtonProps> = ({
  color = 'var(--tipograthy-1)',
  onClick,
}) => {
  return (
    <Flex gap="8px" alignSelf="stretch">
      <Link
        onClick={onClick}
        color={color}
        fontWeight={700}
        fontSize="14px"
        display="flex"
        gap="8px"
      >
        <CaretLeft color={color} width="20px" height="20px" />
        Voltar
      </Link>
    </Flex>
  )
}

export default HeadBackButton
