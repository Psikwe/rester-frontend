import React from "react";
import { companies } from "../../core/data";
import CompanyCard from "../../components/card/_component";

function ViewCompany() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {companies.map((c, i) => (
        <CompanyCard
          passage={c.passage}
          noOfEmployees={c.noOfEmployees}
          companyName={c.companyName}
          href={c.href}
        />
      ))}
    </div>
  );
}

export default ViewCompany;
