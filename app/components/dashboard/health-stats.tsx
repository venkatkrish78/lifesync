"use client";

import { motion } from "framer-motion";
import { Heart, Activity, Footprints, Moon, TrendingUp, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import dynamic from "next/dynamic";

const Chart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Line),
  {
    ssr: false,
    loading: () => <div className="h-[150px] flex items-center justify-center">Loading chart...</div>,
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

export default function HealthStats() {
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps",
        data: [6500, 5900, 8000, 8100, 5600, 9200, 7800],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
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
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-accent/50 p-3 rounded-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-muted-foreground">Heart Rate</p>
              <p className="text-xl font-bold">72 <span className="text-xs font-normal">bpm</span></p>
            </div>
            <div className="p-2 rounded-full bg-red-500/10">
              <Heart className="h-4 w-4 text-red-500" />
            </div>
          </div>
          <div className="text-xs text-green-500 mt-1 flex items-center">
            <TrendingDown className="h-3 w-3 mr-1" /> 3 bpm from yesterday
          </div>
        </div>
        
        <div className="bg-accent/50 p-3 rounded-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-muted-foreground">Sleep</p>
              <p className="text-xl font-bold">7.2 <span className="text-xs font-normal">hrs</span></p>
            </div>
            <div className="p-2 rounded-full bg-blue-500/10">
              <Moon className="h-4 w-4 text-blue-500" />
            </div>
          </div>
          <div className="text-xs text-green-500 mt-1 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" /> 0.5 hrs from yesterday
          </div>
        </div>
      </div>

      <div className="bg-accent/50 p-3 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Footprints className="h-4 w-4 mr-2 text-primary" />
            <p className="text-sm font-medium">Daily Steps</p>
          </div>
          <p className="text-sm font-bold">7,842 / 10,000</p>
        </div>
        <Progress value={78} className="h-2" />
      </div>

      <div className="h-[150px] mt-4">
        <Chart data={chartData} options={chartOptions} />
      </div>

      <div className="bg-accent/50 p-3 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Activity className="h-4 w-4 mr-2 text-primary" />
            <p className="text-sm font-medium">Weekly Activity</p>
          </div>
          <p className="text-sm font-bold">4/7 days</p>
        </div>
        <Progress value={57} className="h-2" />
      </div>
    </div>
  );
}