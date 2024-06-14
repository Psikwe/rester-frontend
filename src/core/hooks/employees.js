import { useQuery } from "@tanstack/react-query";
import { GetAllEmployees } from "../services/employee.service";

export const useEmployees = (entity_id) => {
  const employeesQuery = useQuery({
    queryKey: ["employeesQuery"],
    queryFn: () => GetAllEmployees(entity_id),
    onError: (error) => {
      console.log("error: ", error);
    },
    // staleTime: Infinity,
  });
  return {
    employeesQuery,
  };
};
