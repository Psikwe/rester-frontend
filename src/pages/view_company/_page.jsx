import React from "react";
import { companies } from "../../core/data";
import axios from "axios";
import CompanyCard from "../../components/card/_component";

function ViewCompany() {
  const [company, setCompany] = React.useState([
    {
      id: "",
      name: "",
    },
  ]);
  React.useEffect(() => {
    axios
      .get("https://rester-82c60dc37022.herokuapp.com/get_entities", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("u_token")}`,
        },
      })
      .then((res) => {
        setCompany(res.data.entities);
      })
      .catch((error) => {
        console.log("comp: ", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {company.map((c, i) => (
        <div key={i}>
          <CompanyCard
            // passage={c.passage}
            noOfEmployees={23}
            companyName={c.name}
            // href={c.href}
          />
        </div>
      ))}
    </div>
  );
}

export default ViewCompany;
