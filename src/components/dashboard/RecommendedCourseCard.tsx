
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, BookOpen, Headphones, MousePointer, Video } from "lucide-react";
import { LearningCourse } from "@/utils/learningPathUtils";
import CourseMetadata from "../CourseMetadata";
import CourseProgress from "../CourseProgress";
import { useAuth } from "@/contexts/AuthContext";
import CourseBookmarkButton from "../CourseBookmarkButton";
import { useNavigate } from "react-router-dom";

interface RecommendedCourseCardProps {
  course: LearningCourse;
}

const RecommendedCourseCard: React.FC<RecommendedCourseCardProps> = ({ course }) => {
  const { addCourseToQueue, removeCourseFromQueue, isInQueue } = useAuth();
  const navigate = useNavigate();
  const inQueue = isInQueue(course.id);
  
  const handleQueueToggle = () => {
    if (inQueue) {
      removeCourseFromQueue(course.id);
    } else {
      addCourseToQueue(course.id);
    }
  };
  
  const handleStartCourse = () => {
    navigate(`/course/${course.id}`);
  };
  
  const getFormatIcon = () => {
    switch(course.format) {
      case "audio": return Headphones;
      case "video": return Video;
      case "interactive": return MousePointer;
      default: return MousePointer;
    }
  };
  const FormatIcon = getFormatIcon();
  
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
          <div className="flex items-center gap-1">
            <span className="text-xs bg-muted rounded-full px-2 py-1 capitalize">
              {course.format}
            </span>
            <CourseBookmarkButton 
              inQueue={inQueue}
              onToggle={handleQueueToggle}
            />
          </div>
        </div>
        
        <CourseMetadata 
          duration={course.duration} 
          format={course.format}
          FormatIcon={FormatIcon} 
        />
        
        <CourseProgress value={course.progress || 0} />
        
        <div className="mt-auto">
          <Button className="w-full" size="sm" onClick={handleStartCourse}>
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
