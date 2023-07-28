import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

// import { Container } from './styles';

interface MenuButtonProps {
  title: string
  icon: any
  onClick?: () => void
}

const MenuButton: React.FC<MenuButtonProps> = ({ title, icon, onClick }) => {
  return (
    <Flex
      w="107px"
      h="114px"
      borderRadius="10px"
      flexDir="column"
      padding="20px"
      alignItems="center"
      justifyContent="space-between"
      gap="8px"
      bgColor="white"
      onClick={onClick}
      cursor={onClick ? 'pointer' : 'default'}
    >
      <Flex
        w="38px"
        h="38px"
        alignItems="center"
        justifyContent="center"
        padding="12px"
        bgColor="#fb8300"
        borderRadius="10px"
      >
        {icon}
      </Flex>
      <Text color="#1c1939" fontSize="13px">
        {title}
      </Text>
    </Flex>
  )
}

export default MenuButton
