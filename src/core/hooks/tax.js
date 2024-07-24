import { useQuery } from "@tanstack/react-query";
import {
  GetIncomeTaxRates,
  GetTaxComponents,
  GetTaxRateElections,
  GetTaxTypes,
} from "../services/tax.service";

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

export const useTaxComponent = () => {
  const taxComponentQuery = useQuery({
    queryKey: ["taxComponentQuery"],
    queryFn: () => GetTaxComponents(),
    onError: (error) => {
      console.log("error: ", error);
    },
    // staleTime: Infinity,
  });
  return {
    taxComponentQuery,
  };
};

export const useTaxRateElections = (entity_id) => {
  const taxRateElectionsQuery = useQuery({
    queryKey: ["taxRateElectionsQuery"],
    queryFn: () => GetTaxRateElections(entity_id),
    onError: (error) => {
      console.log("error: ", error);
    },
    // staleTime: Infinity,
  });
  return {
    taxRateElectionsQuery,
  };
};
