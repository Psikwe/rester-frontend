import { getAxios } from "../utilities";

export const CreateIncomeTaxRate = async (payload) => {
  return await getAxios().post(
    "https://rester-82c60dc37022.herokuapp.com/create_income_tax_rate",
    payload
  );
};

export const AddTaxType = async (payload) => {
  return await getAxios().post(
    "https://rester-82c60dc37022.herokuapp.com/create_tax_type",
    payload
  );
};

export const GetTaxTypes = async (payload) => {
  return await getAxios().get(
    "https://rester-82c60dc37022.herokuapp.com/get_tax_types",
    payload
  );
};

export const DeleteTaxType = async (tax_type_id) => {
  return await getAxios().delete(
    `https://rester-82c60dc37022.herokuapp.com/delete_tax_type/${tax_type_id}`
  );
};

// export const SaveTaxReport = async (payload) => {
//     return await getAxios().post(
//       "https://rester-82c60dc37022.herokuapp.com/save_tax_report",
//       payload
//     );
//   };
