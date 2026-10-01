"use client";
import React from "react";
import { useBudget } from "../Context/BudgetContext";
import { useRouter } from "next/navigation";
const ExpensesPage = () => {
  const router = useRouter();

  const { label, setLabel, list, setlist, amount, setAmount, black } =
    useBudget();
  const cardStyle = {
    backgroundColor: black === "black" ? "rgb(37, 38, 43)" : "#ffffff ",
    color: black === "black" ? "#ffffff" : "rgb(37, 38, 43)",
    border: "1px solid rgb(55, 58, 64)",
    borderColor: black === "black" ? "rgb(63, 63, 70)" : "#d1d5db",
  };
  function handleAddItem() {
    if (!label.trim() || !amount) return;
    const news = {
      id: Date.now(),
      label: label,
      amount: Number(amount),
    };
    setlist([...list, news]);
    setLabel("");
    setAmount(0);
    router.push("/");
  }

  function deletes() {
    setLabel("");
    setAmount(0);
    setlist([]);
  }

  function Reset() {
    const mess =
      "Are you sure you want to reset your expenses to 0? This action can be later undone by deleting the transaction. However the expense categories will return and the amount will be put under Uncategorized";
    const conf = window.confirm(mess);
    if (conf) {
      setLabel("");
      setAmount(0);
      setlist([]);
      router.push("/");
    }
  }

  return (
    <div className="mt-4 ms-28">
      <h1 className="font-bold text-2xl pt-7">Add an Expense</h1>
      <p className="text-sm">Adds on to your current expense amount.</p>
      <div className="border-b border-gray-700 pb-4 w-5xl mt-4">
        <div>
          <p className="font-medium text-lg">
            Label<span className="text-red-600">*</span>
          </p>
        </div>
        <input
          type="text"
          placeholder="Ex.Car Payments"
          className="border border-gray-300 bg-white w-96 p-2 focus:outline-none focus:border-blue-300"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          style={{ ...cardStyle }}
        />
        <div className="mt-4">
          <p className="font-medium text-lg">
            Amount<span className="text-red-600">*</span>
          </p>
        </div>
        <input
          type="text"
          placeholder="Ex.3000"
          className="border border-gray-300 bg-white w-96 p-2 focus:outline-none focus:border-blue-300"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ ...cardStyle }}
        />
      </div>
      <h1 className="font-bold text-xl pt-7">Add a Category to Your Expense</h1>

      <div className="border-b border-gray-700 pb-4 w-5xl mt-4">
        <div>
          <div>
            <p className="font-medium text-sm">Select a Category</p>
          </div>

          <select
            required
            defaultValue=""
            className="border mt-2 border-gray-300 bg-white w-96 p-2 text-gray-400 focus:outline-none focus:border-blue-400"
            style={{ ...cardStyle }}
          >
            <option value="" disabled hidden>
              Select a category or create a new one
            </option>
            <option value="entertainment">Entertainment</option>
            <option value="uncategorized">Uncategorized</option>
          </select>
        </div>

        <div className="flex gap-6 mt-9">
          <button
            className="bg-blue-500 text-white p-1.5 w-32 font-bold rounded-sm"
            onClick={handleAddItem}
          >
            Add Expense
          </button>
          <button
            className="bg-red-500 text-white p-1.5 w-40 font-medium rounded-sm"
            onClick={deletes}
          >
            Remove category
          </button>
        </div>
      </div>
      <h1 className="font-bold text-xl pt-7">Reset Your Expenses</h1>
      <p className="text-sm">Resets your expenses back to 0</p>
      <button
        className="bg-red-500 mt-4 text-white p-1.5 w-40 font-bold rounded-sm"
        onClick={Reset}
      >
        Reset Expense
      </button>
    </div>
  );
};

export default ExpensesPage;
