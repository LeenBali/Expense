"use client";
import "./globals.css";
import Sidebar from "./Sidebar";
import { BudgetProvider, useBudget } from "./Context/BudgetContext";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function LayoutContent({ children }) {
  const { black, toggleTheme } = useBudget();

  // تحديد الستايل المباشر للهيدر
  const headerStyle = {
    backgroundColor: black === "black" ? "rgb(37, 38, 43)" : "#ffffff",
    color: black === "black" ? "#ffffff" : "rgb(37, 38, 43)",
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        black === "black" ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
      }`}
    >
      {/* الهيدر العلوي مع تصحيح تمرير الـ style */}
      <header
        className="flex justify-between items-center p-6 shadow-sm transition-colors duration-300"
        style={headerStyle}
      >
        <h1 className="text-xl font-bold flex items-center gap-3">
          <AppSettingsAltIcon />
          Expense Tracker App
        </h1>

        {/* زر تبديل الثيم */}
        <button
          onClick={toggleTheme}
          className="p-2 border border-gray-500/30 rounded-full hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
          title="Toggle Theme"
        >
          {black === "black" ? (
            <WbSunnyRoundedIcon className="text-yellow-400" />
          ) : (
            <DarkModeIcon className="text-gray-700" />
          )}
        </button>
      </header>

      {/* الهيكل السفلي */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <BudgetProvider>
          <LayoutContent>{children}</LayoutContent>
        </BudgetProvider>
      </body>
    </html>
  );
}
