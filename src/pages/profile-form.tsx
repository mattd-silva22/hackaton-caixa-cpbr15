import { useAuth } from "@/Contexts/AuthProvider";
import { ConsumerProfileEnum } from "@/interface/ConsumerProfileEnum.enum";
import {
  Button,
  Flex,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ChevronLeft } from "react-feather";

enum letters {
  "a" = "a",
  "b" = "b",
  "c" = "c",
  "d" = "d",
}
const questions = [
  {
    question: "Qual é a sua atitude em relação ao dinheiro?",
    options: [
      { key: "1-a", label: "Adoro gastar e aproveitar o momento!" },
      { key: "1-b", label: "Gosto de poupar e investir de forma segura." },
      { key: "1-c", label: "Procuro um meio-termo entre gastar e poupar." },
      {
        key: "1-d",
        label: "Uso o dinheiro para investir em grandes projetos e sonhos.",
      },
    ],
  },
  {
    question: "O que você valoriza mais em um banco?",
    options: [
      { key: "2-a", label: "Facilidade e praticidade nos serviços." },
      { key: "2-b", label: "Segurança e solidez financeira." },
      { key: "2-c", label: "Opções de investimentos e taxas atrativas." },
      {
        key: "2-d",
        label: "Inovação e tecnologia avançada.",
      },
    ],
  },
  {
    question: "Como você reage a riscos financeiros?",
    options: [
      {
        key: "3-a",
        label:
          "Não me importo com riscos, adoro buscar oportunidades de alto retorno.",
      },
      {
        key: "3-b",
        label:
          "Evito riscos, prefiro investimentos de baixo risco mesmo que rendam menos.",
      },
      {
        key: "3-c",
        label:
          "Aceito riscos calculados, desde que as perspectivas de retorno sejam boas.",
      },
      {
        key: "3-d",
        label:
          "Encaro riscos com cautela, mas estou disposto(a) a tentar novas estratégias.",
      },
    ],
  },
  {
    question: "Qual é o seu objetivo financeiro principal?",
    options: [
      { key: "4-a", label: "Viver o presente, aproveitar a vida ao máximo." },
      {
        key: "4-b",
        label: "Construir uma base financeira sólida para o futuro.",
      },
      {
        key: "4-c",
        label: "Fazer o dinheiro render e alcançar independência financeira.",
      },
      {
        key: "4-d",
        label: "Realizar grandes projetos e alcançar metas ousadas.",
      },
    ],
  },
  {
    question: "Qual é o seu principal objetivo ao poupar/investir dinheiro?",
    options: [
      {
        key: "5-a",
        label:
          "Realizar sonhos de curto prazo, como viagens ou compras específicas.",
      },
      {
        key: "5-b",
        label:
          "Garantir estabilidade financeira para enfrentar imprevistos e emergências.",
      },
      {
        key: "5-c",
        label:
          " Aumentar o patrimônio e obter liberdade financeira no longo prazo.",
      },
      {
        key: "5-d",
        label:
          "Conquistar uma posição de destaque e influência através dos seus investimentos.",
      },
    ],
  },
];

const ProfileForm: React.FC = () => {
  const { user, patchUser } = useAuth();
  const { back, push } = useRouter();

  if (!user) {
    push("/login");
  }

  const [results, setResults] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
  });

  const [hasAnsweredAll, setHasAnsweredAll] = useState<string[]>([]);

  function handleSelectRadio(key: string) {
    const [number, letter] = key.split("-");

    if (!hasAnsweredAll.find((item) => item === number)) {
      setHasAnsweredAll((state) => state.concat([number]));
    }

    setResults((state) => ({
      ...state,
      [letter]: state[letter as letters] + 1,
    }));
  }

  async function handleComplete() {
    const letter = Object.entries(results).reduce(
      (lett, item) => (item[1] > lett[1] ? item : lett),
      ["a", 0]
    )[0];

    const perfil =
      letter === "a"
        ? ConsumerProfileEnum.AVENTUREIRO
        : letter === "b"
        ? ConsumerProfileEnum.CONSERVADOR
        : letter === "c"
        ? ConsumerProfileEnum.EQUILIBRADO
        : ConsumerProfileEnum.VISIONARIO;

    try {
      await patchUser(
        `${process.env.API_PATH ?? ""}/api/users?id=${user?.id}`,
        {
          ...user,
          "consumer-profile": perfil,
        }
      );

      push("/expenses");
    } catch (error) {
      alert("Não foi possivel completar");
    }
  }

  return (
    <Flex
      flexDir="column"
      gap="24px"
      padding="36px"
      backgroundColor="var(--background-main)"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <ChevronLeft onClick={() => back()} color="var(--tipograthy-1)" />
        <Text fontWeight="700" fontSize="20px" color="var(--tipograthy-1)">
          Despesas
        </Text>
        <Flex />
      </Flex>

      <Flex
        padding="22px 18px"
        borderRadius="16px"
        backgroundColor="var(--background-cards)"
        boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.07)"
        gap="8px"
        flexDir="column"
      >
        <Text fontWeight="700" fontSize="16px" color="var(--tipograthy-1)">
          Faça uma projeção financeira
        </Text>
        <Text
          fontWeight="400"
          fontSize="14px"
          color="var(--tipograthy-1)"
          fontStyle="italic"
        >
          Faremos uma análise baseada no seu uso
        </Text>
      </Flex>

      <form>
        {questions.map((item) => {
          return (
            <Flex
              flexDir="column"
              gap="8px"
              mb="16px"
              borderTop="1px solid var(--divider)"
              padding="18px 0px"
            >
              <FormLabel color="var(--tipograthy-1)">{item.question}</FormLabel>

              <RadioGroup onChange={handleSelectRadio}>
                <Stack spacing={5} direction="column">
                  {item.options.map((option) => (
                    <Radio
                      colorScheme="var(--secondary)"
                      key={option.key}
                      value={option.key}
                    >
                      <Text
                        fontWeight="500"
                        fontSize="16px"
                        color="var(--tipograthy-1)"
                      >
                        {option.label}
                      </Text>
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Flex>
          );
        })}

        <Button
          onClick={() => handleComplete()}
          mt="24px"
          width="100%"
          bg="var(--secondary)"
          color="white"
          size="lg"
          isDisabled={hasAnsweredAll.length < 5}
        >
          Descobrir perfil
        </Button>
      </form>
    </Flex>
  );
};

export default ProfileForm;
