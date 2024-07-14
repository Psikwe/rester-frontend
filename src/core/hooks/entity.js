import { useQuery } from "@tanstack/react-query";
import { GetAllEntities, GetOneEntity } from "../services/entity.service";

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

export const useOneEntity = (id) => {
  const oneEntityQuery = useQuery({
    queryKey: ["oneEntityQuery"],
    queryFn: () => GetOneEntity(id),
    onError: (error) => {
      console.log("error: ", error);
    },
    // staleTime: Infinity,
  });
  return {
    oneEntityQuery,
  };
};
