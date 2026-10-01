"use client";
import Link from "next/link";
import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useBudget } from "./Context/BudgetContext";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
const Sidebar = () => {
  const { black, toggleTheme } = useBudget();
  const cardStyle = {
    backgroundColor: black === "black" ? "rgb(37, 38, 43)" : "#ffffff ",
    color: black === "black" ? "#ffffff" : "rgb(37, 38, 43)",
  };
  return (
    <div>
      {/* تم حذف bg-white لكي يستقبل الألوان الممررة من الخارج بدون تعارض */}
      <div className={` shadow-sm  p-4 w-82 h-screen`} style={cardStyle}>
        <Link href="/">
          <h1 className="pb-9 pt-4 flex items-center gap-4 text-lg">
            <HomeOutlinedIcon className="text-blue-400" />
            Home
          </h1>
        </Link>
        <Link href="/expense">
          <h1 className="pb-9 flex items-center gap-4 text-lg">
            <AddCircleOutlineRoundedIcon className="text-blue-400" /> Add an
            Expense
          </h1>
        </Link>
        <Link href="/Budget">
          <h1 className="pb-9 flex items-center gap-4 text-lg">
            <AttachMoneyRoundedIcon className="text-blue-400" />
            Add / Update Your Budget
          </h1>
        </Link>
        <Link href="/View">
          <h1 className="pb-9 flex items-center gap-4 text-lg">
            <SignalCellularAltIcon className="text-blue-400" />
            View Spending in Categories
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
