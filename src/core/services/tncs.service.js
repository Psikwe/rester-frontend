import axios from "axios";
import { getAxios } from "../utilities";

export const AddTermsConditions = async (data) => {
  return await getAxios().post(
    "https://rester-82c60dc37022.herokuapp.com/create_terms_and_conditions",
    data
  );
};

export const GetTermsConditions = async (data) => {
  return await axios.get(
    "https://rester-82c60dc37022.herokuapp.com/get_terms_and_conditions",
    data
  );
};
