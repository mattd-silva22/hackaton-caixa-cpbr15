import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowUp } from "react-feather";

interface BenefitsCardProps {
  game: string;
  title: string;
  imgUrl: string;
}
export default function BenefitsCard(props: BenefitsCardProps) {
  const { game, title, imgUrl } = props;
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
        bgImage={`url(${imgUrl})`}
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
        <Flex color="#fff" gap={"8px"}>
          <Text fontSize={"10px"}>{game}</Text>
        </Flex>
        <Text fontSize={"14px"} lineHeight="normal" minH={"40px"}>
          {title}
        </Text>

        <Flex marginTop={"20px"} minH={"20px"}>
          <Button
            colorScheme="blue"
            size="sm"
            fontSize={"10px"}
            p="10 12px"
            borderRadius={"999px"}
          >
            Resgatar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
