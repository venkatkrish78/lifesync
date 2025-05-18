"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete project proposal", completed: false, priority: "high" },
    { id: "2", title: "Schedule dentist appointment", completed: false, priority: "medium" },
    { id: "3", title: "Buy groceries", completed: true, priority: "low" },
    { id: "4", title: "Review monthly budget", completed: false, priority: "high" },
    { id: "5", title: "Call insurance company", completed: false, priority: "medium" },
  ]);

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 dark:text-red-400";
      case "medium":
        return "text-yellow-500 dark:text-yellow-400";
      case "low":
        return "text-green-500 dark:text-green-400";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {tasks
          .filter((task) => !task.completed)
          .map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-start p-3 rounded-md bg-accent/50 hover:bg-accent transition-colors"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className="flex-shrink-0 mt-0.5"
              >
                <Circle className="h-5 w-5 text-muted-foreground" />
              </button>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">{task.title}</p>
                <p className={`text-xs ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </p>
              </div>
            </motion.div>
          ))}
      </div>

      <div className="border-t border-border pt-2">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Completed</h4>
        <div className="space-y-2">
          {tasks
            .filter((task) => task.completed)
            .map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start p-3 rounded-md bg-accent/30 hover:bg-accent/50 transition-colors"
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex-shrink-0 mt-0.5"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </button>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium line-through text-muted-foreground">
                    {task.title}
                  </p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      <Button variant="outline" className="w-full">
        <Plus size={16} className="mr-2" /> Add Task
      </Button>
    </div>
  );
}