"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  CreditCard, 
  DollarSign, 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Calendar,
  Clock,
  Building,
  Tag,
  Wallet
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

const DoughnutChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Doughnut),
  {
    ssr: false,
    loading: () => <div className="h-[250px] flex items-center justify-center">Loading chart...</div>,
  }
);

const LineChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Line),
  {
    ssr: false,
    loading: () => <div className="h-[250px] flex items-center justify-center">Loading chart...</div>,
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

type Transaction = {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: "income" | "expense";
  merchant?: string;
};

type Bill = {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  isPaid: boolean;
  category: string;
};

export default function FinancesPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState("overview");
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      title: "Salary Deposit",
      amount: 3500,
      date: "May 1, 2023",
      category: "Income",
      type: "income",
      merchant: "ABC Company",
    },
    {
      id: "2",
      title: "Grocery Shopping",
      amount: 125.45,
      date: "May 3, 2023",
      category: "Food",
      type: "expense",
      merchant: "Whole Foods",
    },
    {
      id: "3",
      title: "Electric Bill",
      amount: 85.20,
      date: "May 5, 2023",
      category: "Utilities",
      type: "expense",
      merchant: "Power Company",
    },
    {
      id: "4",
      title: "Freelance Work",
      amount: 750,
      date: "May 10, 2023",
      category: "Income",
      type: "income",
      merchant: "Client XYZ",
    },
    {
      id: "5",
      title: "Restaurant Dinner",
      amount: 68.50,
      date: "May 12, 2023",
      category: "Food",
      type: "expense",
      merchant: "Italian Bistro",
    },
    {
      id: "6",
      title: "Gas Station",
      amount: 45.30,
      date: "May 14, 2023",
      category: "Transportation",
      type: "expense",
      merchant: "Shell",
    },
  ]);

  const [bills, setBills] = useState<Bill[]>([
    {
      id: "1",
      title: "Rent",
      amount: 1200,
      dueDate: "May 1, 2023",
      isPaid: true,
      category: "Housing",
    },
    {
      id: "2",
      title: "Internet",
      amount: 65,
      dueDate: "May 15, 2023",
      isPaid: false,
      category: "Utilities",
    },
    {
      id: "3",
      title: "Phone Bill",
      amount: 85,
      dueDate: "May 18, 2023",
      isPaid: false,
      category: "Utilities",
    },
    {
      id: "4",
      title: "Car Insurance",
      amount: 120,
      dueDate: "May 22, 2023",
      isPaid: false,
      category: "Insurance",
    },
    {
      id: "5",
      title: "Streaming Services",
      amount: 25,
      dueDate: "May 28, 2023",
      isPaid: false,
      category: "Entertainment",
    },
  ]);

  const expenseChartData = {
    labels: ["Housing", "Food", "Transportation", "Utilities", "Entertainment", "Other"],
    datasets: [
      {
        data: [35, 20, 15, 12, 8, 10],
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

  const incomeVsExpenseData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Income",
        data: [4200, 4100, 4500, 4300, 4800, 4600],
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
      },
      {
        label: "Expenses",
        data: [3100, 3300, 3200, 3400, 3200, 3300],
        borderColor: "rgba(239, 68, 68, 1)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="space-y-6"
      >
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Finances</h1>
            <p className="text-muted-foreground">Manage your money and track expenses</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>Add Transaction</span>
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="bills">Bills</TabsTrigger>
              <TabsTrigger value="budgets">Budgets</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white dark:bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Wallet className="text-primary" size={18} />
                      Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$4,285.75</div>
                    <div className="text-xs text-green-500 mt-1 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> 12% from last month
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="text-primary" size={18} />
                      Income
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$4,850.00</div>
                    <div className="text-xs text-green-500 mt-1 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> 5% from last month
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="text-primary" size={18} />
                      Expenses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$2,450.00</div>
                    <div className="text-xs text-red-500 mt-1 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> 8% from last month
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-card">
                  <CardHeader>
                    <CardTitle>Expense Breakdown</CardTitle>
                    <CardDescription>Where your money is going</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <DoughnutChart data={expenseChartData} options={chartOptions} />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-card">
                  <CardHeader>
                    <CardTitle>Income vs Expenses</CardTitle>
                    <CardDescription>6-month comparison</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <LineChart data={incomeVsExpenseData} options={lineChartOptions} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white dark:bg-card">
                <CardHeader>
                  <CardTitle>Budget Progress</CardTitle>
                  <CardDescription>Monthly spending by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Housing</div>
                        <div className="text-sm text-muted-foreground">$1,200 / $1,200</div>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Food & Dining</div>
                        <div className="text-sm text-muted-foreground">$450 / $600</div>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Transportation</div>
                        <div className="text-sm text-muted-foreground">$280 / $400</div>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Utilities</div>
                        <div className="text-sm text-muted-foreground">$220 / $300</div>
                      </div>
                      <Progress value={73} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Entertainment</div>
                        <div className="text-sm text-muted-foreground">$150 / $200</div>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="transactions" className="space-y-6">
              <Card className="bg-white dark:bg-card">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your financial activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div 
                        key={transaction.id} 
                        className="flex justify-between items-center p-3 rounded-md bg-accent/50 hover:bg-accent transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${
                            transaction.type === "income" 
                              ? "bg-green-500/10 text-green-500" 
                              : "bg-red-500/10 text-red-500"
                          }`}>
                            {transaction.type === "income" 
                              ? <ArrowUpRight className="h-4 w-4" /> 
                              : <ArrowDownRight className="h-4 w-4" />
                            }
                          </div>
                          <div>
                            <div className="font-medium">{transaction.title}</div>
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {transaction.date}
                              {transaction.merchant && (
                                <>
                                  <span className="mx-1">•</span>
                                  <Building className="h-3 w-3 mr-1" />
                                  {transaction.merchant}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className={`font-medium ${
                            transaction.type === "income" 
                              ? "text-green-500" 
                              : "text-red-500"
                          }`}>
                            {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {transaction.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bills" className="space-y-6">
              <Card className="bg-white dark:bg-card">
                <CardHeader>
                  <CardTitle>Upcoming Bills</CardTitle>
                  <CardDescription>Bills due this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bills.map((bill) => (
                      <div 
                        key={bill.id} 
                        className="flex justify-between items-center p-3 rounded-md bg-accent/50 hover:bg-accent transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                            <CreditCard className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium">{bill.title}</div>
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Due: {bill.dueDate}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="font-medium">${bill.amount.toFixed(2)}</div>
                          <Badge 
                            variant={bill.isPaid ? "outline" : "default"} 
                            className={`text-xs ${bill.isPaid ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : ""}`}
                          >
                            {bill.isPaid ? "Paid" : "Unpaid"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="budgets" className="space-y-6">
              <Card className="bg-white dark:bg-card">
                <CardHeader>
                  <CardTitle>Monthly Budgets</CardTitle>
                  <CardDescription>Track your spending limits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Housing</div>
                        <div className="text-sm text-muted-foreground">$1,200 / $1,200</div>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Food & Dining</div>
                        <div className="text-sm text-muted-foreground">$450 / $600</div>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Transportation</div>
                        <div className="text-sm text-muted-foreground">$280 / $400</div>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Utilities</div>
                        <div className="text-sm text-muted-foreground">$220 / $300</div>
                      </div>
                      <Progress value={73} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Entertainment</div>
                        <div className="text-sm text-muted-foreground">$150 / $200</div>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Shopping</div>
                        <div className="text-sm text-muted-foreground">$120 / $300</div>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Healthcare</div>
                        <div className="text-sm text-muted-foreground">$80 / $200</div>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4">
                      <Plus size={16} className="mr-2" /> Create New Budget
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}