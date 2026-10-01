/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import { useBudget } from "../Context/BudgetContext";

const page = () => {
  const {
    totalBudjet,
    totalExpense,
    balance,
    incomes,
    list,
    deleteTransaction,
    black,
  } = useBudget();
  const cardStyle = {
    backgroundColor: black === "black" ? "rgb(37, 38, 43)" : "#ffffff ",
    color: black === "black" ? "#ffffff" : "rgb(37, 38, 43)",
  };
  return (
    <div>
      {" "}
      <div className="flex gap-6 mt-8">
        {/* كارت الدخل */}
        <div
          className="p-8 h-64 shadow-lg  rounded-md transition-colors duration-300"
          style={{
            width: "500px",
            ...cardStyle,
          }}
        >
          <h1 className="text-center font-bold text-3xl">Income / Budget</h1>
          <p className="text-center font-extrabold text-3xl text-green-600 mt-5">
            ${totalBudjet}
          </p>
        </div>

        {/* كارت المصاريف */}
        <div
          className="p-8 h-64 shadow-sm rounded-md transition-colors duration-300"
          style={{
            width: "500px",
            ...cardStyle,
          }}
        >
          <h1 className="text-center font-bold text-3xl">Expenses</h1>
          <p className="text-center font-extrabold text-3xl text-red-600 mt-5">
            ${totalExpense}
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
