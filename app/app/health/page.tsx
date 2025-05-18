"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Heart, 
  Activity, 
  Footprints, 
  Moon, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Calendar,
  Clock,
  Utensils,
  Dumbbell,
  Droplets
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

const LineChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Line),
  {
    ssr: false,
    loading: () => <div className="h-[250px] flex items-center justify-center">Loading chart...</div>,
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

type HealthActivity = {
  id: string;
  title: string;
  type: "exercise" | "nutrition" | "sleep" | "water" | "other";
  date: string;
  time?: string;
  duration?: string;
  value?: string;
  notes?: string;
};

export default function HealthPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState("overview");
  
  const [activities, setActivities] = useState<HealthActivity[]>([
    {
      id: "1",
      title: "Morning Run",
      type: "exercise",
      date: "Today",
      time: "6:30 AM",
      duration: "30 min",
      value: "3.2 miles",
      notes: "Felt good, maintained steady pace",
    },
    {
      id: "2",
      title: "Breakfast",
      type: "nutrition",
      date: "Today",
      time: "8:00 AM",
      notes: "Oatmeal with berries and nuts",
    },
    {
      id: "3",
      title: "Water Intake",
      type: "water",
      date: "Today",
      value: "32 oz",
    },
    {
      id: "4",
      title: "Yoga Session",
      type: "exercise",
      date: "Yesterday",
      time: "7:00 PM",
      duration: "45 min",
      notes: "Focus on flexibility and breathing",
    },
    {
      id: "5",
      title: "Sleep",
      type: "sleep",
      date: "Yesterday",
      duration: "7.5 hours",
      notes: "Woke up once, but overall good quality",
    },
    {
      id: "6",
      title: "Strength Training",
      type: "exercise",
      date: "May 12, 2023",
      time: "5:30 PM",
      duration: "50 min",
      notes: "Upper body focus, increased weights",
    },
  ]);

  const stepsChartData = {
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

  const heartRateChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Resting Heart Rate",
        data: [68, 72, 70, 69, 71, 73, 72],
        borderColor: "rgba(239, 68, 68, 1)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const sleepChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sleep Hours",
        data: [7.2, 6.8, 7.5, 8.1, 6.5, 7.9, 7.2],
        borderColor: "rgba(139, 92, 246, 1)",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "exercise":
        return <Dumbbell className="h-4 w-4" />;
      case "nutrition":
        return <Utensils className="h-4 w-4" />;
      case "sleep":
        return <Moon className="h-4 w-4" />;
      case "water":
        return <Droplets className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "exercise":
        return "bg-green-500/10 text-green-500";
      case "nutrition":
        return "bg-orange-500/10 text-orange-500";
      case "sleep":
        return "bg-purple-500/10 text-purple-500";
      case "water":
        return "bg-blue-500/10 text-blue-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
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
            <h1 className="text-3xl font-bold">Health & Wellness</h1>
            <p className="text-muted-foreground">Track your health metrics and activities</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>Log Activity</span>
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="sleep">Sleep</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white dark:bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Heart className="text-red-500" size={18} />
                      Heart Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">72 <span className="text-xs font-normal">bpm</span></div>
                    <div className="text-xs text-green-500 mt-1 flex items-center">
                      <TrendingDown className="h-3 w-3 mr-1" /> 3 bpm from yesterday
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Footprints className="text-primary" size={18} />
                      Daily Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">7,842</div>
                    <div className="text-xs text-muted-foreground mt-1">Goal: 10,000 steps</div>
                    <Progress value={78} className="h-2 mt-2" />
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Moon className="text-purple-500" size={18} />
                      Sleep
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">7.2 <span className="text-xs font-normal">hrs</span></div>
                    <div className="text-xs text-green-500 mt-1 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" /> 0.5 hrs from yesterday
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-card">
                  <CardHeader>
                    <CardTitle>Steps This Week</CardTitle>
                    <CardDescription>Daily step count</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <LineChart data={stepsChartData} options={chartOptions} />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-card">
                  <CardHeader>
                    <CardTitle>Heart Rate Trends</CardTitle>
                    <CardDescription>Resting heart rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <LineChart data={heartRateChartData} options={chartOptions} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white dark:bg-card">
                <CardHeader>
                  <CardTitle>Sleep Analysis</CardTitle>
                  <CardDescription>Hours of sleep per night</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <LineChart data={sleepChartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-card">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Your latest health activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.slice(0, 4).map((activity) => (
                      <div 
                        key={activity.id} 
                        className="flex items-start gap-3 p-3 rounded-md bg-accent/50 hover:bg-accent transition-colors"
                      >
                        <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {activity.date}
                            {activity.time && (
                              <>
                                <span className="mx-1">•</span>
                                <Clock className="h-3 w-3 mr-1" />
                                {activity.time}
                              </>
                            )}
                          </div>
                          {(activity.duration || activity.value) && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {activity.duration && <span>{activity.duration}</span>}
                              {activity.duration && activity.value && <span className="mx-1">•</span>}
                              {activity.value && <span>{activity.value}</span>}
                            </div>
                          )}
                        </div>
                        <Badge variant="outline" className={`text-xs ${getActivityColor(activity.type)}`}>
                          {activity.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity" className="space-y-6">
              <Card className="bg-white dark:bg-card">
                <CardHeader>
                  <CardTitle>Activity Log</CardTitle>
                  <CardDescription>Your exercise and physical activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities
                      .filter(activity => activity.type === "exercise")
                      .map((activity) => (
                        <div 
                          key={activity.id} 
                          className="flex items-start gap-3 p-3 rounded-md bg-accent/50 hover:bg-accent transition-colors"
                        >
                          <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{activity.title}</div>
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {activity.date}
                              {activity.time && (
                                <>
                                  <span className="mx-1">•</span>
                                  <Clock className="h-3 w-3 mr-1" />
                                  {activity.time}
                                </>
                              )}
                            </div>
                            {(activity.duration || activity.value) && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {activity.duration && <span>{activity.duration}</span>}
                                {activity.duration && activity.value && <span className="mx-1">•</span>}
                                {activity.value && <span>{activity.value}</span>}
                              </div>
                            )}
                            {activity.notes && (
                              <div className="text-xs text-muted-foreground mt-1">
                                Notes: {activity.notes}
                              </div>
                            )}
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Plus size={16} className="mr-2" /> Log Exercise
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-card">
                <CardHeader>
                  <CardTitle>Steps Overview</CardTitle>
                  <CardDescription>Daily step count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <LineChart data={stepsChartData} options={chartOptions} />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Today's Progress</div>
                      <div className="text-sm text-muted-foreground">7,842 / 10,000</div>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="nutrition" className="space-y-6">
              <Card className="bg-white dark:bg-card">
                <CardHeader>
                  <CardTitle>Nutrition Log</CardTitle>
                  <CardDescription>Your meals and nutrition intake</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities
                      .filter(activity => activity.type === "nutrition" || activity.type === "water")
                      .map((activity) => (
                        <div 
                          key={activity.id} 
                          className="flex items-start gap-3 p-3 rounded-md bg-accent/50 hover:bg-accent transition-colors"
                        >
                          <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{activity.title}</div>
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {activity.date}
                              {activity.time && (
                                <>
                                  <span className="mx-1">•</span>
                                  <Clock className="h-3 w-3 mr-1" />
                                  {activity.time}
                                </>
                              )}
                            </div>
                            {activity.value && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {activity.value}
                              </div>
                            )}
                            {activity.notes && (
                              <div className="text-xs text-muted-foreground mt-1">
                                Notes: {activity.notes}
                              </div>
                            )}
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1">
                      <Utensils size={16} className="mr-2" /> Log Meal
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Droplets size={16} className="mr-2" /> Log Water
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-card">
                <CardHeader>
                  <CardTitle>Water Intake</CardTitle>
                  <CardDescription>Daily hydration tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">32 <span className="text-xs font-normal">oz</span></div>
                  <div className="text-xs text-muted-foreground mt-1">Goal: 64 oz</div>
                  <Progress value={50} className="h-2 mt-2" />
                  <div className="grid grid-cols-8 gap-2 mt-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <Button 
                        key={index} 
                        variant={index < 4 ? "default" : "outline"} 
                        size="icon" 
                        className="h-10 w-full"
                      >
                        <Droplets className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sleep" className="space-y-6">
              <Card className="bg-white dark:bg-card">
                <CardHeader>
                  <CardTitle>Sleep Log</CardTitle>
                  <CardDescription>Your sleep patterns and quality</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities
                      .filter(activity => activity.type === "sleep")
                      .map((activity) => (
                        <div 
                          key={activity.id} 
                          className="flex items-start gap-3 p-3 rounded-md bg-accent/50 hover:bg-accent transition-colors"
                        >
                          <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{activity.title}</div>
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {activity.date}
                            </div>
                            {activity.duration && (
                              <div className="text-xs text-muted-foreground mt-1">
                                Duration: {activity.duration}
                              </div>
                            )}
                            {activity.notes && (
                              <div className="text-xs text-muted-foreground mt-1">
                                Notes: {activity.notes}
                              </div>
                            )}
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Moon size={16} className="mr-2" /> Log Sleep
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-card">
                <CardHeader>
                  <CardTitle>Sleep Analysis</CardTitle>
                  <CardDescription>Hours of sleep per night</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <LineChart data={sleepChartData} options={chartOptions} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-accent/50 p-3 rounded-md">
                      <div className="text-sm text-muted-foreground">Average</div>
                      <div className="text-xl font-bold">7.3 hrs</div>
                    </div>
                    <div className="bg-accent/50 p-3 rounded-md">
                      <div className="text-sm text-muted-foreground">Best</div>
                      <div className="text-xl font-bold">8.1 hrs</div>
                    </div>
                    <div className="bg-accent/50 p-3 rounded-md">
                      <div className="text-sm text-muted-foreground">Goal</div>
                      <div className="text-xl font-bold">8.0 hrs</div>
                    </div>
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