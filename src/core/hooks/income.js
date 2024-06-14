import { useQuery } from "@tanstack/react-query";
import { GetIncomeTypes } from "../services/income.service";

export const useIncomeType = (entity_id) => {
  const incomeTypeQuery = useQuery({
    queryKey: ["incomeTypeQuery"],
    queryFn: () => GetIncomeTypes(entity_id),
    onError: (error) => {
      console.log("error: ", error);
    },
    // staleTime: Infinity,
  });
  return {
    incomeTypeQuery,
  };
};
