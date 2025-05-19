"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Tag, 
  Flag,
  CheckCircle2,
  Circle,
  Trash,
  Edit
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TaskForm from "@/components/modals/task-form";
import { toast } from "sonner";

type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  tags: string[];
  list: string;
};

export default function TasksPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete project proposal",
      description: "Finish the Q3 project proposal with budget estimates",
      dueDate: "May 15, 2023",
      priority: "high",
      completed: false,
      tags: ["work", "project"],
      list: "Work",
    },
    {
      id: "2",
      title: "Schedule dentist appointment",
      dueDate: "May 20, 2023",
      priority: "medium",
      completed: false,
      tags: ["health", "personal"],
      list: "Personal",
    },
    {
      id: "3",
      title: "Buy groceries",
      description: "Milk, eggs, bread, vegetables, and fruits",
      dueDate: "Today",
      priority: "low",
      completed: true,
      tags: ["shopping", "personal"],
      list: "Shopping",
    },
    {
      id: "4",
      title: "Review monthly budget",
      dueDate: "May 18, 2023",
      priority: "high",
      completed: false,
      tags: ["finance", "personal"],
      list: "Personal",
    },
    {
      id: "5",
      title: "Call insurance company",
      description: "Discuss the new policy options",
      dueDate: "Tomorrow",
      priority: "medium",
      completed: false,
      tags: ["finance", "personal"],
      list: "Personal",
    },
    {
      id: "6",
      title: "Prepare presentation slides",
      description: "Create slides for the client meeting",
      dueDate: "May 17, 2023",
      priority: "high",
      completed: false,
      tags: ["work", "presentation"],
      list: "Work",
    },
    {
      id: "7",
      title: "Renew gym membership",
      dueDate: "May 25, 2023",
      priority: "low",
      completed: false,
      tags: ["health", "personal"],
      list: "Personal",
    },
    {
      id: "8",
      title: "Update resume",
      description: "Add recent projects and skills",
      dueDate: "May 30, 2023",
      priority: "medium",
      completed: false,
      tags: ["career", "personal"],
      list: "Personal",
    },
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

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "low":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      default:
        return "";
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
            <h1 className="text-3xl font-bold">Tasks</h1>
            <p className="text-muted-foreground">Manage your to-do list and stay productive</p>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsTaskFormOpen(true)}
          >
            <Plus size={16} />
            <span>New Task</span>
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input placeholder="Search tasks..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Tasks</DropdownMenuItem>
                <DropdownMenuItem>High Priority</DropdownMenuItem>
                <DropdownMenuItem>Due Today</DropdownMenuItem>
                <DropdownMenuItem>Completed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id} className={`overflow-hidden hover:shadow-md transition-shadow ${task.completed ? 'bg-white/50 dark:bg-card/50' : 'bg-white dark:bg-card'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="flex-shrink-0 mt-1"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>
                      <div className="flex-1">
                        <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className={`text-sm text-muted-foreground mt-1 ${task.completed ? 'line-through' : ''}`}>
                            {task.description}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {task.dueDate && (
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {task.dueDate}
                            </div>
                          )}
                          <Badge variant="outline" className={`text-xs ${getPriorityBadgeColor(task.priority)}`}>
                            <Flag className="h-3 w-3 mr-1" />
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {task.list}
                          </Badge>
                          {task.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="today" className="space-y-4">
              {tasks
                .filter(task => task.dueDate === "Today")
                .map((task) => (
                  <Card key={task.id} className={`overflow-hidden hover:shadow-md transition-shadow ${task.completed ? 'bg-white/50 dark:bg-card/50' : 'bg-white dark:bg-card'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="flex-shrink-0 mt-1"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </button>
                        <div className="flex-1">
                          <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className={`text-sm text-muted-foreground mt-1 ${task.completed ? 'line-through' : ''}`}>
                              {task.description}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge variant="outline" className={`text-xs ${getPriorityBadgeColor(task.priority)}`}>
                              <Flag className="h-3 w-3 mr-1" />
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {task.list}
                            </Badge>
                            {task.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
            
            <TabsContent value="upcoming" className="space-y-4">
              {tasks
                .filter(task => task.dueDate !== "Today" && !task.completed)
                .map((task) => (
                  <Card key={task.id} className="bg-white dark:bg-card overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="flex-shrink-0 mt-1"
                        >
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        </button>
                        <div className="flex-1">
                          <h3 className="font-medium">{task.title}</h3>
                          {task.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {task.description}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            {task.dueDate && (
                              <div className="text-xs text-muted-foreground flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {task.dueDate}
                              </div>
                            )}
                            <Badge variant="outline" className={`text-xs ${getPriorityBadgeColor(task.priority)}`}>
                              <Flag className="h-3 w-3 mr-1" />
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {task.list}
                            </Badge>
                            {task.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {tasks
                .filter(task => task.completed)
                .map((task) => (
                  <Card key={task.id} className="bg-white/50 dark:bg-card/50 overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="flex-shrink-0 mt-1"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        </button>
                        <div className="flex-1">
                          <h3 className="font-medium line-through text-muted-foreground">
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-through">
                              {task.description}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            {task.dueDate && (
                              <div className="text-xs text-muted-foreground flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {task.dueDate}
                              </div>
                            )}
                            <Badge variant="outline" className="text-xs opacity-70">
                              <Flag className="h-3 w-3 mr-1" />
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </Badge>
                            <Badge variant="outline" className="text-xs opacity-70">
                              {task.list}
                            </Badge>
                            {task.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs opacity-70">
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>

      {/* Task Form Modal */}
      <TaskForm 
        isOpen={isTaskFormOpen} 
        onClose={() => {
          setIsTaskFormOpen(false);
        }}
        onSave={(task) => {
          console.log("New task:", task);
          setTasks([task, ...tasks]);
          setIsTaskFormOpen(false);
          toast.success("New task created!");
        }}
      />
    </div>
  );
}