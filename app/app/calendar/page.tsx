"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  MapPin, 
  Users,
  Tag
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EventForm from "@/components/modals/event-form";

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  attendees?: number;
  category: "work" | "personal" | "health" | "social" | "other";
};

export default function CalendarPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentMonth, setCurrentMonth] = useState("May 2023");
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Team Meeting",
      date: "May 15",
      time: "10:00 AM - 11:30 AM",
      location: "Conference Room A",
      attendees: 8,
      category: "work",
    },
    {
      id: "2",
      title: "Dentist Appointment",
      date: "May 16",
      time: "2:00 PM - 3:00 PM",
      location: "Smile Dental Clinic",
      category: "health",
    },
    {
      id: "3",
      title: "Dinner with Friends",
      date: "May 18",
      time: "7:00 PM - 9:30 PM",
      location: "Italian Restaurant",
      attendees: 5,
      category: "social",
    },
    {
      id: "4",
      title: "Project Deadline",
      date: "May 20",
      time: "11:59 PM",
      category: "work",
    },
    {
      id: "5",
      title: "Gym Session",
      date: "May 15",
      time: "6:00 PM - 7:30 PM",
      location: "Fitness Center",
      category: "health",
    },
    {
      id: "6",
      title: "Movie Night",
      date: "May 21",
      time: "8:00 PM - 10:30 PM",
      location: "Home",
      attendees: 2,
      category: "personal",
    },
  ]);

  const [isEventFormOpen, setIsEventFormOpen] = useState(false);

  const handleAddEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "work":
        return "bg-blue-500/10 text-blue-500";
      case "personal":
        return "bg-purple-500/10 text-purple-500";
      case "health":
        return "bg-green-500/10 text-green-500";
      case "social":
        return "bg-orange-500/10 text-orange-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  // Generate calendar days
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-muted-foreground">Manage your schedule and events</p>
          </div>
          <Button className="flex items-center gap-2" onClick={() => setIsEventFormOpen(true)}>
            <Plus size={16} />
            <span>New Event</span>
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">{currentMonth}</h2>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="hidden sm:flex">Today</Button>
            <Button variant="outline" className="hidden md:flex">Day</Button>
            <Button variant="outline" className="hidden md:flex">Week</Button>
            <Button variant="secondary">Month</Button>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="grid grid-cols-7 gap-1 mb-4">
          {weekdays.map((day) => (
            <div key={day} className="text-center text-sm font-medium py-2">
              {day}
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before the 1st of the month */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={`empty-${index}`} className="h-24 p-1 bg-accent/30 rounded-md"></div>
          ))}
          
          {calendarDays.map((day) => {
            const dayEvents = events.filter(event => event.date === `May ${day}`);
            const hasEvents = dayEvents.length > 0;
            
            return (
              <div 
                key={day} 
                className={`h-24 p-1 rounded-md border border-border ${
                  hasEvents ? 'bg-accent/50' : 'bg-accent/30'
                } hover:bg-accent transition-colors`}
              >
                <div className="text-right text-sm p-1">{day}</div>
                <div className="overflow-hidden">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div 
                      key={event.id} 
                      className={`text-xs p-1 mb-1 rounded truncate ${getCategoryColor(event.category)}`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-center">+{dayEvents.length - 2} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeInUp}>
          <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {events.slice(0, 4).map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow bg-white dark:bg-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{event.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.attendees && (
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      )}
                    </div>
                    <Badge className={getCategoryColor(event.category)}>
                      <Tag className="h-3 w-3 mr-1" />
                      {event.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <EventForm 
        isOpen={isEventFormOpen} 
        onClose={() => setIsEventFormOpen(false)} 
        onSave={handleAddEvent}
      />
    </div>
  );
}