
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle, BookOpen } from "lucide-react";

interface CourseActionButtonProps {
  progress?: number;
  className?: string;
}

const CourseActionButton: React.FC<CourseActionButtonProps> = ({ 
  progress,
  className = "w-full" 
}) => {
  return (
    <Button 
      className={className} 
      variant={progress !== undefined && progress > 0 ? "default" : "outline"}
    >
      {progress !== undefined && progress > 0 ? (
        <>
          <PlayCircle className="mr-2 h-4 w-4" />
          Continue
        </>
      ) : progress === 100 ? (
        <>
          <CheckCircle className="mr-2 h-4 w-4" />
          Completed
        </>
      ) : (
        <>
          <BookOpen className="mr-2 h-4 w-4" />
          Start Learning
        </>
      )}
    </Button>
  );
};

export default CourseActionButton;
