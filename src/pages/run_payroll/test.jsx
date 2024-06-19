import React from "react";
import { Spreadsheet } from "react-spreadsheet";
import { GetTaxReport } from "../../core/services/report.service";

const MySpreadsheet = () => {
  const entity_id = localStorage.getItem("entity_id");
  const [report, setReport] = React.useState([]);
  const columnLabels = ["Flavour", "Food"];
  const rowLabels = ["Item 1", "Item 2"];
  const data = [
    [{ value: "asdfadf" }, { value: "0.00" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ];
  let start_date = "2024-06-05";
  let end_date = "2024-06-06";
  const me = [
    {
      accomodation_element: "0.00",
      basic_salary: "0.00",
      bonus_income: "0.00",
      cash_allowances: "0.00",
      chargeable_income: "0.00",
      deductible_reliefs: "0.00",
      excess_bonus: "0.00",
      final_tax_on_bonus: "0.00",
      name_of_employee: "asd Kwesi asd",
      non_cash_benefit: "0.00",
      non_resident: false,
      overtime_income: "0.00",
      overtime_tax: "0.00",
      position: "Cleaner",
      remarks: "sadfas",
      secondary_employment: false,
      serial_no: 44,
      severance_pay_paid: "0.00",
      social_security_fund: "0.00",
      tax_deductible: "0.00",
      third_tier: "0.00",
      tin: "asd23",
      total_assessable_income: "0.00",
      total_cash_emolument: "0.00",
      total_reliefs: "0.00",
      total_tax_payable_to_gra: "0.00",
      vehicle_element: "0.00",
    },
    {
      accomodation_element: "0.00",
      basic_salary: "0.00",
      bonus_income: "0.00",
      cash_allowances: "0.00",
      chargeable_income: "0.00",
      deductible_reliefs: "0.00",
      excess_bonus: "0.00",
      final_tax_on_bonus: "0.00",
      name_of_employee: "me asd me",
      non_cash_benefit: "0.00",
      non_resident: false,
      overtime_income: "0.00",
      overtime_tax: "0.00",
      position: "Cleaner",
      remarks: "asdas",
      secondary_employment: false,
      serial_no: 43,
      severance_pay_paid: "0.00",
      social_security_fund: "0.00",
      tax_deductible: "0.00",
      third_tier: "0.00",
      tin: "asdf223",
      total_assessable_income: "0.00",
      total_cash_emolument: "0.00",
      total_reliefs: "0.00",
      total_tax_payable_to_gra: "0.00",
      vehicle_element: "0.00",
    },
  ];

  const anothers = [
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "asd Kwesi asd" }, { value: "0.00" }],
    [{ value: false }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "Cleaner" }],
    [{ value: "sadfas" }, { value: false }],
    [{ value: 44 }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "asd23" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "me asd me" }, { value: "0.00" }],
    [{ value: false }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "Cleaner" }],
    [{ value: "asdas" }, { value: false }],
    [{ value: 43 }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "asdf223" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }],
  ];

  const transformArray = (arr) => {
    const result = [];

    arr.forEach((obj) => {
      const entries = Object.entries(obj);

      for (let i = 0; i < entries.length; i += 2) {
        const pair = [];

        pair.push({ values: entries[i][1] });

        if (i + 1 < entries.length) {
          pair.push({ values: entries[i + 1][1] });
        }

        result.push(pair);
      }
    });

    return result;
  };

  function transposeArray(array) {
    return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
  }

  function reshapeArray(array, columns) {
    // Flatten the array and extract the values
    const flattened = array.flat().map((cell) => cell.value);

    // Create a new array with chunks of the specified size
    const reshaped = [];
    for (let i = 0; i < flattened.length; i += columns) {
      const chunk = flattened
        .slice(i, i + columns)
        .map((value) => ({ value, readOnly: true }));
      reshaped.push(chunk);
    }

    return reshaped;
  }

  function extendDataWithEmptyCells(data, totalColumns, totalRows) {
    // Ensure each row has the required number of columns
    const extendedData = data.map((row) => {
      const emptyCells = Array.from(
        { length: totalColumns - row.length },
        () => ({ value: "", readOnly: true })
      );
      return [...row, ...emptyCells];
    });

    // Add additional rows if needed
    const additionalRows = Array.from(
      { length: totalRows - extendedData.length },
      () => {
        return Array.from({ length: totalColumns }, () => ({
          value: "",
          readOnly: true,
        }));
      }
    );

    return [...extendedData, ...additionalRows];
  }

  const transposedData = reshapeArray(anothers, 5);
  const extendedData = extendDataWithEmptyCells(transposedData, 5, 10);
  const another = transformArray(me);

  console.log("another: ", another);

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

  return (
    <>
      <div className="overflow-y-hidden">
        <Spreadsheet data={extendedData} />
      </div>
    </>
  );
};

export default MySpreadsheet;
