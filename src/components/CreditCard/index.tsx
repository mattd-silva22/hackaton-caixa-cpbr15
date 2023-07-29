import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowRight } from "react-feather";

export default function CreditCard() {
  return (
    <Flex
      className="credit-card"
      p={"24px"}
      border={"1px solid #333333"}
      borderRadius={"5px"}
      flexDir={"column"}
      gap={"18px"}
    >
      <Flex
        className="section-title"
        justify={"space-between"}
        alignItems={"center"}
        w="100%"
      >
        <Flex gap={"8px"} alignItems={"center"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M17.5 4.375H2.5C2.15482 4.375 1.875 4.65482 1.875 5V15C1.875 15.3452 2.15482 15.625 2.5 15.625H17.5C17.8452 15.625 18.125 15.3452 18.125 15V5C18.125 4.65482 17.8452 4.375 17.5 4.375Z"
              stroke="#2657D9"
              stroke-width="1.875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.8125 12.8125H15.3125"
              stroke="#2657D9"
              stroke-width="1.875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.4375 12.8125H9.6875"
              stroke="#2657D9"
              stroke-width="1.875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.875 7.57031H18.125"
              stroke="#2657D9"
              stroke-width="1.875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <Text color={"#fff"} fontWeight={"bold"} fontSize={"16px"}>
            Cartão de Crédito
          </Text>
        </Flex>

        <ArrowRight color={"#fff"} />
      </Flex>
    </Flex>
  );
}
