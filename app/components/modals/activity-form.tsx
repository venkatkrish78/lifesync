"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Activity,
  Dumbbell,
  Utensils,
  Moon,
  Droplets
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ActivityFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: any) => void;
}

export default function ActivityForm({ isOpen, onClose, onSave }: ActivityFormProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"exercise" | "nutrition" | "sleep" | "water" | "other">("exercise");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !date || !type) return;
    
    const newActivity = {
      id: Date.now().toString(),
      title,
      type,
      date,
      time: time || undefined,
      duration: duration || undefined,
      value: value || undefined,
      notes: notes || undefined
    };
    
    onSave(newActivity);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setType("exercise");
    setDate("");
    setTime("");
    setDuration("");
    setValue("");
    setNotes("");
  };

  const getTypeIcon = () => {
    switch (type) {
      case "exercise":
        return <Dumbbell className="h-4 w-4" />;
      case "nutrition":
        return <Utensils className="h-4 w-4" />;
      case "sleep":
        return <Moon className="h-4 w-4" />;
      case "water":
        return <Droplets className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getValueLabel = () => {
    switch (type) {
      case "exercise":
        return "Distance/Reps";
      case "nutrition":
        return "Calories/Portion";
      case "sleep":
        return "Quality (1-10)";
      case "water":
        return "Amount (oz/ml)";
      default:
        return "Value";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Log Health Activity</DialogTitle>
            <DialogDescription>
              Record a new health or wellness activity. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Activity Type</Label>
              <Select value={type} onValueChange={(value) => setType(value as any)}>
                <SelectTrigger className="flex items-center gap-2">
                  {getTypeIcon()}
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exercise">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="h-4 w-4" />
                      <span>Exercise</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="nutrition">
                    <div className="flex items-center gap-2">
                      <Utensils className="h-4 w-4" />
                      <span>Nutrition</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="sleep">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      <span>Sleep</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="water">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4" />
                      <span>Water</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="other">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      <span>Other</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="title">Activity Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} activity title`}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date" className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" /> Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="time" className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {type !== "water" && (
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder={type === "sleep" ? "Hours of sleep" : "Duration (e.g., 30 min)"}
                  />
                </div>
              )}
              
              <div className={`grid gap-2 ${type === "water" ? "col-span-2" : ""}`}>
                <Label htmlFor="value">{getValueLabel()}</Label>
                <Input
                  id="value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={
                    type === "exercise" ? "e.g., 5 miles, 3 sets" : 
                    type === "nutrition" ? "e.g., 500 calories" :
                    type === "sleep" ? "Sleep quality (1-10)" :
                    type === "water" ? "e.g., 16 oz" : "Value"
                  }
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional notes (optional)"
                className="min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Activity</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}