import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { LearningCourse } from "@/utils/learningPathUtils";

export type CustomerRole = "developer" | "administrator" | "data_analyst" | "student" | "solution_architect" | "it" | "data_engineer" | "security_engineer" | "ai_engineer";
export type LearningGoal = "casual" | "professional" | "skill";
export type WeeklyFrequency = "once" | "twice" | "thrice" | "weekday" | "weekend" | "daily";
export type LearningExperience = "voice" | "interactive" | "both";
export type TargetTime = 5 | 10 | 15 | 20;

export interface UserPreferences {
  customerRole?: CustomerRole;
  learningGoal?: LearningGoal;
  weeklyFrequency?: WeeklyFrequency;
  learningExperience?: LearningExperience;
  targetTime?: TargetTime;
}

export type User = {
  id: string;
  email: string;
  name: string;
  preferences?: UserPreferences;
  provider?: "email" | "github" | "linkedin";
  queuedCourses?: string[]; // Course IDs in the queue
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGithub: () => Promise<void>;
  loginWithLinkedin: () => Promise<void>;
  logout: () => void;
  updateUserPreferences: (preferences: User["preferences"]) => void;
  addCourseToQueue: (courseId: string) => void;
  removeCourseFromQueue: (courseId: string) => void;
  isInQueue: (courseId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("aiLearnUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem("aiLearnUser");
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("aiLearnUser", JSON.stringify(user));
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email.includes("@")) {
        throw new Error("Invalid email format");
      }
      
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name: email.split("@")[0],
        provider: "email",
      };
      
      setUser(mockUser);
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${mockUser.name}!`,
      });
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email.includes("@")) {
        throw new Error("Invalid email format");
      }
      
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        provider: "email",
      };
      
      setUser(mockUser);
      toast({
        title: "Registration successful",
        description: `Welcome to AI Learn, ${name}!`,
      });
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGithub = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock GitHub login
      const mockUser: User = {
        id: Date.now().toString(),
        email: `github_user_${Math.floor(Math.random() * 1000)}@example.com`,
        name: `GitHub User ${Math.floor(Math.random() * 1000)}`,
        provider: "github",
      };
      
      setUser(mockUser);
      toast({
        title: "GitHub login successful",
        description: `Welcome, ${mockUser.name}!`,
      });
    } catch (error) {
      console.error("GitHub login failed:", error);
      toast({
        title: "GitHub login failed",
        description: "Could not authenticate with GitHub",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithLinkedin = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock LinkedIn login
      const mockUser: User = {
        id: Date.now().toString(),
        email: `linkedin_user_${Math.floor(Math.random() * 1000)}@example.com`,
        name: `LinkedIn User ${Math.floor(Math.random() * 1000)}`,
        provider: "linkedin",
      };
      
      setUser(mockUser);
      toast({
        title: "LinkedIn login successful",
        description: `Welcome, ${mockUser.name}!`,
      });
    } catch (error) {
      console.error("LinkedIn login failed:", error);
      toast({
        title: "LinkedIn login failed",
        description: "Could not authenticate with LinkedIn",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("aiLearnUser");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const updateUserPreferences = (preferences: User["preferences"]) => {
    if (user) {
      setUser({ ...user, preferences });
      toast({
        title: "Preferences updated",
        description: "Your learning preferences have been saved.",
      });
    }
  };

  const addCourseToQueue = (courseId: string) => {
    if (user) {
      const queuedCourses = user.queuedCourses || [];
      
      if (queuedCourses.includes(courseId)) {
        return;
      }
      
      const updatedUser = {
        ...user,
        queuedCourses: [...queuedCourses, courseId]
      };
      
      setUser(updatedUser);
      toast({
        title: "Course added to queue",
        description: "You can view your queued courses in the Progress page",
      });
    }
  };

  const removeCourseFromQueue = (courseId: string) => {
    if (user && user.queuedCourses) {
      const updatedQueue = user.queuedCourses.filter(id => id !== courseId);
      
      const updatedUser = {
        ...user,
        queuedCourses: updatedQueue
      };
      
      setUser(updatedUser);
      toast({
        title: "Course removed from queue",
        description: "The course has been removed from your queue",
      });
    }
  };

  const isInQueue = (courseId: string): boolean => {
    return user?.queuedCourses?.includes(courseId) || false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        loginWithGithub,
        loginWithLinkedin,
        logout,
        updateUserPreferences,
        addCourseToQueue,
        removeCourseFromQueue,
        isInQueue,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
