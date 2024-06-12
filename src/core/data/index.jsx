import React from "react";
import { FaPhone } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

export const options = [
  { value: "chocolate", label: "Per Anum" },
  { value: "strawberry", label: "Per Month" },
  { value: "vanilla", label: "Vanilla" },
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
        menu: "Setup an Entity",
        url: "/dashboard/create-entity",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
      {
        menu: "Manage Entity",
        url: "/view-entity",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
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
        menu: "Create Income Type",
        url: "/dashboard/create-income-type",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
      {
        menu: "Manage Employees",
        url: "/dashboard/manage-employees",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
      {
        menu: "Run Payroll",
        url: "/dashboard/run-payroll",
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
