"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, Wallet, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import dynamic from "next/dynamic";

const Chart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Doughnut),
  {
    ssr: false,
    loading: () => <div className="h-[200px] flex items-center justify-center">Loading chart...</div>,
  }
);

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

export default function FinancialOverview() {
  const [activeTab, setActiveTab] = useState("spending");

  const chartData = {
    labels: ["Housing", "Food", "Transportation", "Entertainment", "Utilities", "Other"],
    datasets: [
      {
        data: [35, 20, 15, 10, 12, 8],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(107, 114, 128, 0.8)",
        ],
        borderWidth: 0,
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
    cutout: "70%",
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-accent/50 p-3 rounded-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-muted-foreground">Monthly Spending</p>
              <p className="text-xl font-bold">$2,450</p>
            </div>
            <div className="p-2 rounded-full bg-red-500/10">
              <ArrowUpRight className="h-4 w-4 text-red-500" />
            </div>
          </div>
          <div className="text-xs text-red-500 mt-1 flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-1" /> 12% from last month
          </div>
        </div>
        
        <div className="bg-accent/50 p-3 rounded-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-muted-foreground">Monthly Income</p>
              <p className="text-xl font-bold">$4,850</p>
            </div>
            <div className="p-2 rounded-full bg-green-500/10">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </div>
          </div>
          <div className="text-xs text-green-500 mt-1 flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-1" /> 5% from last month
          </div>
        </div>
      </div>

      <div className="h-[180px] mt-4">
        <Chart data={chartData} options={chartOptions} />
      </div>

      <div className="space-y-2 mt-2">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span>Housing</span>
          </div>
          <span className="font-medium">35%</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span>Food</span>
          </div>
          <span className="font-medium">20%</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
            <span>Transportation</span>
          </div>
          <span className="font-medium">15%</span>
        </div>
      </div>

      <div className="pt-2 border-t border-border">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Budget Progress</div>
          <div className="text-xs text-muted-foreground">$2,450 / $3,000</div>
        </div>
        <Progress value={82} className="h-2 mt-2" />
      </div>
    </div>
  );
}