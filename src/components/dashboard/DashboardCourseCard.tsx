
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";
import { LearningCourse } from "@/utils/learningPathUtils";

interface DashboardCourseCardProps {
  course: LearningCourse;
}

const DashboardCourseCard: React.FC<DashboardCourseCardProps> = ({ course }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex h-full">
        <div className="w-1/4 bg-muted flex items-center justify-center p-4">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="w-3/4 p-4 flex flex-col">
          <div className="mb-2">
            <span className="text-xs text-muted-foreground">{course.category}</span>
            <h3 className="font-semibold">{course.title}</h3>
          </div>
          
          <div className="mb-2 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration} min</span>
            </div>
            <div className="flex items-center">
              <span className="capitalize text-xs px-2 py-0.5 bg-muted rounded-full">
                {course.format}
              </span>
            </div>
          </div>
          
          <div className="mt-auto space-y-2">
            <div className="flex justify-between text-sm">
              <span>{course.progress ? `${course.progress}% complete` : "New"}</span>
              <span>{course.progress && course.progress > 0 ? "Continue" : "Start"}</span>
            </div>
            <Progress value={course.progress || 0} className="h-2" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DashboardCourseCard;
