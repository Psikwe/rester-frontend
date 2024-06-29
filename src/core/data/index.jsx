import React from "react";
import { FaPhone } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

const entity_id = localStorage.getItem("entity_id");
export const options = [
  { value: "yearly", label: "Yearly" },
  { value: "monthly", label: "Monthly" },
  { value: "fortnightly", label: "Fortnightly" },
  { value: "weekly", label: "Weekly" },
  { value: "daily", label: "Daily" },
  { value: "hourly", label: "Hourly" },
];

export const yearOptions = [
  { value: "chocolate", label: "2024/2025" },
  { value: "strawberry", label: "2025/2026" },
];

export const noOfEmployees = [
  { value: "0-50", label: "0-50" },
  { value: "51-500", label: "51-200" },
  { value: "200 and above", label: "200 and above" },
];

export const industries = [
  { value: "Health", label: "Health" },
  { value: "Agency or Sales House", label: "Agency or Sales House" },
  { value: "Food Services", label: "Food Services" },
  { value: "Construction", label: "Construction" },
  { value: "Engineering", label: "Engineering" },
  { value: "Financial", label: "Financial" },
  { value: "Manufactoring", label: "Manufactoring" },
  { value: "Real Estate", label: "Real Estate" },
];

export const regions = [
  { value: "Greater Accra", label: "Greater Accra" },
  { value: "Ashanti", label: "Ashanti" },
  { value: "Western", label: "Western" },
  { value: "Eastern", label: "Eastern" },
  { value: "Northern", label: "Northern" },
  { value: "Brong-Ahafo", label: "Brong-Ahafo" },
  { value: "Volta", label: "Volta" },
  { value: "Upper East", label: "Upper East" },
  { value: "Upper West", label: "Upper West" },
  { value: "Central", label: "Central" },
  { value: "Western North", label: "Western North" },
  { value: "Oti", label: "Oti" },
  { value: "Bono East", label: "Bono East" },
  { value: "Ahafo", label: "Ahafo" },
  { value: "Savannah", label: "Savannah" },
  { value: "North East", label: "North East" },
];

export const adminDashboardMenus = [
  {
    title: "Overview",
    icon: <RxDashboard color="#0DCAF0" size={16} />,
    subMenu: [
      {
        menu: "View Entity Profile",
        url: "/view-entity",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
    ],
  },
  {
    title: "Entity",
    icon: <PiBuildingOfficeLight color="#0DCAF0" size={16} />,
    subMenu: [
      {
        menu: "Setup a new Entity",
        url: "/dashboard/create-entity",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
      // {
      //   menu: "Manage Entity",
      //   url: "/view-entity",
      //   icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      // },
    ],
  },
  {
    title: "Employees",
    icon: <GrUserWorker color="#0DCAF0" size={16} />,
    subMenu: [
      {
        menu: "Onboard Employee",
        url: "/dashboard/create-employee",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
      {
        menu: "Manage Employees",
        url: "/dashboard/manage-employees",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
      {
        menu: "Manage Employee Loans",
        url: "/dashboard/view-employees",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
      {
        menu: "Create Income Type",
        url: "/dashboard/create-income-type",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
      {
        menu: "Create Allowable Deductions",
        url: "/dashboard/create-allowable-deductions",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },

      {
        menu: "Run Payroll",
        url: "/dashboard/run-payroll",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
      {
        menu: "Saved Reports",
        url: "/dashboard/saved-reports",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
    ],
  },
];

export const employeeDashboardMenus = [
  // {
  //   title: "Overview",
  //   icon: <RxDashboard />,
  //   subMenu: [
  //     {
  //       menu: "View entity",
  //       url: "/view-entity",
  //       icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
  //     },
  //   ],
  // },
  // {
  //   title: "entity",
  //   icon: <PiBuildingOfficeLight color="#0DCAF0" size={16} />,
  //   subMenu: [
  //     {
  //       menu: "Create entity",
  //       url: "/create-entity",
  //       icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
  //     },
  //     {
  //       menu: "Manage entity",
  //       url: "/manage-entity",
  //       icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
  //     },
  //   ],
  // },
  {
    title: "Employees",
    icon: <GrUserWorker color="#0DCAF0" size={16} />,
    subMenu: [
      {
        menu: "Update Employee",
        url: "/employee/update-employee",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
    ],
  },
];

export const employeeColumns = [
  { key: "id", name: "ID" },
  { key: "title", name: "Title" },
];

export const employeeRows = [
  { id: 0, title: "Dennis Boateng" },
  { id: 1, title: "Kwesi Boateng" },
];

export const companies = [
  {
    entityName: "Mtn",
    noOfEmployees: 23,
    href: "/manage-employees",
  },
  {
    entityName: "Mtn",
    noOfEmployees: 23,
    href: "/manage-employees",
  },
  {
    entityName: "Mtn",
    noOfEmployees: 23,
    href: "/manage-employees",
  },
];

export const columnLabels = ["Flavour", "Food"];
export const rowLabels = ["Item 1", "Item 2"];
export const data = [
  [{ value: "Vanilla" }, { value: "Chocolate" }],
  [{ value: "Strawberry" }, { value: "Cookies" }],
];
