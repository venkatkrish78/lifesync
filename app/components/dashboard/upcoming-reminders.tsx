"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ShoppingCart, Phone, Pill, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Reminder = {
  id: string;
  title: string;
  time: string;
  date: string;
  type: "appointment" | "task" | "shopping" | "call" | "medication" | "other";
};

export default function UpcomingReminders() {
  const reminders: Reminder[] = [
    {
      id: "1",
      title: "Team meeting",
      time: "10:00 AM",
      date: "Today",
      type: "appointment",
    },
    {
      id: "2",
      title: "Pick up groceries",
      time: "4:30 PM",
      date: "Today",
      type: "shopping",
    },
    {
      id: "3",
      title: "Call dentist",
      time: "2:00 PM",
      date: "Tomorrow",
      type: "call",
    },
    {
      id: "4",
      title: "Take medication",
      time: "8:00 PM",
      date: "Today",
      type: "medication",
    },
    {
      id: "5",
      title: "Car maintenance",
      time: "11:30 AM",
      date: "May 15",
      type: "other",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-4 w-4" />;
      case "shopping":
        return <ShoppingCart className="h-4 w-4" />;
      case "call":
        return <Phone className="h-4 w-4" />;
      case "medication":
        return <Pill className="h-4 w-4" />;
      case "other":
        return <Car className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "bg-blue-500/10 text-blue-500";
      case "shopping":
        return "bg-green-500/10 text-green-500";
      case "call":
        return "bg-purple-500/10 text-purple-500";
      case "medication":
        return "bg-red-500/10 text-red-500";
      case "other":
        return "bg-orange-500/10 text-orange-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {reminders.map((reminder, index) => (
          <motion.div
            key={reminder.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="flex items-center p-3 rounded-md bg-accent/50 hover:bg-accent transition-colors"
          >
            <div className={`p-2 rounded-full ${getTypeColor(reminder.type)}`}>
              {getIcon(reminder.type)}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{reminder.title}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {reminder.time} • {reminder.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        View All Reminders
      </Button>
    </div>
  );
}