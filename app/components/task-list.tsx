"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle, Clock, Star } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  dueDate: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete project proposal",
      completed: false,
      priority: "high",
      dueDate: "Today"
    },
    {
      id: "2",
      title: "Schedule team meeting",
      completed: true,
      priority: "medium",
      dueDate: "Yesterday"
    },
    {
      id: "3",
      title: "Review quarterly reports",
      completed: false,
      priority: "medium",
      dueDate: "Tomorrow"
    },
    {
      id: "4",
      title: "Update client presentation",
      completed: false,
      priority: "high",
      dueDate: "Today"
    },
    {
      id: "5",
      title: "Send follow-up emails",
      completed: false,
      priority: "low",
      dueDate: "Next week"
    }
  ]);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
      default:
        return "text-slate-500";
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`p-3 rounded-lg flex items-center gap-3 ${
            task.completed 
              ? "bg-slate-50 dark:bg-slate-800/50" 
              : "bg-white dark:bg-slate-800 shadow-sm"
          }`}
        >
          <button
            onClick={() => toggleTaskCompletion(task.id)}
            className="flex-shrink-0"
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {task.completed ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6 text-slate-300 dark:text-slate-600" />
            )}
          </button>
          <div className="flex-grow">
            <p className={`${
              task.completed 
                ? "text-slate-500 dark:text-slate-400 line-through" 
                : "text-slate-800 dark:text-slate-200"
            }`}>
              {task.title}
            </p>
            <div className="flex items-center mt-1 text-xs">
              <span className="flex items-center text-slate-500 dark:text-slate-400">
                <Clock className="h-3 w-3 mr-1" />
                {task.dueDate}
              </span>
            </div>
          </div>
          <Star className={`h-5 w-5 flex-shrink-0 ${getPriorityColor(task.priority)}`} />
        </motion.div>
      ))}
    </div>
  );
}