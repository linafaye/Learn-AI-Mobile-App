
import { Progress } from "@/components/ui/progress";

interface CourseProgressProps {
  value?: number;
}

const CourseProgress: React.FC<CourseProgressProps> = ({ value }) => {
  if (value === undefined || value <= 0) {
    return null;
  }

  return (
    <div className="mb-4 space-y-1">
      <div className="flex justify-between text-xs">
        <span>Progress</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} className="h-1.5" />
    </div>
  );
};

export default CourseProgress;
