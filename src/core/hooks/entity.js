import { useQuery } from "@tanstack/react-query";
import { GetAllEntities } from "../services/entity.service";

export const useEntity = () => {
  const entityQuery = useQuery({
    queryKey: ["entityQuery"],
    queryFn: () => GetAllEntities(),
    onError: (error) => {
      console.log("error: ", error);
    },
    // staleTime: Infinity,
  });
  return {
    entityQuery,
  };
};
