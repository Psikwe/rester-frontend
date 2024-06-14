import { getAxios } from "../utilities";

export const CreateIncomeTypeForm = async (payload) => {
  return await getAxios().post(
    `https://rester-82c60dc37022.herokuapp.com/create_income_type`,
    payload
  );
};

export const GetIncomeTypes = async (eneity_id) => {
  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/get_income_types/${eneity_id}`
  );
};
