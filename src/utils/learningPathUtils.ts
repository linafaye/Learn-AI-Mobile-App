import { User } from "@/contexts/AuthContext";

export type ContentFormat = "audio" | "interactive" | "text";
export type LearningLevel = "beginner" | "intermediate" | "advanced";

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: LearningCourse[];
  tags: string[];
  totalDuration: number; // in minutes
}

export interface LearningCourse {
  id: number;
  title: string;
  description: string;
  duration: number; // in minutes
  format: ContentFormat;
  level: LearningLevel;
  category: string;
  image: string;
  progress?: number;
}

// Mock courses data with format types
const allCourses: LearningCourse[] = [
  {
    id: 1,
    title: "Introduction to AI Concepts",
    description: "Learn the fundamentals of artificial intelligence and how it's transforming industries",
    category: "Fundamentals",
    level: "beginner",
    format: "audio",
    duration: 15,
    progress: 45,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103652.png"
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    description: "Understand the core principles behind machine learning models",
    category: "Machine Learning",
    level: "beginner",
    format: "interactive",
    duration: 10,
    progress: 20,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png"
  },
  {
    id: 3,
    title: "Neural Networks 101",
    description: "Interactive introduction to neural networks with visual examples",
    category: "Deep Learning",
    level: "intermediate",
    format: "interactive",
    duration: 15,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103674.png"
  },
  {
    id: 4,
    title: "Ethical AI and Responsible Development",
    description: "Learn about ethical considerations in AI development",
    category: "Ethics",
    level: "beginner",
    format: "audio",
    duration: 10,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103618.png"
  },
  {
    id: 5,
    title: "Natural Language Processing",
    description: "Explore how AI understands and processes human language",
    category: "NLP",
    level: "intermediate",
    format: "interactive",
    duration: 15,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103666.png"
  },
  {
    id: 6,
    title: "Computer Vision Fundamentals",
    description: "Audio walkthrough of how AI sees and interprets visual information",
    category: "Computer Vision",
    level: "intermediate",
    format: "audio",
    duration: 15,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103650.png"
  },
  {
    id: 7,
    title: "Reinforcement Learning",
    description: "Interactive examples of how AI learns through trial and error",
    category: "Machine Learning",
    level: "advanced",
    format: "interactive",
    duration: 10,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103658.png"
  },
  {
    id: 8,
    title: "AI for Business Decision Making",
    description: "Learn how businesses implement AI for better outcomes",
    category: "Business",
    level: "beginner",
    format: "audio",
    duration: 10,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103611.png"
  }
];

// Predefined learning paths
const predefinedPaths: LearningPath[] = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    description: "A comprehensive introduction to artificial intelligence concepts",
    courses: [allCourses[0], allCourses[1], allCourses[3]],
    tags: ["beginner", "fundamentals", "ethics"],
    totalDuration: 35
  },
  {
    id: "ml-specialist",
    title: "Machine Learning Specialist",
    description: "Deep dive into machine learning concepts and applications",
    courses: [allCourses[1], allCourses[6], allCourses[2]],
    tags: ["machine learning", "advanced", "reinforcement learning"],
    totalDuration: 35
  },
  {
    id: "business-ai",
    title: "AI for Business",
    description: "Practical AI applications for business professionals",
    courses: [allCourses[7], allCourses[0], allCourses[3]],
    tags: ["business", "ethics", "decision making"],
    totalDuration: 35
  },
  {
    id: "ai-specialist",
    title: "AI Specialist Track",
    description: "Advanced topics in AI across multiple domains",
    courses: [allCourses[2], allCourses[4], allCourses[5]],
    tags: ["intermediate", "neural networks", "computer vision", "nlp"],
    totalDuration: 45
  }
];

/**
 * Get a personalized learning path based on user preferences
 */
export const getRecommendedPath = (user: User | null): LearningPath | null => {
  if (!user?.preferences) return null;
  
  const { learningGoal, learningExperience } = user.preferences;
  
  let recommendedPathId = "";
  
  // Determine path based on learning goal
  switch (learningGoal) {
    case "casual":
      recommendedPathId = "ai-fundamentals";
      break;
    case "professional":
      recommendedPathId = "ai-specialist";
      break;
    case "skill":
      recommendedPathId = "ml-specialist";
      break;
    default:
      recommendedPathId = "ai-fundamentals";
  }
  
  // Find the base path
  let recommendedPath = predefinedPaths.find(path => path.id === recommendedPathId);
  if (!recommendedPath) return null;
  
  // Filter courses based on learning experience preference if specified
  if (learningExperience) {
    const preferredFormat: ContentFormat = learningExperience === "voice" ? "audio" : "interactive";
    
    // Create a copy of the path
    const customizedPath = {
      ...recommendedPath,
      courses: [...recommendedPath.courses]
    };
    
    // Prioritize courses with the preferred format, but keep at least one course of each format
    // to provide a balanced experience
    const preferredCourses = allCourses.filter(course => 
      course.format === preferredFormat && 
      !customizedPath.courses.some(c => c.id === course.id)
    );
    
    // Add up to 2 preferred format courses if available
    if (preferredCourses.length > 0) {
      customizedPath.courses = [
        ...customizedPath.courses,
        ...preferredCourses.slice(0, 2)
      ];
      
      // Update total duration
      customizedPath.totalDuration = customizedPath.courses.reduce(
        (total, course) => total + course.duration, 0
      );
    }
    
    return customizedPath;
  }
  
  return recommendedPath;
};

/**
 * Get recommended courses based on user preferences
 */
export const getRecommendedCourses = (user: User | null, limit: number = 3): LearningCourse[] => {
  if (!user?.preferences) return allCourses.slice(0, limit);
  
  const { learningExperience } = user.preferences;
  let filteredCourses = [...allCourses];
  
  // If user has a format preference, prioritize those courses
  if (learningExperience) {
    const preferredFormat: ContentFormat = learningExperience === "voice" ? "audio" : "interactive";
    
    // Sort courses so preferred format appears first
    filteredCourses.sort((a, b) => {
      if (a.format === preferredFormat && b.format !== preferredFormat) return -1;
      if (a.format !== preferredFormat && b.format === preferredFormat) return 1;
      return 0;
    });
  }
  
  return filteredCourses.slice(0, limit);
};

// Export all courses for use in other components
export const getAllCourses = (): LearningCourse[] => {
  return allCourses;
};
