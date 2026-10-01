"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useBudget } from "./Context/BudgetContext"; // تأكد من ضبط مسار الـ Context الصحيح

// تسجيل المكونات المطلوبة من Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const { totalBudjet, totalExpense } = useBudget();

  // بيانات المخطط
  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount ($)",
        data: [totalBudjet, totalExpense],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)", // لون الأخضر للدخل
          "rgba(239, 68, 68, 0.8)", // لون الأحمر للمصاريف
        ],
        borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // خيارات المخطط
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // مكان التوضيح (أعلى، أسفل،..)
      },
    },
  };

  // إذا لم تكن هناك بيانات للعرض
  if (totalBudjet === 0 && totalExpense === 0) {
    return (
      <div className="text-center text-gray-400 my-4 text-sm">
        No data available for Chart
      </div>
    );
  }

  return (
    <div className="w-64 h-64 mx-auto my-6">
      <Pie data={data} options={options} />
    </div>
  );
}
