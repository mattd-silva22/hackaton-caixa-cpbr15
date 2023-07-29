import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowUp } from "react-feather";

interface CaixinhasCardProps {
  value: number;
  title: string;
}
export default function CaixinhasCard(props: CaixinhasCardProps) {
  const { value, title } = props;
  return (
    <Flex
      flexDir={"column"}
      border={"1px solid #333333"}
      maxW={"175px"}
      minW="175px"
      borderRadius={"5px"}
    >
      <Flex
        className="img-area"
        h="100px"
        bgImage={
          "url(https://media.seudinheiro.com/uploads/2022/11/hand-putting-coin-piggy-bank-growth-chart.jpg) "
        }
        bgPosition={"center"}
        bgSize={"contain"}
      />
      <Flex
        className="content-area"
        flexDir={"column"}
        color="#fff"
        p="12px"
        alignItems={"flex-start"}
      >
        <Flex color="var(--success)">
          <ArrowUp size={"12px"} />
          <Text fontSize={"10px"}>R$ {value}</Text>
        </Flex>
        <Text fontSize={"12px"}>{title}</Text>
      </Flex>

      <Text color={"#fff"} p="14px">
        R$ 3.900,00
      </Text>
    </Flex>
  );
}
