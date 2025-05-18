"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, FileText, Tag } from "lucide-react";

interface Note {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

export default function NotesList() {
  const [notes] = useState<Note[]>([
    {
      id: "1",
      title: "Meeting Notes: Product Launch",
      excerpt: "Discussed timeline for Q3 product launch. Marketing team to prepare...",
      date: "Today",
      tags: ["Work", "Meeting"]
    },
    {
      id: "2",
      title: "Ideas for Website Redesign",
      excerpt: "Focus on minimalist design, improve mobile experience, add dark mode...",
      date: "Yesterday",
      tags: ["Project", "Design"]
    },
    {
      id: "3",
      title: "Book Recommendations",
      excerpt: "1. Atomic Habits by James Clear, 2. Deep Work by Cal Newport...",
      date: "3 days ago",
      tags: ["Personal", "Reading"]
    }
  ]);

  return (
    <div className="space-y-4">
      {notes.map((note, index) => (
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-md text-blue-500 dark:text-blue-400">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-slate-900 dark:text-white mb-1">{note.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{note.excerpt}</p>
              <div className="flex flex-wrap items-center mt-2 gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {note.date}
                </span>
                {note.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full flex items-center"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}