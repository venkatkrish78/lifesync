"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Bell, 
  Check, 
  ChevronRight, 
  Globe, 
  HelpCircle, 
  Lock, 
  Moon, 
  Save, 
  Shield, 
  Sun, 
  User 
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useUserProfile } from "@/hooks/use-user-profile";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { userProfile, updateUserProfile } = useUserProfile();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    language: "english",
    notifications: true,
    darkMode: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        email: userProfile.email || "",
        language: userProfile.language || "english",
        notifications: userProfile.notifications !== false,
        darkMode: theme === "dark",
      });
    }
  }, [userProfile, theme]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Update theme based on form data
      setTheme(formData.darkMode ? "dark" : "light");
      
      // Update user profile
      await updateUserProfile({
        name: formData.name,
        email: formData.email,
        language: formData.language,
        notifications: formData.notifications,
      });
      
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings. Please try again.");
      console.error("Settings save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Settings</h1>

        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-1"
          >
            <a 
              href="#profile" 
              className="flex items-center px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
            >
              <User className="h-5 w-5 mr-3" />
              <span>Profile</span>
              <ChevronRight className="h-5 w-5 ml-auto" />
            </a>
            <a 
              href="#appearance" 
              className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Sun className="h-5 w-5 mr-3" />
              <span>Appearance</span>
              <ChevronRight className="h-5 w-5 ml-auto" />
            </a>
            <a 
              href="#notifications" 
              className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Bell className="h-5 w-5 mr-3" />
              <span>Notifications</span>
              <ChevronRight className="h-5 w-5 ml-auto" />
            </a>
            <a 
              href="#language" 
              className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Globe className="h-5 w-5 mr-3" />
              <span>Language</span>
              <ChevronRight className="h-5 w-5 ml-auto" />
            </a>
            <a 
              href="#privacy" 
              className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Shield className="h-5 w-5 mr-3" />
              <span>Privacy & Security</span>
              <ChevronRight className="h-5 w-5 ml-auto" />
            </a>
            <a 
              href="#help" 
              className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <HelpCircle className="h-5 w-5 mr-3" />
              <span>Help & Support</span>
              <ChevronRight className="h-5 w-5 ml-auto" />
            </a>
          </motion.div>

          {/* Settings Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="md:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Section */}
              <section id="profile" className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-500" />
                  Profile Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
              </section>

              {/* Appearance Section */}
              <section id="appearance" className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Sun className="h-5 w-5 mr-2 text-amber-500" />
                  Appearance
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Moon className="h-5 w-5 mr-2 text-slate-600 dark:text-slate-300" />
                      <span>Dark Mode</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="darkMode"
                        checked={formData.darkMode}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </section>

              {/* Notifications Section */}
              <section id="notifications" className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-red-500" />
                  Notifications
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Enable Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="notifications"
                        checked={formData.notifications}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </section>

              {/* Language Section */}
              <section id="language" className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-green-500" />
                  Language
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium mb-1">
                      Select Language
                    </label>
                    <select
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="japanese">Japanese</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Privacy Section */}
              <section id="privacy" className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-purple-500" />
                  Privacy & Security
                </h2>
                <div className="space-y-4">
                  <p className="text-slate-600 dark:text-slate-300">
                    Your data is stored locally on your device. LifeSync does not collect or share your personal information.
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                  >
                    Clear All Data
                  </button>
                </div>
              </section>

              {/* Help Section */}
              <section id="help" className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-teal-500" />
                  Help & Support
                </h2>
                <div className="space-y-4">
                  <p className="text-slate-600 dark:text-slate-300">
                    Need help with LifeSync? Check out our documentation or contact support.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors"
                    >
                      Documentation
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors"
                    >
                      Contact Support
                    </button>
                  </div>
                </div>
              </section>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}