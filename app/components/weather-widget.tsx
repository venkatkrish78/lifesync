"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cloud, CloudRain, MapPin, Sun, Thermometer } from "lucide-react";

export default function WeatherWidget() {
  const [weather] = useState({
    location: "San Francisco",
    temperature: 68,
    condition: "Partly Cloudy",
    high: 72,
    low: 58,
    humidity: 65,
    wind: 8
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-10 w-10 text-amber-500" />;
      case "partly cloudy":
        return <Cloud className="h-10 w-10 text-slate-400" />;
      case "rainy":
        return <CloudRain className="h-10 w-10 text-blue-400" />;
      default:
        return <Sun className="h-10 w-10 text-amber-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-800 text-white rounded-xl shadow-sm overflow-hidden h-full"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <h3 className="font-medium">{weather.location}</h3>
          </div>
          <span className="text-xs text-blue-100">Today</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getWeatherIcon(weather.condition)}
            <div className="ml-3">
              <div className="text-3xl font-bold">{weather.temperature}°F</div>
              <div className="text-sm text-blue-100">{weather.condition}</div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm">
              <span className="font-medium">{weather.high}°</span> / {weather.low}°
            </div>
            <div className="text-xs text-blue-100 mt-1">
              Humidity: {weather.humidity}%
            </div>
            <div className="text-xs text-blue-100">
              Wind: {weather.wind} mph
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm p-3 mt-2">
        <div className="grid grid-cols-5 gap-2 text-center">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
            <div key={day} className="text-xs">
              <div className="mb-1">{day}</div>
              <Thermometer className="h-3 w-3 mx-auto mb-1" />
              <div>{Math.round(weather.temperature - 2 + i * 2)}°</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}