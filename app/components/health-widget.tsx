"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Heart, Moon, Droplet } from "lucide-react";
import dynamic from "next/dynamic";

const Chart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Line),
  {
    ssr: false,
    loading: () => <div className="h-40 flex items-center justify-center">Loading chart...</div>,
  }
);

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function HealthWidget() {
  const [steps] = useState(8432);
  const [heartRate] = useState(72);
  const [sleep] = useState(7.5);
  const [water] = useState(5);

  const chartData: ChartData<"line"> = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps",
        data: [6500, 7200, 8100, 7800, 8432, 0, 0],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.3,
      },
      {
        label: "Sleep (hours)",
        data: [7.2, 6.8, 7.5, 8.0, 7.5, 0, 0],
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-3 rounded-lg bg-teal-50 dark:bg-teal-900/30"
        >
          <div className="flex items-center text-teal-600 dark:text-teal-400 mb-1">
            <Activity className="h-4 w-4 mr-1" />
            <span className="text-xs">Steps</span>
          </div>
          <div className="text-lg font-semibold">{steps.toLocaleString()}</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30"
        >
          <div className="flex items-center text-red-600 dark:text-red-400 mb-1">
            <Heart className="h-4 w-4 mr-1" />
            <span className="text-xs">Heart Rate</span>
          </div>
          <div className="text-lg font-semibold">{heartRate} bpm</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30"
        >
          <div className="flex items-center text-purple-600 dark:text-purple-400 mb-1">
            <Moon className="h-4 w-4 mr-1" />
            <span className="text-xs">Sleep</span>
          </div>
          <div className="text-lg font-semibold">{sleep} hrs</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30"
        >
          <div className="flex items-center text-blue-600 dark:text-blue-400 mb-1">
            <Droplet className="h-4 w-4 mr-1" />
            <span className="text-xs">Water</span>
          </div>
          <div className="text-lg font-semibold">{water} glasses</div>
        </motion.div>
      </div>
      
      <div className="h-60">
        <Chart data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}