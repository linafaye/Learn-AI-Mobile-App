
import React from "react";
import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Star, Trophy, Clock, ChartBar } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ProgressPage: React.FC = () => {
  const { user } = useAuth();
  
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
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <CardTitle>Current Level</CardTitle>
              </div>
              <CardDescription>
                Your learning progress and achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-lg font-semibold">{currentLevel?.name}</p>
                  <p className="text-sm text-muted-foreground">{progressData.points} points</p>
                </div>
                <div className="bg-primary text-primary-foreground h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold">
                  {progressData.levels.indexOf(currentLevel as any) + 1}
                </div>
              </div>
              
              {nextLevelIndex < progressData.levels.length - 1 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Progress to {progressData.levels[nextLevelIndex + 1].name}</p>
                    <p className="text-sm font-medium">{progressToNextLevel}%</p>
                  </div>
                  <Progress value={progressToNextLevel} />
                  <p className="text-xs text-muted-foreground">
                    {pointsToNextLevel - (progressData.points - nextLevel!.threshold)} points to go
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ChartBar className="h-5 w-5 text-primary" />
                <CardTitle>Learning Statistics</CardTitle>
              </div>
              <CardDescription>
                Your learning activity and progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm">Courses Completed</p>
                    <p className="text-sm font-medium">{progressData.completedCourses}/{progressData.totalCourses}</p>
                  </div>
                  <Progress value={courseCompletionPercentage} />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm">Lessons Completed</p>
                    <p className="text-sm font-medium">{progressData.completedLessons}/{progressData.totalLessons}</p>
                  </div>
                  <Progress value={lessonCompletionPercentage} />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-sm font-medium">Current Streak</p>
                    <p className="text-2xl font-bold">{progressData.currentStreak} days</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Longest Streak</p>
                    <p className="text-2xl font-bold">{progressData.longestStreak} days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <CardTitle>Badges & Achievements</CardTitle>
            </div>
            <CardDescription>
              Achievements you've earned through your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {progressData.badges.map((badge, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                    badge.achieved ? 'bg-primary/10 border-primary' : 'bg-muted/50 border-border text-muted-foreground'
                  }`}
                >
                  <div className={`p-3 rounded-full mb-2 ${
                    badge.achieved ? 'bg-primary/20' : 'bg-muted'
                  }`}>
                    <badge.icon className={`h-6 w-6 ${
                      badge.achieved ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <p className="text-sm font-medium text-center">{badge.name}</p>
                  <p className="text-xs text-center mt-1">{badge.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <CardTitle>Recent Activity</CardTitle>
            </div>
            <CardDescription>
              Your latest learning activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progressData.recentActivity.map((activity, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{activity.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.type === 'lesson_completed' ? 'Lesson Completed' : 
                         activity.type === 'quiz_completed' ? 'Quiz Completed' : 
                         'Course Completed'} · {activity.date}
                      </p>
                    </div>
                    <div className="flex items-center text-primary">
                      <p className="font-semibold">+{activity.points}</p>
                      <Star className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                  {index < progressData.recentActivity.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ProgressPage;
