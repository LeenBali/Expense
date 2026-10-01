"use client";
import React, { useState } from "react";
import { useBudget } from "./Context/BudgetContext";
import PieChart from "./PieChart";
export default function Home({ className }) {
  const {
    totalBudjet,
    totalExpense,
    balance,
    incomes,
    list,
    deleteTransaction,
    black,
  } = useBudget();

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const closeModal = () => setSelectedTransaction(null);

  const handleDelete = () => {
    if (selectedTransaction && selectedTransaction.id && deleteTransaction) {
      deleteTransaction(selectedTransaction.id, selectedTransaction.type);
      closeModal();
    }
  };

  // كائن التنسيق للكروت والـ Modal حسب حالة الثيم
  const cardStyle = {
    backgroundColor: black === "black" ? "rgb(37, 38, 43)" : "#ffffff ",
    color: black === "black" ? "#ffffff" : "rgb(37, 38, 43)",
  };

  return (
    <div className={` p-6 relative ${className || ""}`}>
      <h1 className="font-bold text-3xl pt-2">
        YOUR BALANCE IS:
        <span className={balance >= 0 ? "text-green-600" : "text-red-600"}>
          ${balance}
        </span>
      </h1>

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

      <h2 className="font-bold text-xl mt-12 mb-4">Transaction History</h2>
      <div className="flex items-center">
        <div className="flex flex-col gap-3 w-96 max-h-80 overflow-y-auto pr-2">
          {/* المداخيل */}
          {incomes &&
            incomes.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  setSelectedTransaction({ ...item, type: "income" })
                }
                className="flex justify-between items-center p-4 border border-gray-500/20 rounded-md border-r-4 border-r-green-500 cursor-pointer hover:opacity-80 transition-all duration-300"
                style={cardStyle}
              >
                <span className="font-medium">{item.label}</span>
                <span className="font-bold text-green-600">
                  +${item.amount}
                </span>
              </div>
            ))}

          {/* المصاريف */}
          {list &&
            list.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  setSelectedTransaction({ ...item, type: "expense" })
                }
                className="flex justify-between items-center p-4 border border-gray-500/20 rounded-md border-r-4 border-r-red-500 cursor-pointer hover:opacity-80 transition-all duration-300"
                style={cardStyle}
              >
                <span className="font-medium">{item.label}</span>
                <span className="font-bold text-red-600">-${item.amount}</span>
              </div>
            ))}

          {(!incomes || incomes.length === 0) &&
            (!list || list.length === 0) && (
              <p className="text-gray-400 text-sm italic">
                No transactions added yet.
              </p>
            )}
        </div>

        {/* الـ Modal التفصيلي */}
        {selectedTransaction && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div
              className="border border-gray-500/30 rounded-lg p-6 w-full max-w-md shadow-xl relative transition-all duration-300"
              style={cardStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold border-b border-gray-500/30 pb-2 mb-4">
                Transaction Details
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-500/20 pb-1">
                  <span className="opacity-60 font-medium">ID:</span>
                  <span className="font-mono text-sm">
                    {selectedTransaction.id || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-500/20 pb-1">
                  <span className="opacity-60 font-medium">Label:</span>
                  <span className="font-bold">{selectedTransaction.label}</span>
                </div>

                <div className="flex justify-between border-b border-gray-500/20 pb-1">
                  <span className="opacity-60 font-medium">Type:</span>
                  <span
                    className={`font-semibold capitalize ${
                      selectedTransaction.type === "expense"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {selectedTransaction.type}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-500/20 pb-1">
                  <span className="opacity-60 font-medium">Amount:</span>
                  <span
                    className={`font-black ${
                      selectedTransaction.type === "expense"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {selectedTransaction.type === "expense" ? "-" : "+"}$
                    {selectedTransaction.amount}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-500/20 pb-1">
                  <span className="opacity-60 font-medium">Category:</span>
                  <span className="font-medium">
                    {selectedTransaction.category || "General"}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-500/20 pb-1">
                  <span className="opacity-60 font-medium">Date:</span>
                  <span>
                    {selectedTransaction.date ||
                      new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Delete
                </button>

                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-500/20 font-semibold py-2 rounded-md hover:bg-gray-500/30 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        <PieChart />
      </div>
    </div>
  );
}
