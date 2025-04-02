
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ShareToSocialMedia from "../ShareToSocialMedia";

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
  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case 'lesson_completed': return 'Lesson Completed';
      case 'quiz_completed': return 'Quiz Completed';
      case 'course_completed': return 'Course Completed';
      default: return type;
    }
  };

  const getShareMessage = (activity: Activity) => {
    const typeLabel = getActivityTypeLabel(activity.type);
    return `I just ${activity.type.replace('_completed', 'ed')} "${activity.name}" on PocketLearn and earned ${activity.points} points! #learning #achievement`;
  };

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
                    {getActivityTypeLabel(activity.type)} · {activity.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ShareToSocialMedia 
                    courseTitle={activity.name}
                    className="bg-transparent border-0 hover:bg-primary/10 h-8 w-8 p-0"
                    customMessage={getShareMessage(activity)}
                  />
                  <div className="flex items-center text-primary">
                    <p className="font-semibold">+{activity.points}</p>
                    <Star className="h-4 w-4 ml-1" />
                  </div>
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
