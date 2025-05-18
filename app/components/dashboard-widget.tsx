import React from "react";
import { motion } from "framer-motion";

interface DashboardWidgetProps {
  title: string;
  icon?: React.ReactNode;
  actionIcon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  children: React.ReactNode;
}

export default function DashboardWidget({
  title,
  icon,
  actionIcon,
  actionLabel,
  onAction,
  children,
}: DashboardWidgetProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden h-full">
      <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center space-x-2">
          {icon && (
            <span className="text-blue-500 dark:text-blue-400">
              {icon}
            </span>
          )}
          <h2 className="font-semibold">{title}</h2>
        </div>
        {actionIcon && onAction && (
          <button
            onClick={onAction}
            className="p-1.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors text-slate-600 dark:text-slate-300"
            aria-label={actionLabel || "Action"}
          >
            {actionIcon}
          </button>
        )}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}