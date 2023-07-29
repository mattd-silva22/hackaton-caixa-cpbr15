import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import BenefitsCard from "../BenefitsCard";

export default function Benefits() {
  return (
    <Flex flexDir={"column"} gap={"24px"}>
      <Text color={"#fff"} fontWeight={"bold"}>
        Seus Beneficios
      </Text>
      <Flex className="Benefits-grid" gap={"16px"} overflowX={"scroll"}>
        <BenefitsCard
          game={"League of Legends"}
          title="Caixa Capsule"
          imgUrl="https://files.tecnoblog.net/wp-content/uploads/2019/05/league-of-legends.jpg"
        />

        <BenefitsCard
          game={"CS:GO"}
          title="Skin AWP"
          imgUrl="https://noticias.maisesports.com.br/wp-content/uploads/2021/07/Baixar-CSGO-download.jpg"
        />

        <BenefitsCard
          game={"World of Warcraft"}
          title="World Series of Warzone Rat Pack"
          imgUrl="https://mmorpgplay.com.br/wp-content/uploads/2023/05/Fim-da-assinatura-paga-de-World-of-Warcraft-Pode-acontecer-em-breve.jpg"
        />
      </Flex>
    </Flex>
  );
}
