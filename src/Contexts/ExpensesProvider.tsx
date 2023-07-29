import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./AuthProvider";
import axios, { AxiosResponse } from "axios";
import { CategoriesEnum } from "@/interface/ConsumerProfileEnum.enum";

type ExpensesData = {
  [key in CategoriesEnum]: number;
};

type ExpensesContextType = {
  userExpenses: UserExpenses | undefined;
  limitsByIncome: ExpensesData;
  expenses: ExpensesData;
  getFinanceHealth: () => number;
  getSaldo: () => number;
  getIncome: () => number;
  getOutcome: () => number;
  limits: ExpensesData;
  registerIncome: (id: string, value: number) => Promise<void>;
  registerExpense: (
    id: string,
    value: number,
    category: CategoriesEnum
  ) => Promise<void>;
};

type ExpensesContextProviderProps = {
  children: ReactNode;
};

export const ExpensesContext = createContext({} as ExpensesContextType);

export function ExpensesContextProvider(props: ExpensesContextProviderProps) {
  const { user } = useAuth();
  const [userExpenses, setUserExpenses] = useState<UserExpenses | undefined>();

  useEffect(() => {
    async function getUserExpenses(id: string) {
      const response: AxiosResponse<UserExpenses> = await axios.get(
        `${process.env.APIT_PATH ?? ""}/api/expenses?id=${id}`
      );

      setUserExpenses(response.data);
    }

    if (user) {
      getUserExpenses(user.id);
    }
  }, [user]);

  const limits = useMemo(() => {
    switch (user?.["consumer-profile"]) {
      case "AVENTUREIRO":
        return {
          FOOD: 30,
          TRANSPORT: 25,
          HEALTH: 10,
          HYGIENE: 10,
          LEISURE: 25,
        };

      case "CONSERVADOR":
        return {
          FOOD: 20,
          TRANSPORT: 15,
          HEALTH: 25,
          HYGIENE: 20,
          LEISURE: 20,
        };

      case "EQUILIBRADO":
        return {
          FOOD: 25,
          TRANSPORT: 20,
          HEALTH: 20,
          HYGIENE: 20,
          LEISURE: 15,
        };

      case "VISIONARIO":
        return {
          FOOD: 15,
          TRANSPORT: 20,
          HEALTH: 15,
          HYGIENE: 15,
          LEISURE: 35,
        };

      default:
        return {
          FOOD: 20,
          TRANSPORT: 20,
          HEALTH: 20,
          HYGIENE: 20,
          LEISURE: 20,
        };
    }
  }, [user?.["consumer-profile"]]);

  const income = useMemo(() => {
    if (!userExpenses) {
      return 0;
    }

    return userExpenses.incomes.reduce((sum, item) => +item.value + sum, 0);
  }, [userExpenses]);

  const expenses = useMemo(() => {
    const expenses = {
      FOOD: 0,
      TRANSPORT: 0,
      HEALTH: 0,
      HYGIENE: 0,
      LEISURE: 0,
    };

    if (!userExpenses) {
      return expenses;
    }

    userExpenses.expenses.forEach((item) => {
      if (typeof expenses[item.category] !== "undefined") {
        expenses[item.category] += +item.value;
      }
    });

    return expenses;
  }, [userExpenses]);

  const limitsByIncome = useMemo(() => {
    const limitsWithValues = {
      FOOD: (income * limits.FOOD) / 100,
      TRANSPORT: (income * limits.TRANSPORT) / 100,
      HEALTH: (income * limits.HEALTH) / 100,
      HYGIENE: (income * limits.HYGIENE) / 100,
      LEISURE: (income * limits.LEISURE) / 100,
    };

    return limitsWithValues;
  }, [expenses, limits]);

  function getSaldo() {
    return (
      income - Object.values(expenses).reduce((sum, item) => item + sum, 0)
    );
  }

  function getIncome() {
    return income;
  }

  function getOutcome() {
    return Object.values(expenses).reduce((sum, item) => item + sum, 0);
  }

  function getFinanceHealth() {
    if (!userExpenses || !userExpenses.expenses.length) {
      return 100;
    }

    const health = Object.keys(limits).reduce((health, key: string) => {
      if (!income) {
        return 0;
      }

      if (expenses[key] > (income * limits[key]) / 100) {
        return health - limits[key];
      }

      return health;
    }, 100);

    return health;
  }

  async function registerIncome(id: string, income: number) {
    await axios.post(`${process.env.API_PATH ?? ""}/api/incomes`, {
      id,
      value: income,
    });

    const response: AxiosResponse<UserExpenses> = await axios.get(
      `${process.env.API_PATH ?? ""}/api/expenses?id=${id}`
    );

    setUserExpenses(response.data);
  }

  async function registerExpense(
    id: string,
    value: number,
    category: CategoriesEnum
  ) {
    await axios.post(`${process.env.API_PATH ?? ""}/api/expenses`, {
      id,
      value,
      category,
    });

    const response: AxiosResponse<UserExpenses> = await axios.get(
      `${process.env.API_PATH ?? ""}/api/expenses?id=${id}`
    );
    setUserExpenses(response.data);
  }

  return (
    <ExpensesContext.Provider
      value={{
        userExpenses,
        limitsByIncome,
        getFinanceHealth,
        expenses,
        getSaldo,
        limits,
        registerIncome,
        registerExpense,
        getIncome,
        getOutcome,
      }}
    >
      {props.children}
    </ExpensesContext.Provider>
  );
}

export function useExpensesContext() {
  const context = useContext(ExpensesContext);

  return context;
}
