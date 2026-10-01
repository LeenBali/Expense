"use client";
import React from "react";
import { useBudget } from "../Context/BudgetContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const {
    budjets,
    setbudjets,
    black,
    setbudjet,
    budjetInput,
    setBudjetInput,
    label,
    setLabel,
    setlist,
    amount,
    setAmount,
    incomes,
    setIncomes,
  } = useBudget();

  // تعديل الستايل ليشمل لون الإطار الداكن في الوضع الليلي
  const cardStyle = {
    backgroundColor: black === "black" ? "rgb(23 23 23)" : "#ffffff",
    color: black === "black" ? "#ffffff" : "rgb(23 23 23)",
    borderColor: black === "black" ? "rgb(63, 63, 70)" : "#d1d5db", // لون إطار اغمق متناسق مع الوضع الليلي (Zinc-700)
  };

  function Budget() {
    if (!budjetInput) return;
    const num = Number(budjetInput);
    setbudjet(num);
    setbudjets([...budjets, num]);
    setBudjetInput("");
    router.push("/");
  }

  function handleAddIncome() {
    if (!label.trim() || !amount) return;
    const newIncome = {
      id: Date.now(),
      label: label,
      amount: Number(amount),
    };

    setIncomes([...incomes, newIncome]);
    setLabel("");
    setAmount("");
    router.push("/");
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
      <h1 className="font-bold text-2xl pt-7">Set Your Income / Budget</h1>
      <p className="text-sm">Sets your income / budget to the entered value.</p>

      <div className="border-b border-gray-700 pb-4 w-5xl mt-4">
        <div>
          <p className="font-medium text-lg">
            Enter your budget<span className="text-red-600">*</span>
          </p>
        </div>
        <input
          type="text"
          value={budjetInput}
          onChange={(e) => setBudjetInput(e.target.value)}
          placeholder="Ex.3000"
          className="border w-96 p-2 focus:outline-none focus:border-blue-500 rounded-sm"
          style={{ ...cardStyle }}
        />
        <div className="mt-3">
          <button
            className="bg-blue-500 text-white p-1.5 w-30 font-medium rounded-sm cursor-pointer hover:bg-blue-600 transition-colors"
            onClick={Budget}
          >
            Set Budget
          </button>
        </div>
      </div>

      <h1 className="font-bold text-xl pt-7">Add an Income Source</h1>
      <p className="text-sm">Adds on to your current income / budget amount.</p>

      <div className="border-b border-gray-700 pb-4 w-5xl mt-4">
        <div>
          <p className="font-medium text-lg">
            Label<span className="text-red-600">*</span>
          </p>
        </div>
        <input
          type="text"
          placeholder="Ex.Salary"
          className="border w-96 p-2 focus:outline-none focus:border-blue-500 rounded-sm"
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
          className="border w-96 p-2 focus:outline-none focus:border-blue-500 rounded-sm"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ ...cardStyle }}
        />

        <div className="mt-7">
          <button
            className="bg-blue-500 text-white p-1.5 w-32 font-bold rounded-sm cursor-pointer hover:bg-blue-600 transition-colors"
            onClick={handleAddIncome}
          >
            Add To Budget
          </button>
        </div>
      </div>

      <h1 className="font-bold text-xl pt-7">Reset Your Budget</h1>
      <p className="text-sm">Resets your budget back to 0</p>

      <button
        className="bg-red-500 mt-4 text-white p-1.5 w-40 font-bold rounded-sm cursor-pointer hover:bg-red-600 transition-colors"
        onClick={Reset}
      >
        Reset Budget
      </button>
    </div>
  );
};

export default Page;
