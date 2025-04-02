
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

interface LevelData {
  name: string;
  threshold: number;
  current: boolean;
}

interface UserProgressStatsProps {
  currentLevel: LevelData | undefined;
  points: number;
  progressToNextLevel: number;
  nextLevelIndex: number;
  pointsToNextLevel: number;
  levels: LevelData[];
}

const UserProgressStats: React.FC<UserProgressStatsProps> = ({
  currentLevel,
  points,
  progressToNextLevel,
  nextLevelIndex,
  pointsToNextLevel,
  levels
}) => {
  return (
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
            <p className="text-sm text-muted-foreground">{points} points</p>
          </div>
          <div className="bg-primary text-primary-foreground h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold">
            {levels.indexOf(currentLevel as any) + 1}
          </div>
        </div>
        
        {nextLevelIndex < levels.length - 1 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm">Progress to {levels[nextLevelIndex + 1].name}</p>
              <p className="text-sm font-medium">{progressToNextLevel}%</p>
            </div>
            <Progress value={progressToNextLevel} />
            <p className="text-xs text-muted-foreground">
              {pointsToNextLevel - (points - currentLevel!.threshold)} points to go
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProgressStats;
