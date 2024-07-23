import React from "react";
import { FaRegFileLines } from "react-icons/fa6";
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
  { value: "2024/2025", label: "2024/2025" },
  { value: "2025/2026", label: "2025/2026" },
];

export const ageOptions = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

export const noOfEmployees = [
  { value: "0-50", label: "0-50" },
  { value: "51-500", label: "51-200" },
  { value: "200 and above", label: "200 and above" },
];

export const industries = [
  { value: "Health", label: "Health" },
  { value: "IT and Software", label: "IT and Software" },
  { value: "Health", label: "Health" },
  { value: "Agency or Sales House", label: "Agency or Sales House" },
  { value: "Food Services", label: "Food Services" },
  { value: "Construction", label: "Construction" },
  { value: "Engineering", label: "Engineering" },
  { value: "Financial", label: "Financial" },
  { value: "Manufactoring", label: "Manufactoring" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Others", label: "Others" },
];

export const categories = [
  { value: "monthly", label: "Monthly" },
  { value: "fortnightly", label: "Fortnightly" },
  { value: "weekly", label: "Weekly" },
];

export const categoriesNumber = [
  { value: "54weeks", label: "52 weeks" },
  { value: "12months", label: "12 months" },
  { value: "26fortnights", label: "26 fortnights" },
];

export const payrollDuration = [
  { value: "cat1", label: "Weekly" },
  { value: "cat2", label: "Monthly" },
];

export const languages = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
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

export const countries = [
  { value: "Ghana", label: "Ghana" },
  { value: "South Africa", label: "South Africa" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "Ivory Coast", label: "Ivory Coast" },
  { value: "Senegal", label: "Senegal" },
  { value: "Mali", label: "Mali" },
  { value: "Burkina Faso", label: "Burkina Faso" },
  { value: "France", label: "France" },
  { value: "Germany", label: "Germany" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Spain", label: "Spain" },
  { value: "Italy", label: "Italy" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "Sweden", label: "Sweden" },
  { value: "Portugal", label: "Portugal" },
  { value: "Switzerland", label: "Switzerland" },
];
export const taxType = [
  { value: "type1", label: "Type 1" },
  { value: "type2", label: "Type 2" },
];

export const currencies = [
  { value: "GHS", label: "Ghanaian Cedi" },
  { value: "ZAR", label: "South African Rand" },
  { value: "NGN", label: "Nigerian Naira" },
  { value: "XOF", label: "West African CFA Franc" },
  { value: "EUR", label: "Euro" },
  { value: "GBP", label: "British Pound Sterling" },
  { value: "USD", label: "United States Dollar" },
  { value: "XAF", label: "Central African CFA Franc" },
  { value: "CHF", label: "Swiss Franc" },
  { value: "SEK", label: "Swedish Krona" },
  { value: "NOK", label: "Norwegian Krone" },
  { value: "DZD", label: "Algerian Dinar" },
  { value: "MAD", label: "Moroccan Dirham" },
  { value: "TND", label: "Tunisian Dinar" },
  { value: "EGP", label: "Egyptian Pound" },
];

export const payslipDates = [
  { value: "July 2024", label: "July 2024" },
  { value: "June 2024", label: "June 2024" },
  { value: "May 2024", label: "May 2024" },
  { value: "April 2024", label: "April 2024" },
  { value: "March 2024", label: "March 2024" },
  { value: "February 2024", label: "February 2024" },
  { value: "January 2024", label: "January 2024" },
  { value: "December 2023", label: "December 2023" },
  { value: "November 2023", label: "November 2023" },
  { value: "October 2023", label: "October 2023" },
  { value: "September 2023", label: "September 2023" },
  { value: "August 2023", label: "August 2023" },
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
      // {
      //   menu: "Onboard Employee",
      //   url: "/dashboard/create-employee",
      //   icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      // },
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
    ],
  },
  {
    title: "Reports",
    icon: <PiBuildingOfficeLight color="#0DCAF0" size={16} />,
    subMenu: [
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
      // {
      //   menu: "Tax Rate",
      //   url: "/dashboard/tax-rate",
      //   icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      // },
      // {
      //   menu: "Manage Entity",
      //   url: "/view-entity",
      //   icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      // },
    ],
  },
];

export const taxSettingsDashboardMenus = [
  {
    title: "Tax Settings",
    icon: <RxDashboard color="#0DCAF0" size={16} />,
    subMenu: [
      {
        menu: "Create Tax Rate Election",
        url: "/dashboard/tax-settings",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
      {
        menu: "Manage Tax Rate Election",
        url: "/dashboard/manage-tax-election",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
    ],
  },
];

export const superDashboardMenus = [
  {
    title: "Tax Rate",
    icon: <RxDashboard color="#0DCAF0" size={16} />,
    subMenu: [
      {
        menu: "Create Tax Rate",
        url: "/super/create-tax-rate",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
      {
        menu: "Manage Tax Rate",
        url: "/super/manage-tax-rate",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
    ],
  },
  {
    title: "Tax Type",
    icon: <RxDashboard color="#0DCAF0" size={16} />,
    subMenu: [
      {
        menu: "Create Tax Component",
        url: "/super/create-tax-component",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
      {
        menu: "Create Tax Type",
        url: "/super/create-tax-type",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
    ],
  },
  {
    title: "Prices",
    icon: <PiBuildingOfficeLight color="#0DCAF0" size={16} />,
    subMenu: [
      {
        menu: "Create Price",
        url: "/super/create-price",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
    ],
  },
  // {
  //   title: "Terms and Conditions",
  //   icon: <PiBuildingOfficeLight color="#0DCAF0" size={16} />,
  //   subMenu: [
  //     {
  //       menu: "Create Terms and Conditions",
  //       url: "/super/create-terms-and-conditions",
  //       icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
  //     },
  //   ],
  // },
];

export const taxOperatorMenus = [
  {
    title: "Tax Rate",
    icon: <RxDashboard color="#0DCAF0" size={16} />,
    subMenu: [
      {
        menu: "Create Tax Rate",
        url: "/tax-operator/create-tax-rate",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
      {
        menu: "Manage Tax Rate",
        url: "/tax-operator/manage-tax-rate",
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
        menu: "Update Details",
        url: "/employee/update-employee",
        icon: <MdOutlineKeyboardDoubleArrowRight color="#00D284" />,
      },
      {
        menu: "Payslip",
        url: "/employee/employee-payslip",
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

export const pricingPackages = [
  {
    title: "Basic",
    price: "GH₵ 199",
    description: "Basic Package includes access to basic features.",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    href: "/signup",
    bgColor: "bg-gray-200",
    btnName: "Get started for free",
  },
  {
    title: "Premium",
    price: "GH₵ 399",
    description: "Premium Package includes access to premium features.",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    href: "/signup",
    bgColor: "bg-gray-200",
    btnName: "Book a demo",
  },
  {
    title: "Enterprise",
    price: "GH₵ 999",
    description:
      "Enterprise Package includes access to premium features and additional features.",
    btnName: "Book a call",
    bgColor: "bg-gradient-to-r from-green-100 to-green-300",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
      "Feature 4",
      "Feature 5",
      "Feature 6",
      "Feature 7",
    ],
  },
];
