import { getAxios } from "../utilities";

export const CreateIncomeTaxRate = async (payload) => {
  return await getAxios().post(
    "https://rester-82c60dc37022.herokuapp.com/create_income_tax_rate",
    payload
  );
};

export const CreateTaxRateElection = async (payload) => {
  return await getAxios().post(
    "https://rester-82c60dc37022.herokuapp.com/create_tax_rate_election",
    payload
  );
};

export const GetTaxRateElections = async () => {
  return await getAxios().get(
    "https://rester-82c60dc37022.herokuapp.com/get_tax_rate_elections"
  );
};

export const DeleteTaxRateElection = async (tax_election_id) => {
  return await getAxios().delete(
    `https://rester-82c60dc37022.herokuapp.com/delete_tax_rate_election/${tax_election_id}`
  );
};

export const AddTaxType = async (payload) => {
  return await getAxios().post(
    "https://rester-82c60dc37022.herokuapp.com/create_tax_type",
    payload
  );
};

export const GetTaxTypes = async () => {
  return await getAxios().get(
    "https://rester-82c60dc37022.herokuapp.com/get_tax_types"
  );
};

export const GetIncomeTaxRates = async () => {
  return await getAxios().get(
    "https://rester-82c60dc37022.herokuapp.com/get_income_tax_rates"
  );
};

export const DeleteTaxType = async (tax_type_id) => {
  return await getAxios().delete(
    `https://rester-82c60dc37022.herokuapp.com/delete_tax_type/${tax_type_id}`
  );
};

export const DeleteIncomeTaxRate = async (tax_type_id) => {
  return await getAxios().delete(
    `https://rester-82c60dc37022.herokuapp.com/delete_income_tax_rate/${tax_type_id}`
  );
};

export const UpdateIncomeTaxRateForm = async (payload) => {
  return await getAxios().patch(
    "https://rester-82c60dc37022.herokuapp.com/update_income_tax_rate",
    payload
  );
};

export const GetOneIncomeTaxRate = async (income_tax_rate_id) => {
  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/get_income_tax_rate/${income_tax_rate_id}`
  );
};

export const AddTaxComponent = async (payload) => {
  return await getAxios().post(
    "https://rester-82c60dc37022.herokuapp.com/create_tax_component",
    payload
  );
};

export const GetTaxComponents = async () => {
  return await getAxios().get(
    "https://rester-82c60dc37022.herokuapp.com/get_tax_components"
  );
};

export const DeleteTaxComponent = async (tax_component_id) => {
  return await getAxios().delete(
    `https://rester-82c60dc37022.herokuapp.com/delete_tax_component/${tax_component_id}`
  );
};

export const UpdateTaxType = async (payload) => {
  return await getAxios().patch(
    "https://rester-82c60dc37022.herokuapp.com/update_tax_type",
    payload
  );
};

export const UpdateTaxComponent = async (payload) => {
  return await getAxios().patch(
    "https://rester-82c60dc37022.herokuapp.com/update_tax_component",
    payload
  );
};

// export const SaveTaxReport = async (payload) => {
//     return await getAxios().post(
//       "https://rester-82c60dc37022.herokuapp.com/save_tax_report",
//       payload
//     );
//   };
