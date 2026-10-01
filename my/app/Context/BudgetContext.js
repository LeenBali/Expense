/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const BudgetContext = createContext();

export function BudgetProvider({ children }) {
  const [budjets, setbudjets] = useState([]);
  const [budjet, setbudjet] = useState(0);
  const [budjetInput, setBudjetInput] = useState("");

  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [incomes, setIncomes] = useState([]);

  const [list, setlist] = useState([]);
  const [expenseLabel, setExpenseLabel] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);

  const [black, setBlack] = useState("white");

  // متغّير لمعرفة هل تم التحميل الأول في المتصفح أم لا
  const [isMounted, setIsMounted] = useState(false);

  // 1️⃣ قراءة البيانات من LocalStorage بعد اكتمال أول رندر في Client فقط
  useEffect(() => {
    setIsMounted(true);

    const savedBudjet = localStorage.getItem("budjet");
    const savedIncomes = localStorage.getItem("incomes");
    const savedList = localStorage.getItem("list");
    const savedTheme = localStorage.getItem("black");

    if (savedBudjet) setbudjet(JSON.parse(savedBudjet));
    if (savedIncomes) setIncomes(JSON.parse(savedIncomes));
    if (savedList) setlist(JSON.parse(savedList));
    if (savedTheme) setBlack(JSON.parse(savedTheme));
  }, []);

  // 2️⃣ حفظ البيانات عند تعديلها (فقط بعد اكتمال التحميل الأول isMounted)
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("budjet", JSON.stringify(budjet));
  }, [budjet, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [incomes, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("list", JSON.stringify(list));
  }, [list, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("black", JSON.stringify(black));
  }, [black, isMounted]);

  const toggleTheme = () => {
    setBlack((prev) => (prev === "black" ? "white" : "black"));
  };

  // العمليات الحسابية
  const totalBudjet =
    Number(budjet) +
    incomes.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const totalExpense = list.reduce((x, y) => x + Number(y.amount || 0), 0);

  const balance = totalBudjet - totalExpense;

  const deleteTransaction = (id, type) => {
    if (type === "income") {
      setIncomes((prev) => prev.filter((item) => item.id !== id));
    } else if (type === "expense") {
      setlist((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // يمنع عرض الصفحة حتى تكتمل قراءة LocalStorage لتفادي الوميض أو التناقض
  if (!isMounted) {
    return null;
  }

  return (
    <BudgetContext.Provider
      value={{
        deleteTransaction,
        budjets,
        setbudjets,
        budjet,
        setbudjet,
        budjetInput,
        setBudjetInput,
        label,
        setLabel,
        amount,
        setAmount,
        incomes,
        setIncomes,
        list,
        setlist,
        expenseLabel,
        setExpenseLabel,
        expenseAmount,
        setExpenseAmount,
        totalBudjet,
        totalExpense,
        balance,
        black,
        toggleTheme,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export const useBudget = () => useContext(BudgetContext);
