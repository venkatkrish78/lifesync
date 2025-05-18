"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface UserProfile {
  name: string;
  email: string;
  language: string;
  notifications: boolean;
  theme?: string;
}

export function useUserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user profile from localStorage
    const loadUserProfile = () => {
      try {
        const savedProfile = localStorage.getItem("userProfile");
        if (savedProfile) {
          setUserProfile(JSON.parse(savedProfile));
        } else {
          // Default profile if none exists
          const defaultProfile: UserProfile = {
            name: "John Doe",
            email: "john.doe@example.com",
            language: "english",
            notifications: true,
          };
          setUserProfile(defaultProfile);
          localStorage.setItem("userProfile", JSON.stringify(defaultProfile));
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const updateUserProfile = async (updatedProfile: Partial<UserProfile>) => {
    try {
      if (!userProfile) {
        throw new Error("User profile not initialized");
      }
      
      // Merge with existing profile ensuring all required fields are present
      const newProfile: UserProfile = {
        name: updatedProfile.name ?? userProfile.name,
        email: updatedProfile.email ?? userProfile.email,
        language: updatedProfile.language ?? userProfile.language,
        notifications: updatedProfile.notifications !== undefined ? updatedProfile.notifications : userProfile.notifications,
        theme: updatedProfile.theme ?? userProfile.theme,
      };
      
      // Save to localStorage
      localStorage.setItem("userProfile", JSON.stringify(newProfile));
      
      // Update state
      setUserProfile(newProfile);
      
      return true;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };

  return { userProfile, isLoading, updateUserProfile };
}