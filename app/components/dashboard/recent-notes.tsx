"use client";

import { motion } from "framer-motion";
import { FileText, Tag, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Note = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  isPinned: boolean;
};

export default function RecentNotes() {
  const notes: Note[] = [
    {
      id: "1",
      title: "Project Ideas",
      excerpt: "List of potential projects to work on in Q3...",
      date: "2 hours ago",
      tags: ["work", "ideas"],
      isPinned: true,
    },
    {
      id: "2",
      title: "Meeting Notes: Marketing Strategy",
      excerpt: "Discussion about the new campaign launch...",
      date: "Yesterday",
      tags: ["work", "marketing"],
      isPinned: false,
    },
    {
      id: "3",
      title: "Grocery List",
      excerpt: "Items to buy for the weekend dinner party...",
      date: "2 days ago",
      tags: ["personal", "shopping"],
      isPinned: false,
    },
    {
      id: "4",
      title: "Book Recommendations",
      excerpt: "Fiction and non-fiction books to read this summer...",
      date: "3 days ago",
      tags: ["personal", "reading"],
      isPinned: false,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {notes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="p-3 rounded-md bg-accent/50 hover:bg-accent transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-primary/10 mr-3">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium">{note.title}</h3>
                    {note.isPinned && (
                      <Star className="h-3 w-3 text-yellow-500 ml-2 fill-yellow-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{note.excerpt}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-1">
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
            </div>
          </motion.div>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        View All Notes
      </Button>
    </div>
  );
}