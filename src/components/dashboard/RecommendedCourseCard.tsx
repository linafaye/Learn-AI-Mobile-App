
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, BookOpen, Headphones, MousePointer } from "lucide-react";
import { LearningCourse } from "@/utils/learningPathUtils";
import CourseMetadata from "../CourseMetadata";
import CourseProgress from "../CourseProgress";

interface RecommendedCourseCardProps {
  course: LearningCourse;
}

const RecommendedCourseCard: React.FC<RecommendedCourseCardProps> = ({ course }) => {
  const FormatIcon = course.format === "audio" ? Headphones : MousePointer;
  
  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="aspect-video bg-muted flex items-center justify-center p-6">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-20 h-20 object-contain"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs text-muted-foreground">{course.category}</span>
            <h3 className="font-semibold">{course.title}</h3>
          </div>
          <span className="text-xs bg-muted rounded-full px-2 py-1 capitalize">
            {course.format}
          </span>
        </div>
        
        <CourseMetadata 
          duration={course.duration} 
          format={course.format}
          FormatIcon={FormatIcon} 
        />
        
        <CourseProgress value={course.progress} />
        
        <div className="mt-auto">
          <Button className="w-full" size="sm">
            {course.progress !== undefined && course.progress > 0 ? (
              <>
                <PlayCircle className="mr-2 h-4 w-4" />
                Continue
              </>
            ) : (
              <>
                <BookOpen className="mr-2 h-4 w-4" />
                Start Learning
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RecommendedCourseCard;
