"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

interface Event {
  id: string;
  title: string;
  time: string;
  type: "meeting" | "personal" | "deadline";
}

export default function CalendarWidget() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Team Standup",
      time: "9:00 AM",
      type: "meeting"
    },
    {
      id: "2",
      title: "Project Review",
      time: "11:30 AM",
      type: "meeting"
    },
    {
      id: "3",
      title: "Lunch with Alex",
      time: "1:00 PM",
      type: "personal"
    },
    {
      id: "4",
      title: "Submit Report",
      time: "5:00 PM",
      type: "deadline"
    }
  ]);

  const getEventTypeStyles = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400";
      case "personal":
        return "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400";
      case "deadline":
        return "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400";
      default:
        return "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-blue-500" />
          <h3 className="font-medium">{formattedDate}</h3>
        </div>
      </div>
      
      <div className="space-y-2">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex-shrink-0 w-16 text-sm text-slate-500 dark:text-slate-400 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {event.time}
            </div>
            <div className={`ml-2 px-2 py-1 rounded text-sm ${getEventTypeStyles(event.type)}`}>
              {event.title}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}