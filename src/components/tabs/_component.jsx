import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="mt-5 tabs">
      <ul className="flex space-x-8">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`py-2 px-4 text-sm border rounded cursor-pointer ${
              index === activeTab
                ? "bg-[#eb7134] text-white"
                : "border-gray-300"
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
