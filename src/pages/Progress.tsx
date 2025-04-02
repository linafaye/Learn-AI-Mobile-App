
import React from "react";
import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { getAllCourses } from "@/utils/learningPathUtils";
import UserProgressStats from "@/components/progress/UserProgressStats";
import LearningStatistics from "@/components/progress/LearningStatistics";
import BadgesSection from "@/components/progress/BadgesSection";
import RecentActivitySection from "@/components/progress/RecentActivitySection";
import QueuedCoursesSection from "@/components/progress/QueuedCoursesSection";
import { Star, Clock, Award, Trophy, ChartBar } from "lucide-react";

const ProgressPage: React.FC = () => {
  const { user } = useAuth();
  
  // Get all courses and filter for those in the queue
  const allCourses = getAllCourses();
  const queuedCourses = user?.queuedCourses 
    ? allCourses.filter(course => user.queuedCourses?.includes(course.id))
    : [];
  
  // Mock data for the progress page
  const progressData = {
    completedCourses: 3,
    totalCourses: 12,
    completedLessons: 24,
    totalLessons: 86,
    currentStreak: 5,
    longestStreak: 14,
    points: 1250,
    badges: [
      { name: "First Step", description: "Completed your first lesson", icon: Star, achieved: true },
      { name: "Quick Learner", description: "Completed 5 lessons in a day", icon: Clock, achieved: true },
      { name: "Knowledge Seeker", description: "Completed a full course", icon: Award, achieved: true },
      { name: "Master Mind", description: "Achieved 100% in a quiz", icon: Trophy, achieved: false },
      { name: "Consistent Learner", description: "Maintained a 7-day streak", icon: ChartBar, achieved: false },
    ],
    levels: [
      { name: "Beginner", threshold: 0, current: false },
      { name: "Explorer", threshold: 500, current: false },
      { name: "Enthusiast", threshold: 1000, current: true },
      { name: "Expert", threshold: 2500, current: false },
      { name: "Master", threshold: 5000, current: false },
    ],
    recentActivity: [
      { type: "lesson_completed", name: "Introduction to AI Models", date: "2 days ago", points: 50 },
      { type: "quiz_completed", name: "Machine Learning Basics", date: "4 days ago", points: 100 },
      { type: "course_completed", name: "Python for Data Science", date: "1 week ago", points: 250 },
    ]
  };
  
  // Find current level
  const currentLevel = progressData.levels.find(level => level.current);
  
  // Calculate percentage to next level
  const nextLevel = progressData.levels.find(
    (level, index) => 
      level.current && index < progressData.levels.length - 1
  );
  const nextLevelIndex = progressData.levels.indexOf(nextLevel as any);
  const pointsToNextLevel = nextLevelIndex < progressData.levels.length - 1 
    ? progressData.levels[nextLevelIndex + 1].threshold - nextLevel!.threshold
    : 0;
  const progressToNextLevel = nextLevelIndex < progressData.levels.length - 1
    ? Math.min(100, Math.round(((progressData.points - nextLevel!.threshold) / pointsToNextLevel) * 100))
    : 100;
  
  // Calculate course and lesson completion percentages
  const courseCompletionPercentage = Math.round((progressData.completedCourses / progressData.totalCourses) * 100);
  const lessonCompletionPercentage = Math.round((progressData.completedLessons / progressData.totalLessons) * 100);
  
  return (
    <AppLayout>
      <div className="p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Learning Progress</h1>
          <p className="text-muted-foreground">
            Track your achievements, badges, and learning journey
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <UserProgressStats 
            currentLevel={currentLevel}
            points={progressData.points}
            progressToNextLevel={progressToNextLevel}
            nextLevelIndex={nextLevelIndex}
            pointsToNextLevel={pointsToNextLevel}
            levels={progressData.levels}
          />
          
          <LearningStatistics 
            completedCourses={progressData.completedCourses}
            totalCourses={progressData.totalCourses}
            completedLessons={progressData.completedLessons}
            totalLessons={progressData.totalLessons}
            currentStreak={progressData.currentStreak}
            longestStreak={progressData.longestStreak}
            courseCompletionPercentage={courseCompletionPercentage}
            lessonCompletionPercentage={lessonCompletionPercentage}
          />
        </div>
        
        <QueuedCoursesSection courses={queuedCourses} />
        
        <BadgesSection badges={progressData.badges} />
        
        <RecentActivitySection activities={progressData.recentActivity} />
      </div>
    </AppLayout>
  );
};

export default ProgressPage;
