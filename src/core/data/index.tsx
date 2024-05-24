import React from "react";
import { FaPhone } from "react-icons/fa6";

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

export const menus = [
  {
    submenu: [
      {
        title: "Msisdn for draw",
        url: "/",
        group: "Upload",
        icon: <FaPhone />,
      },
      // {
      //   title: "Spin for winner",
      //   url: "/spin",
      //   group: "Get winner",
      //   icon: <ImSpinner9 />,
      // },
    ],
  },
];
