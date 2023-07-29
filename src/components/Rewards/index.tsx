import { Flex, Text, Image, Progress } from "@chakra-ui/react";
import React from "react";
import { ArrowRight } from "react-feather";

export default function Rewards() {
  const ptsLeft = 456;
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
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.375 4.375V8.67969C4.375 11.7812 6.85937 14.3516 9.96094 14.375C10.7029 14.3802 11.4386 14.2385 12.1255 13.9581C12.8125 13.6777 13.4372 13.2642 13.9637 12.7413C14.4902 12.2185 14.908 11.5967 15.1931 10.9117C15.4782 10.2266 15.625 9.49198 15.625 8.75V4.375C15.625 4.20924 15.5592 4.05027 15.4419 3.93306C15.3247 3.81585 15.1658 3.75 15 3.75H5C4.83424 3.75 4.67527 3.81585 4.55806 3.93306C4.44085 4.05027 4.375 4.20924 4.375 4.375Z"
              stroke="#2657D9"
              stroke-width="1.875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 17.5H12.5"
              stroke="#2657D9"
              stroke-width="1.875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 14.375V17.5"
              stroke="#2657D9"
              stroke-width="1.875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.4844 10H16.25C16.913 10 17.5489 9.73661 18.0178 9.26777C18.4866 8.79893 18.75 8.16304 18.75 7.5V6.25C18.75 6.08424 18.6842 5.92527 18.5669 5.80806C18.4497 5.69085 18.2908 5.625 18.125 5.625H15.625"
              stroke="#2657D9"
              stroke-width="1.875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.53125 10H3.74219C3.07915 10 2.44326 9.73661 1.97442 9.26777C1.50558 8.79893 1.24219 8.16304 1.24219 7.5V6.25C1.24219 6.08424 1.30804 5.92527 1.42525 5.80806C1.54246 5.69085 1.70143 5.625 1.86719 5.625H4.36719"
              stroke="#2657D9"
              stroke-width="1.875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <Text color={"#fff"} fontWeight={"bold"} fontSize={"16px"}>
            Recompensas
          </Text>
        </Flex>

        <ArrowRight color={"#fff"} />
      </Flex>

      <Flex flexDir={"column"} gap="24px">
        <Flex gap={"8px"}>
          <Flex
            className="icon"
            bg="#000"
            p="6px"
            border={"1px solid #333333"}
            borderRadius={"5px"}
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/LoL_icon.svg/1200px-LoL_icon.svg.png"
              w="24px"
              h="24px"
            />
          </Flex>

          <Flex className="columns" flexDir={"column"} color="#fff">
            <Text fontSize={"12px"}>Faltam {ptsLeft}pts para desbloquear</Text>
            <Text fontSize="16px">Skin no League of Legends</Text>
          </Flex>
        </Flex>
        <Progress
          hasStripe
          value={64}
          h="36px"
          borderRadius={"50px"}
          bgColor="var(--divider)"
        />
        <Flex
          w="100%"
          justifyContent={"space-between"}
          fontSize={"10px"}
          color="#fff"
        >
          <Text>0pts</Text>
          <Text>150pts</Text>
          <Text>300pts</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
