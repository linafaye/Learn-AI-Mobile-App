
import { Progress } from "@/components/ui/progress";

interface CourseProgressProps {
  value: number;
}

const CourseProgress: React.FC<CourseProgressProps> = ({ value }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{value > 0 ? `${value}% complete` : "Not started"}</span>
        {value > 0 && value < 100 && <span className="text-primary">Continue</span>}
        {value === 100 && <span className="text-green-500">Completed</span>}
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
};

export default CourseProgress;
