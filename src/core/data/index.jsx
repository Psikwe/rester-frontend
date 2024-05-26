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
  { value: "chocolate", label: "0-50" },
  { value: "strawberry", label: "51-200" },
  { value: "strawberry", label: "200 and above" },
];

export const adminDashboardMenus = [
  {
    title: "Overview",
    icon: <RxDashboard />,
    subMenu: [
      {
        menu: "View Company",
        url: "/view-company",
        icon: <MdOutlineKeyboardDoubleArrowRight color="white" />,
      },
    ],
  },
  {
    title: "Employees",
    icon: <GrUserWorker color="#687864" />,
    subMenu: [
      {
        menu: "Manage Employee",
        url: "/dashboard",
        icon: <MdOutlineKeyboardDoubleArrowRight color="white" />,
      },
    ],
  },
  {
    title: "Company",
    icon: <PiBuildingOfficeLight color="#687864" />,
    subMenu: [
      {
        menu: "Manage Company",
        url: "/manage-company",
        icon: <MdOutlineKeyboardDoubleArrowRight color="white" />,
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
    companyName: "Mtn",
    noOfEmployees: 23,
    href: "/dashboard",
  },
  {
    companyName: "Mtn",
    noOfEmployees: 23,
    href: "/dashboard",
  },
  {
    companyName: "Mtn",
    noOfEmployees: 23,
    href: "/dashboard",
  },
];
