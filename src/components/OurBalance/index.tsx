import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowRight } from "react-feather";

export default function OurBalance() {
  return (
    <>
      <Flex
        className="our-balance"
        p={"24px"}
        border={"1px solid #333333"}
        borderRadius={"5px"}
        flexDir={"column"}
        gap={"18px"}
      >
        <Flex className="section-title" justify={"space-between"} w="100%">
          <Flex gap={"8px"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16.875 15C17.7034 15 18.375 14.3284 18.375 13.5C18.375 12.6716 17.7034 12 16.875 12C16.0466 12 15.375 12.6716 15.375 13.5C15.375 14.3284 16.0466 15 16.875 15Z"
                fill="#2657D9"
              />
              <path
                d="M3.75017 6.375V18C3.75017 18.3978 3.90821 18.7794 4.18951 19.0607C4.47082 19.342 4.85235 19.5 5.25017 19.5H20.2502C20.4491 19.5 20.6399 19.421 20.7805 19.2803C20.9212 19.1397 21.0002 18.9489 21.0002 18.75V9C21.0002 8.80109 20.9212 8.61032 20.7805 8.46967C20.6399 8.32902 20.4491 8.25 20.2502 8.25H5.67205C5.17991 8.25545 4.70479 8.07002 4.34645 7.73265C3.9881 7.39528 3.77439 6.9322 3.75017 6.44063C3.74136 6.18893 3.78334 5.93804 3.87361 5.70292C3.96389 5.46781 4.1006 5.25329 4.27559 5.07217C4.45059 4.89105 4.66028 4.74704 4.89215 4.64874C5.12402 4.55043 5.37332 4.49985 5.62517 4.5H18.0002"
                stroke="#2657D9"
                stroke-width="2.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <Text color={"#fff"} fontWeight={"bold"} fontSize={"16px"}>
              Sua Conta
            </Text>
          </Flex>

          <ArrowRight color={"#fff"} />
        </Flex>

        <Flex className="balance-area" flexDir={"column"} gap={"16px"}>
          <Flex
            className="outcome"
            color="#fff"
            gap="14px"
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Flex
              className="tag"
              w="8px"
              h="8px"
              bg="#D33939"
              borderRadius={"50%"}
            />

            <Flex flexDir={"column"}>
              <Text>Gasto</Text>
              <Flex gap={"2px"}>
                <Text
                  className="balance-area"
                  fontSize={"28px"}
                  lineHeight="36px"
                  fontWeight={"bold"}
                >
                  R$
                </Text>
                <Text fontSize={"28px"} lineHeight="36px" fontWeight={"bold"}>
                  534,23
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            className="income"
            color="#fff"
            gap="14px"
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Flex
              className="tag"
              w="8px"
              h="8px"
              bg="#03C96A"
              borderRadius={"50%"}
            />

            <Flex flexDir={"column"}>
              <Text>Recebido</Text>
              <Flex gap={"2px"}>
                <Text
                  className="balance-area"
                  fontSize={"28px"}
                  lineHeight="36px"
                  fontWeight={"bold"}
                >
                  R$
                </Text>
                <Text fontSize={"28px"} lineHeight="36px" fontWeight={"bold"}>
                  534,23
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            className="bank"
            color="#fff"
            gap="14px"
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Flex
              className="tag"
              w="8px"
              h="8px"
              bg="#2657D9"
              borderRadius={"50%"}
            />

            <Flex flexDir={"column"}>
              <Text>Guardado</Text>
              <Flex gap={"2px"}>
                <Text
                  className="balance-area"
                  fontSize={"28px"}
                  lineHeight="36px"
                  fontWeight={"bold"}
                >
                  R$
                </Text>
                <Text fontSize={"28px"} lineHeight="36px" fontWeight={"bold"}>
                  534,23
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          align={"center"}
          justifyContent={"center"}
          gap={"16px"}
          borderTop={"1px solid #333333 "}
          w={"100%"}
          p="24px 0"
        >
          <Flex
            className="warning"
            bg="#000"
            p="6px"
            border={"1px solid #333333"}
            borderRadius={"5px"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M14 11.375V14.875"
                stroke="#D33939"
                stroke-width="2.625"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.4903 4.37503L2.86532 21C2.71199 21.2656 2.63113 21.5668 2.63086 21.8735C2.63059 22.1802 2.71091 22.4815 2.86377 22.7474C3.01664 23.0132 3.23668 23.2342 3.50186 23.3883C3.76703 23.5423 4.06803 23.624 4.3747 23.625H23.6247C23.9314 23.624 24.2324 23.5423 24.4975 23.3883C24.7627 23.2342 24.9828 23.0132 25.1356 22.7474C25.2885 22.4815 25.3688 22.1802 25.3685 21.8735C25.3683 21.5668 25.2874 21.2656 25.1341 21L15.5091 4.37503C15.3569 4.10911 15.1371 3.88811 14.8721 3.73441C14.607 3.5807 14.3061 3.49976 13.9997 3.49976C13.6933 3.49976 13.3923 3.5807 13.1273 3.73441C12.8622 3.88811 12.6425 4.10911 12.4903 4.37503V4.37503Z"
                stroke="#D33939"
                stroke-width="2.625"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 21C14.9665 21 15.75 20.2165 15.75 19.25C15.75 18.2835 14.9665 17.5 14 17.5C13.0335 17.5 12.25 18.2835 12.25 19.25C12.25 20.2165 13.0335 21 14 21Z"
                fill="#D33939"
              />
            </svg>
          </Flex>
          <Text color={"#fff"} fontSize={"12px"}>
            Você gastou mais de R$2,042 com Comida. <br />
            Isso foi mais que 25% do mês anterior
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
