import { getAxios } from "../utilities";

export const CreateIncomeTaxRate = async (payload) => {
  return await getAxios().get(
    "https://rester-82c60dc37022.herokuapp.com/create_income_tax_rate",
    payload
  );
};
