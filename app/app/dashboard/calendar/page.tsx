"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Plus, 
  Tag, 
  User 
} from "lucide-react";
import { toast } from "sonner";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "meeting" | "personal" | "deadline" | "reminder";
  attendees?: string[];
  location?: string;
}

export default function CalendarPage() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [currentMonth] = useState("May 2023");
  
  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Team Standup",
      date: "May 15, 2023",
      time: "9:00 AM - 9:30 AM",
      type: "meeting",
      attendees: ["Alex Smith", "Jamie Lee", "Taylor Wong"],
      location: "Conference Room A"
    },
    {
      id: "2",
      title: "Project Review",
      date: "May 15, 2023",
      time: "11:30 AM - 12:30 PM",
      type: "meeting",
      attendees: ["Alex Smith", "Casey Johnson"],
      location: "Zoom Meeting"
    },
    {
      id: "3",
      title: "Lunch with Alex",
      date: "May 15, 2023",
      time: "1:00 PM - 2:00 PM",
      type: "personal",
      location: "Cafe Deluxe"
    },
    {
      id: "4",
      title: "Submit Report",
      date: "May 15, 2023",
      time: "5:00 PM",
      type: "deadline"
    },
    {
      id: "5",
      title: "Dentist Appointment",
      date: "May 17, 2023",
      time: "10:00 AM - 11:00 AM",
      type: "personal",
      location: "Downtown Dental"
    },
    {
      id: "6",
      title: "Client Presentation",
      date: "May 18, 2023",
      time: "2:00 PM - 3:30 PM",
      type: "meeting",
      attendees: ["Alex Smith", "Jamie Lee", "Client Team"],
      location: "Client Office"
    },
    {
      id: "7",
      title: "Pay Rent",
      date: "May 31, 2023",
      time: "All Day",
      type: "reminder"
    }
  ]);

  const getEventTypeStyles = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "personal":
        return "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800";
      case "deadline":
        return "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800";
      case "reminder":
        return "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800";
      default:
        return "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-600";
    }
  };

  const handleCreateEvent = () => {
    toast.success("New event created!");
  };

  // Generate calendar days
  const calendarDays = [];
  const daysInMonth = 31; // For May
  const firstDayOfMonth = 1; // Monday (0 = Sunday, 1 = Monday, etc.)
  
  // Add empty cells for days before the 1st of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Group events by date for the current day view (May 15)
  const currentDayEvents = events.filter(event => event.date === "May 15, 2023");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Calendar</h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCreateEvent}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-blue-500" />
                  <h2 className="font-semibold">{currentMonth}</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 text-center border-b border-slate-200 dark:border-slate-700">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                  <div key={day} className="py-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                    {day}
                  </div>
                ))}
              </div>
              
              <div 
                ref={ref}
                className="grid grid-cols-7 text-center"
              >
                {calendarDays.map((day, index) => {
                  // Check if this day has events
                  const dayEvents = day ? events.filter(event => event.date === `May ${day}, 2023`) : [];
                  const isToday = day === 15; // Assuming today is May 15
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.01 }}
                      className={`p-2 min-h-[80px] border-b border-r border-slate-200 dark:border-slate-700 ${
                        isToday ? "bg-blue-50 dark:bg-blue-900/20" : ""
                      }`}
                    >
                      {day && (
                        <>
                          <div className={`text-sm mb-1 ${
                            isToday 
                              ? "font-bold text-blue-600 dark:text-blue-400" 
                              : "text-slate-700 dark:text-slate-300"
                          }`}>
                            {day}
                          </div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map(event => (
                              <div 
                                key={event.id}
                                className={`text-xs px-1.5 py-0.5 rounded truncate ${getEventTypeStyles(event.type)}`}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Day View */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="font-semibold">May 15, 2023</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Monday</p>
              </div>
              
              <div className="p-4 space-y-4">
                {currentDayEvents.length > 0 ? (
                  currentDayEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-3 rounded-lg border ${getEventTypeStyles(event.type)}`}
                    >
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex items-center text-sm mt-2">
                        <Clock className="h-3.5 w-3.5 mr-1.5" />
                        <span>{event.time}</span>
                      </div>
                      
                      {event.location && (
                        <div className="flex items-start text-sm mt-1">
                          <Tag className="h-3.5 w-3.5 mr-1.5 mt-0.5" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      
                      {event.attendees && event.attendees.length > 0 && (
                        <div className="flex items-start text-sm mt-1">
                          <User className="h-3.5 w-3.5 mr-1.5 mt-0.5" />
                          <span>{event.attendees.join(", ")}</span>
                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-500 dark:text-slate-400">No events scheduled for today</p>
                    <button 
                      onClick={handleCreateEvent}
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-flex items-center transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}