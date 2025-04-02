
import { Clock } from "lucide-react";
import { LearningCourse } from "@/utils/learningPathUtils";

interface CourseMetadataProps {
  duration: number;
  format: string;
  FormatIcon: React.FC<{ className?: string }>;
}

const CourseMetadata: React.FC<CourseMetadataProps> = ({
  duration,
  format,
  FormatIcon
}) => {
  return (
    <div className="flex items-center text-sm text-muted-foreground mb-4">
      <Clock className="h-4 w-4 mr-1" />
      <span>{duration} min</span>
      <span className="mx-2">•</span>
      <FormatIcon className="h-4 w-4 mr-1" />
      <span className="capitalize">{format}</span>
    </div>
  );
};

export default CourseMetadata;
