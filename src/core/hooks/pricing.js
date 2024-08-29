import { useQuery } from "@tanstack/react-query";
import { GetPrice, GetPricing } from "../services/pricing.service";

export const usePricing = () => {
  const pricingQuery = useQuery({
    queryKey: ["pricingQuery"],
    queryFn: () => GetPricing(),
    onError: (error) => {
      console.log("error: ", error);
    },
    // staleTime: Infinity,
  });
  return {
    pricingQuery,
  };
};
