
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Activity {
  type: string;
  name: string;
  date: string;
  points: number;
}

interface RecentActivitySectionProps {
  activities: Activity[];
}

const RecentActivitySection: React.FC<RecentActivitySectionProps> = ({ activities }) => {
  return (
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
          {activities.map((activity, index) => (
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
              {index < activities.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivitySection;
