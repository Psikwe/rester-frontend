import axios from "axios";
import { getAxios } from "../utilities";

export const AddPrice = async (data) => {
  return await getAxios().post(
    "https://rester-82c60dc37022.herokuapp.com/create_price",
    data
  );
};

export const GetPricing = async (data) => {
  return await axios.get(
    "https://rester-82c60dc37022.herokuapp.com/get_prices",
    data
  );
};
