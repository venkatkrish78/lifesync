"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, Sun, Bell, Sparkles } from "lucide-react";

export default function DailyBriefing() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Set initial time and date
    updateTimeAndDate();
    
    // Update time every minute
    const interval = setInterval(updateTimeAndDate, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const updateTimeAndDate = () => {
    const now = new Date();
    
    // Format time (e.g., "8:30 AM")
    setCurrentTime(now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    }));
    
    // Format date (e.g., "Monday, May 15, 2023")
    setCurrentDate(now.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="mb-8"
    >
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center mb-2">
                <Clock className="mr-2 h-5 w-5" />
                <span className="text-xl font-bold">{currentTime}</span>
              </div>
              <div className="flex items-center mb-4">
                <Calendar className="mr-2 h-5 w-5" />
                <span className="text-lg">{currentDate}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Good morning, John!</h2>
              <p className="text-white/80 max-w-md">
                You have 3 tasks due today and 2 upcoming meetings. Your budget is on track for this month.
              </p>
            </div>
            
            <div className="flex flex-col md:items-end">
              <div className="flex items-center mb-4">
                <Sun className="h-8 w-8 mr-2 text-yellow-300" />
                <div>
                  <div className="text-2xl font-bold">72°F</div>
                  <div className="text-white/80">Sunny, New York</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-white/20 rounded-full px-3 py-1 text-sm flex items-center">
                  <Bell className="h-4 w-4 mr-1" />
                  <span>3 reminders</span>
                </div>
                <div className="bg-white/20 rounded-full px-3 py-1 text-sm flex items-center">
                  <Sparkles className="h-4 w-4 mr-1" />
                  <span>5 day streak</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}