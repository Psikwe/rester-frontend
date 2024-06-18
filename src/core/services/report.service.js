import { getAxios } from "../utilities";

export const GetTaxReport = async (entity_id, start_date, end_date) => {
  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/get_tax_report/${entity_id}?start_date=${start_date}?end_date=${end_date}`
  );
};
