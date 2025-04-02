
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartBar } from "lucide-react";

interface LearningStatisticsProps {
  completedCourses: number;
  totalCourses: number;
  completedLessons: number;
  totalLessons: number;
  currentStreak: number;
  longestStreak: number;
  courseCompletionPercentage: number;
  lessonCompletionPercentage: number;
}

const LearningStatistics: React.FC<LearningStatisticsProps> = ({
  completedCourses,
  totalCourses,
  completedLessons,
  totalLessons,
  currentStreak,
  longestStreak,
  courseCompletionPercentage,
  lessonCompletionPercentage
}) => {
  return (
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
              <p className="text-sm font-medium">{completedCourses}/{totalCourses}</p>
            </div>
            <Progress value={courseCompletionPercentage} />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm">Lessons Completed</p>
              <p className="text-sm font-medium">{completedLessons}/{totalLessons}</p>
            </div>
            <Progress value={lessonCompletionPercentage} />
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-sm font-medium">Current Streak</p>
              <p className="text-2xl font-bold">{currentStreak} days</p>
            </div>
            <div>
              <p className="text-sm font-medium">Longest Streak</p>
              <p className="text-2xl font-bold">{longestStreak} days</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningStatistics;
