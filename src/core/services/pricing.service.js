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

export const AddSubscription = async (data) => {
  return await getAxios().post(
    "https://rester-82c60dc37022.herokuapp.com/create_subscription",
    data
  );
};

export const GetSubscriptions = async (entity_id) => {
  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/get_subscriptions/${entity_id}`
  );
};

export const CheckPaymentStatus = async (transaction_id) => {
  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/check_payment_status/` +
      transaction_id
  );
};

export const GetBillingHistory = async (entity_id) => {
  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/get_billing_history/` +
      entity_id,
    data
  );
};
