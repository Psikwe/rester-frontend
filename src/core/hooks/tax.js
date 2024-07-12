import { useQuery } from "@tanstack/react-query";
import { GetTaxTypes } from "../services/tax.service";

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
