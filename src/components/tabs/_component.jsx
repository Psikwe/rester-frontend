import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="mt-5">
      <ul className="flex justify-center w-1/3 p-3 space-x-8 bg-[#ccf6ff]">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`py-2  px-4 text-sm  rounded cursor-pointer ${
              index === activeTab ? "bg-[#7da0fa] text-white" : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div className="p-4 mt-8">{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;
