"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, DollarSign } from "lucide-react";
import dynamic from "next/dynamic";

const Chart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Doughnut),
  {
    ssr: false,
    loading: () => <div className="h-40 flex items-center justify-center">Loading chart...</div>,
  }
);

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function FinanceWidget() {
  const [balance] = useState(2450.75);
  const [income] = useState(3200);
  const [expenses] = useState(1850.25);

  const chartData: ChartData<"doughnut"> = {
    labels: ["Housing", "Food", "Transport", "Entertainment", "Utilities", "Other"],
    datasets: [
      {
        data: [35, 20, 15, 10, 12, 8],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30"
        >
          <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">Current Balance</div>
          <div className="text-xl font-semibold flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            {balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
        </motion.div>
        
        <div className="grid grid-rows-2 gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-2 rounded-lg bg-green-50 dark:bg-green-900/30"
          >
            <div className="text-xs text-green-600 dark:text-green-400 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              Income
            </div>
            <div className="text-sm font-medium">
              ${income.toLocaleString()}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30"
          >
            <div className="text-xs text-red-600 dark:text-red-400 flex items-center">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              Expenses
            </div>
            <div className="text-sm font-medium">
              ${expenses.toLocaleString()}
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="h-40">
        <Chart data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}