"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Calendar, 
  FileText, 
  Filter, 
  Plus, 
  Search, 
  Tag, 
  Trash 
} from "lucide-react";
import { toast } from "sonner";

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

export default function Notes() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const [notes] = useState<Note[]>([
    {
      id: "1",
      title: "Meeting Notes: Product Launch",
      content: "Discussed timeline for Q3 product launch. Marketing team to prepare materials by end of month. Development team confirmed all features will be ready for testing next week. Need to follow up with design team about final assets.",
      date: "Today",
      tags: ["Work", "Meeting"]
    },
    {
      id: "2",
      title: "Ideas for Website Redesign",
      content: "Focus on minimalist design, improve mobile experience, add dark mode support. Consider using a new color palette that better reflects our brand values. Research competitors' websites for inspiration. Schedule meeting with UX team to discuss wireframes.",
      date: "Yesterday",
      tags: ["Project", "Design"]
    },
    {
      id: "3",
      title: "Book Recommendations",
      content: "1. Atomic Habits by James Clear\n2. Deep Work by Cal Newport\n3. The Psychology of Money by Morgan Housel\n4. Four Thousand Weeks by Oliver Burkeman\n5. Digital Minimalism by Cal Newport",
      date: "3 days ago",
      tags: ["Personal", "Reading"]
    },
    {
      id: "4",
      title: "Weekly Goals",
      content: "- Complete project proposal\n- Schedule team meeting\n- Review quarterly reports\n- Update client presentation\n- Research new productivity tools",
      date: "1 week ago",
      tags: ["Personal", "Goals"]
    },
    {
      id: "5",
      title: "Recipe: Homemade Pizza",
      content: "Ingredients:\n- 2 1/4 tsp active dry yeast\n- 1 tsp sugar\n- 1 1/3 cups warm water\n- 3 1/2 cups all-purpose flour\n- 2 tbsp olive oil\n- 2 tsp salt\n\nInstructions:\n1. Mix yeast, sugar, and warm water. Let sit for 5 minutes.\n2. Add flour, olive oil, and salt. Mix until dough forms.\n3. Knead for 5-7 minutes.\n4. Let rise for 1-2 hours.\n5. Roll out, add toppings, and bake at 475°F for 10-12 minutes.",
      date: "2 weeks ago",
      tags: ["Personal", "Recipe"]
    },
    {
      id: "6",
      title: "Vacation Planning: Italy",
      content: "Cities to visit:\n- Rome (3 days)\n- Florence (2 days)\n- Venice (2 days)\n- Cinque Terre (2 days)\n\nMust-see attractions:\n- Colosseum\n- Vatican Museums\n- Uffizi Gallery\n- Doge's Palace\n- Rialto Bridge\n\nLook into cooking classes in Florence and boat tours in Venice.",
      date: "3 weeks ago",
      tags: ["Personal", "Travel"]
    }
  ]);

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? note.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const handleCreateNote = () => {
    toast.success("New note created!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">My Notes</h1>
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors">
              <Filter className="h-5 w-5" />
            </button>
            <button 
              onClick={handleCreateNote}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tags Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
              <h2 className="font-semibold mb-3">Tags</h2>
              <div className="space-y-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedTag === tag 
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                        : "hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <Tag className="h-4 w-4 mr-2" />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes Grid */}
          <div 
            ref={ref}
            className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-md text-blue-500 dark:text-blue-400 flex-shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-lg">{note.title}</h3>
                    </div>
                    <button className="p-1.5 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 text-sm">
                    {note.content}
                  </p>
                  <div className="flex flex-wrap items-center justify-between mt-2">
                    <div className="flex flex-wrap gap-2">
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
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {note.date}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-full mb-4">
                  <FileText className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">No notes found</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-4">
                  {searchQuery || selectedTag ? "Try adjusting your search or filters" : "Create your first note to get started"}
                </p>
                <button 
                  onClick={handleCreateNote}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Note
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}