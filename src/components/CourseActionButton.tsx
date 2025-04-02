
import { Button } from "@/components/ui/button";
import { Play, CheckCircle } from "lucide-react";
import ShareToSocialMedia from "./ShareToSocialMedia";

interface CourseActionButtonProps {
  progress: number;
  courseTitle?: string;
}

const CourseActionButton: React.FC<CourseActionButtonProps> = ({ 
  progress,
  courseTitle = "Course"
}) => {
  if (progress === 100) {
    return (
      <div className="flex gap-2 items-center">
        <Button variant="outline" size="sm" className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700" disabled>
          <CheckCircle className="h-4 w-4 mr-1" />
          Completed
        </Button>
        <ShareToSocialMedia courseTitle={courseTitle} />
      </div>
    );
  }
  
  if (progress > 0) {
    return (
      <Button>
        <Play className="h-4 w-4 mr-1" />
        Continue
      </Button>
    );
  }
  
  return (
    <Button>
      <Play className="h-4 w-4 mr-1" />
      Start
    </Button>
  );
};

export default CourseActionButton;
