import React from "react";
import { AiOutlineWechat } from "react-icons/ai";
import {
  FiShoppingBag,
  FiBarChart,
  FiCreditCard,
  FiStar,
  FiShoppingCart,
} from "react-icons/fi";
import {
  BsClipboardData,
  BsBoxSeam,
  BsCurrencyDollar,
  BsShield,
  BsChatLeft,
} from "react-icons/bs";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { GrLocation } from "react-icons/gr";

export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);

export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "ecommerce",
        icon: <FiShoppingBag />,
      },
    ],
  },

  // {
  //   title: "Pages",
  //   links: [
  //     {
  //       name: "products",
  //       icon: <AiOutlineShoppingCart />,
  //     },
  //     {
  //       name: "employees",
  //       icon: <IoMdContacts />,
  //     },
  //   ],
  // },
  {
    title: "Apps",
    links: [
      {
        name: "chatAi",
        icon: <AiOutlineWechat />,
      },
      // {
      //   name: "calendar",
      //   icon: <AiOutlineCalendar />,
      // },
      // {
      //   name: "kanban",
      //   icon: <BsKanban />,
      // },
      {
        name: "AI-dashboards",
        icon: <BsClipboardData />,
      },
    ],
  },
  // {
  //   title: "Charts",
  //   links: [
  //     {
  //       name: "line",
  //       icon: <AiOutlineStock />,
  //     },
  //     {
  //       name: "area",
  //       icon: <AiOutlineAreaChart />,
  //     },

  //     {
  //       name: "bar",
  //       icon: <AiOutlineBarChart />,
  //     },
  //     {
  //       name: "pie",
  //       icon: <FiPieChart />,
  //     },
  //     {
  //       name: "financial",
  //       icon: <RiStockLine />,
  //     },
  //     {
  //       name: "color-mapping",
  //       icon: <BsBarChart />,
  //     },
  //     {
  //       name: "pyramid",
  //       icon: <GiLouvrePyramid />,
  //     },
  //   ],
  // },
];

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];
