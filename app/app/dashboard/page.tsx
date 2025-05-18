"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  LineChart, 
  ListTodo, 
  Plus, 
  Settings, 
  Wallet 
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useUserProfile } from "@/hooks/use-user-profile";
import DashboardWidget from "@/components/dashboard-widget";
import TaskList from "@/components/task-list";
import NotesList from "@/components/notes-list";
import FinanceWidget from "@/components/finance-widget";
import HealthWidget from "@/components/health-widget";
import CalendarWidget from "@/components/calendar-widget";
import WeatherWidget from "@/components/weather-widget";

export default function Dashboard() {
  const { userProfile } = useUserProfile();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if Ctrl/Cmd is pressed
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault();
            toast.info("Keyboard shortcut: New Note");
            break;
          case 't':
            e.preventDefault();
            toast.info("Keyboard shortcut: New Task");
            break;
          case 'f':
            e.preventDefault();
            toast.info("Keyboard shortcut: Search");
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-200 dark:bg-slate-700 rounded-xl h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, {userProfile?.name || "User"}
          </h1>
          <Link 
            href="/dashboard/settings" 
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          >
            <Settings className="h-6 w-6" />
          </Link>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Tasks Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2"
          >
            <DashboardWidget 
              title="Tasks" 
              icon={<ListTodo />}
              actionIcon={<Plus />}
              actionLabel="Add Task"
              onAction={() => toast.success("New task created!")}
            >
              <TaskList />
            </DashboardWidget>
          </motion.div>

          {/* Weather Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <WeatherWidget />
          </motion.div>

          {/* Notes Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <DashboardWidget 
              title="Recent Notes" 
              icon={<FileText />}
              actionIcon={<Plus />}
              actionLabel="Add Note"
              onAction={() => toast.success("New note created!")}
            >
              <NotesList />
            </DashboardWidget>
          </motion.div>

          {/* Finance Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <DashboardWidget 
              title="Finance" 
              icon={<Wallet />}
              actionIcon={<BarChart3 />}
              actionLabel="View Reports"
              onAction={() => toast.success("Opening finance reports!")}
            >
              <FinanceWidget />
            </DashboardWidget>
          </motion.div>

          {/* Calendar Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <DashboardWidget 
              title="Calendar" 
              icon={<Calendar />}
              actionIcon={<Plus />}
              actionLabel="Add Event"
              onAction={() => toast.success("New event created!")}
            >
              <CalendarWidget />
            </DashboardWidget>
          </motion.div>

          {/* Health Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <DashboardWidget 
              title="Health & Wellness" 
              icon={<LineChart />}
              actionIcon={<CheckCircle2 />}
              actionLabel="Log Activity"
              onAction={() => toast.success("Activity logged!")}
            >
              <HealthWidget />
            </DashboardWidget>
          </motion.div>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Keyboard shortcuts: Ctrl/Cmd + N (New Note), Ctrl/Cmd + T (New Task), Ctrl/Cmd + F (Search)</p>
        </div>
      </div>
    </div>
  );
}