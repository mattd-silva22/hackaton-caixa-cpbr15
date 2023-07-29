import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import CaixinhasCard from "../CaixinhasCards";

export default function Caixinhas() {
  return (
    <Flex flexDir={"column"} gap={"24px"}>
      <Text color={"#fff"} fontWeight={"bold"}>
        Suas Caixinhas
      </Text>
      <Flex className="caixinhas-grid" gap={"16px"} overflowX={"scroll"}>
        <CaixinhasCard value={100} title="Reserva de Emergencia" />

        <CaixinhasCard value={100} title="Reserva de Emergencia" />

        <CaixinhasCard value={100} title="Reserva de Emergencia" />
      </Flex>
    </Flex>
  );
}
