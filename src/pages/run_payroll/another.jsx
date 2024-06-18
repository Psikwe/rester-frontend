import React from "react";
import { Spreadsheet } from "react-spreadsheet";
import { GetTaxReport } from "../../core/services/report.service";

const MySpreadsheet = () => {
  const entity_id = localStorage.getItem("entity_id");
  const [report, setReport] = React.useState([]);
  const columnLabels = ["Flavour", "Food"];
  const rowLabels = ["Item 1", "Item 2"];
  const data = [
    [{ values: "asdfadf" }, { basic_salary: "0.00" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ];
  let start_date = "2024-06-05";
  let end_date = "2024-06-06";
  React.useEffect(() => {
    GetTaxReport(entity_id, start_date, end_date)
      .then((response) => {
        console.log("oh: ", response?.data.entries);
        let result = [response.data.entries];
        setReport(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <Spreadsheet data={data} />;
};

export default MySpreadsheet;
