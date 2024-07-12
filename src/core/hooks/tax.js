import { useQuery } from "@tanstack/react-query";
import { GetIncomeTaxRates, GetTaxTypes } from "../services/tax.service";

export const useTaxType = () => {
  const taxTypeQuery = useQuery({
    queryKey: ["taxTypeQuery"],
    queryFn: () => GetTaxTypes(),
    onError: (error) => {
      console.log("error: ", error);
    },
    // staleTime: Infinity,
  });
  return {
    taxTypeQuery,
  };
};

export const useIncomeTaxRate = () => {
  const incomeTaxRatesQuery = useQuery({
    queryKey: ["incomeTaxRatesQuery"],
    queryFn: () => GetIncomeTaxRates(),
    onError: (error) => {
      console.log("error: ", error);
    },
    // staleTime: Infinity,
  });
  return {
    incomeTaxRatesQuery,
  };
};
