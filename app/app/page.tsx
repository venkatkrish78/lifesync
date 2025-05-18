"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Clock, FileText, PieChart, Settings, Shield } from "lucide-react";

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [statsRef, statsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [count, setCount] = useState({ users: 0, tasks: 0, notes: 0 });

  useEffect(() => {
    if (statsInView) {
      const interval = setInterval(() => {
        setCount(prev => ({
          users: prev.users < 10000 ? prev.users + 100 : 10000,
          tasks: prev.tasks < 50000 ? prev.tasks + 500 : 50000,
          notes: prev.notes < 25000 ? prev.notes + 250 : 25000,
        }));
      }, 20);

      return () => clearInterval(interval);
    }
  }, [statsInView]);

  const features = [
    {
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      title: "Notes & Reminders",
      description: "Create and organize notes with rich text formatting and set smart reminders."
    },
    {
      icon: <PieChart className="h-8 w-8 text-green-500" />,
      title: "Finance Tracking",
      description: "Track expenses, manage budgets, and monitor your financial goals."
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      title: "Smart To-Do Lists",
      description: "Organize tasks with intelligent prioritization and progress tracking."
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      title: "Health Tracking",
      description: "Monitor your health metrics and build healthy habits with streak tracking."
    },
    {
      icon: <Settings className="h-8 w-8 text-amber-500" />,
      title: "Customizable Widgets",
      description: "Personalize your dashboard with widgets that matter to you."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-teal-500" />,
      title: "Document Scanning",
      description: "Scan and organize documents with automatic text extraction."
    }
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white">
        <div className="relative w-full max-w-6xl mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Life, <span className="text-yellow-300">Synchronized</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
              LifeSync brings together notes, tasks, finances, and health tracking in one seamless personal assistant.
            </p>
            <Link href="/dashboard" className="bg-white text-blue-600 hover:bg-blue-50 transition-colors px-8 py-3 rounded-full font-medium text-lg inline-flex items-center">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-blue-900/30"></div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="w-full py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need in <span className="text-blue-600 dark:text-blue-400">One Place</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              LifeSync combines powerful features to help you stay organized, productive, and on top of your goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <div className="mb-4 p-3 bg-slate-100 dark:bg-slate-700 inline-block rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="w-full py-16 bg-blue-600 text-white"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="p-6"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">{count.users.toLocaleString()}+</div>
              <div className="text-xl text-blue-100">Active Users</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">{count.tasks.toLocaleString()}+</div>
              <div className="text-xl text-blue-100">Tasks Completed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">{count.notes.toLocaleString()}+</div>
              <div className="text-xl text-blue-100">Notes Created</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ref}
        className="w-full py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get <span className="text-blue-600 dark:text-blue-400">Organized</span>?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              Join thousands of users who have transformed their productivity with LifeSync.
            </p>
            <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white transition-colors px-8 py-3 rounded-full font-medium text-lg inline-flex items-center">
              Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}