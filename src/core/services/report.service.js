import { getAxios } from "../utilities";

export const GenerateTaxReport = async (entity_id, start_date, end_date) => {
  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/generate_tax_report/${entity_id}?start_date=${start_date}&end_date=${end_date}`
  );
};

export const DownloadTaxReport = async (
  entity_id,
  tax_report_id,
  start_date,
  end_date
) => {
  const params = new URLSearchParams({
    entity_id,
    tax_report_id,
    start_date,
    end_date,
  });

  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/download_tax_report?${params.toString()}`,
    {
      responseType: "blob",
    }
  );
};

export const SaveTaxReport = async (payload) => {
  return await getAxios().post(
    "https://rester-82c60dc37022.herokuapp.com/save_tax_report",
    payload
  );
};

export const GetTaxReports = async (entity_id) => {
  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/get_tax_reports/${entity_id}`
  );
};

export const GetTaxReportDetails = async (tax_report_id, entity_id) => {
  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/get_tax_report/${tax_report_id}?entity_id=${entity_id}`
  );
};
