import React from "react";
import {
  DownloadTaxReport,
  GetTaxReportDetails,
  GetTaxReports,
} from "../../core/services/report.service";

import moment from "moment";
import { showToast } from "../../core/hooks/alert";
import DataGrid from "react-data-grid";
import { CgPlayListSearch } from "react-icons/cg";
import { useParams } from "react-router-dom";

const TaxReportDetails = () => {
  const entity_id = localStorage.getItem("entity_id");
  const { id } = useParams();
  const [report, setReport] = React.useState([]);
  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const [selectedEndDate, setSelectedEndDate] = React.useState(null);

  const columns = [
    { key: "serial_no", name: "Serial No." },
    { key: "tin", name: "Tin" },
    { key: "name_of_employee", name: "Name Of Employee" },
    { key: "position", name: "Position" },
    { key: "non_resident", name: "Non Resident" },
    { key: "basic_salary", name: "Basic Salary" },
    { key: "secondary_employment", name: "Secondary Employment" },
    { key: "social_security_fund", name: "Social Security Fund" },
    { key: "third_tier", name: "Third Tier" },
    { key: "cash_allowances", name: "Cash Allowances" },
    { key: "bonus_income", name: "Bonus Income" },
    { key: "final_tax_on_bonus", name: "Final Tax On Bonus" },
    { key: "excess_bonus", name: "Excess Bonus" },
    { key: "total_cash_emolument", name: "Total Cash Employment" },
    { key: "accomodation_element", name: "Accomodation Element" },
    { key: "vehicle_element", name: "Vehicle Element" },
    { key: "non_cash_benefit", name: "Non Cash Benefit" },
    { key: "total_assessable_income", name: "Total Assemble Income" },
    { key: "tax_deductible", name: "Tax Deductible" },
    { key: "total_reliefs", name: "Total Reliefs" },
    { key: "chargeable_income", name: "Chargeable Income" },
    { key: "deductible_reliefs", name: "Deductible Reliefs" },
    { key: "overtime_income", name: "Overtime Income" },
    { key: "overtime_tax", name: "Overtime Tax" },
    { key: "total_tax_payable_to_gra", name: "Total Tax Payable To GRA" },
    { key: "severance_pay_paid", name: "Serverance Pay Paid" },
    { key: "remarks", name: "Remarks" },
  ];

  React.useEffect(() => {
    GetTaxReportDetails(id, entity_id)
      .then((response) => {
        let result = response.data.entries;
        setSelectedStartDate(response.data.tax_report.start_date);
        setSelectedEndDate(response.data.tax_report.end_date);
        console.log("ohfff: ", response.data.tax_report);
        setReport(response.data.tax_report.entries);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const download = () => {
    const formattedStartDate = moment(selectedStartDate).format("YYYY-MM-DD");
    const formattedEndDate = moment(selectedEndDate).format("YYYY-MM-DD");

    DownloadTaxReport(entity_id, id, formattedStartDate, formattedEndDate)
      .then((response) => {
        if (
          response.headers["content-type"] === "application/pdf" ||
          response.headers["content-type"] ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          const contentDisposition = response.headers["content-disposition"];
          const fileName = contentDisposition
            ? contentDisposition.split("filename=")[1]
            : "report.pdf";

          const blob = new Blob([response.data], { type: response.data.type });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName); // Use the correct file name
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } else {
          console.error(
            "Invalid file type received:",
            response.headers["content-type"]
          );
        }
      })
      .catch((error) => {
        console.log("Error downloading the file:", error);
        showToast(error.response.data.error, false);
      });
  };

  return (
    <>
      <div className="overflow-y-hidden">
        <button
          onClick={download}
          className="w-1/6 py-3 mb-3 text-sm text-white bg-blue-500 rounded-full mobile:w-full"
        >
          Download Payroll
        </button>
        {/* <Spreadsheet data={extendedData} /> */}

        <DataGrid
          className="text-sm rdg-light grid-container"
          columns={columns}
          rows={report || []}
          rowHeight={50}
        />
      </div>
    </>
  );
};

export default TaxReportDetails;
