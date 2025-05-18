"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  FileText, 
  Plus, 
  Search, 
  Tag, 
  Star, 
  Clock, 
  Filter, 
  SortDesc,
  Pin,
  Trash
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NoteForm from "@/components/modals/note-form";

type Note = {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  isPinned: boolean;
};

export default function NotesPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Project Ideas",
      content: "List of potential projects to work on in Q3:\n- Mobile app redesign\n- Customer feedback system\n- Internal dashboard improvements\n- API performance optimization",
      date: "2 hours ago",
      tags: ["work", "ideas"],
      isPinned: true,
    },
    {
      id: "2",
      title: "Meeting Notes: Marketing Strategy",
      content: "Discussion about the new campaign launch:\n- Target audience: 25-34 year olds\n- Focus on social media channels\n- Budget allocation: $15,000\n- Timeline: Launch in 3 weeks",
      date: "Yesterday",
      tags: ["work", "marketing"],
      isPinned: false,
    },
    {
      id: "3",
      title: "Grocery List",
      content: "Items to buy for the weekend dinner party:\n- Chicken (2 lbs)\n- Vegetables (bell peppers, zucchini, onions)\n- Rice\n- Wine (2 bottles)\n- Dessert ingredients",
      date: "2 days ago",
      tags: ["personal", "shopping"],
      isPinned: false,
    },
    {
      id: "4",
      title: "Book Recommendations",
      content: "Fiction and non-fiction books to read this summer:\n- The Midnight Library by Matt Haig\n- Atomic Habits by James Clear\n- Project Hail Mary by Andy Weir\n- The Psychology of Money by Morgan Housel",
      date: "3 days ago",
      tags: ["personal", "reading"],
      isPinned: false,
    },
    {
      id: "5",
      title: "Workout Plan",
      content: "Weekly exercise routine:\n- Monday: Upper body + 20 min cardio\n- Tuesday: Lower body + core\n- Wednesday: Rest day\n- Thursday: Full body HIIT\n- Friday: Yoga\n- Weekend: Outdoor activities",
      date: "5 days ago",
      tags: ["health", "fitness"],
      isPinned: true,
    },
    {
      id: "6",
      title: "Travel Itinerary: NYC Trip",
      content: "4-day New York City trip plan:\n- Day 1: Arrive, check-in, explore neighborhood\n- Day 2: Central Park, MoMA, Broadway show\n- Day 3: Statue of Liberty, 9/11 Memorial, shopping\n- Day 4: Brooklyn Bridge, checkout, departure",
      date: "1 week ago",
      tags: ["travel", "planning"],
      isPinned: false,
    },
  ]);

  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);

  const handleAddNote = (newNote: Note) => {
    setNotes([newNote, ...notes]);
  };

  const togglePin = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
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
            <h1 className="text-3xl font-bold">Notes</h1>
            <p className="text-muted-foreground">Capture and organize your thoughts</p>
          </div>
          <Button className="flex items-center gap-2" onClick={() => setIsNoteFormOpen(true)}>
            <Plus size={16} />
            <span>New Note</span>
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input placeholder="Search notes..." className="pl-10" />
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
                <DropdownMenuItem>All Notes</DropdownMenuItem>
                <DropdownMenuItem>Pinned</DropdownMenuItem>
                <DropdownMenuItem>Recent</DropdownMenuItem>
                <DropdownMenuItem>With Tags</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SortDesc size={16} />
                  <span className="hidden sm:inline">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Date (Newest)</DropdownMenuItem>
                <DropdownMenuItem>Date (Oldest)</DropdownMenuItem>
                <DropdownMenuItem>Title (A-Z)</DropdownMenuItem>
                <DropdownMenuItem>Title (Z-A)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {notes.map((note, index) => (
            <Card key={note.id} className="overflow-hidden hover:shadow-md transition-shadow bg-white dark:bg-card">
              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                <CardTitle className="text-xl">{note.title}</CardTitle>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => togglePin(note.id)}
                  >
                    {note.isPinned ? (
                      <Pin className="h-4 w-4 fill-current" />
                    ) : (
                      <Pin className="h-4 w-4" />
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-destructive"
                    onClick={() => deleteNote(note.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground whitespace-pre-line mb-4 line-clamp-4">
                  {note.content}
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {note.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {note.date}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </motion.div>

      <NoteForm 
        isOpen={isNoteFormOpen} 
        onClose={() => setIsNoteFormOpen(false)} 
        onSave={handleAddNote}
      />
    </div>
  );
}