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

export const GetOneIncomeType = async (income_type_id, entity_id) => {
  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/get_income_type/${income_type_id}?entity_id=${entity_id}`
  );
};

export const DeleteIncomeType = async (income_type_id, entity_id) => {
  return await getAxios().delete(
    `https://rester-82c60dc37022.herokuapp.com/delete_income_type/${income_type_id}?entity_id=${entity_id}`
  );
};

export const UpdateIncomeTypeForm = async (payload) => {
  return await getAxios().patch(
    "https://rester-82c60dc37022.herokuapp.com/update_income_type",
    payload
  );
};
