
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LearningCourse } from "@/utils/learningPathUtils";
import DashboardCourseCard from "./DashboardCourseCard";

interface ContinueLearningSectionProps {
  courses: LearningCourse[];
}

const ContinueLearningSection: React.FC<ContinueLearningSectionProps> = ({ 
  courses 
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Continue Learning</h2>
        <Link to="/learn">
          <Button variant="ghost" size="sm">View All</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {courses.slice(0, 2).map((course) => (
          <DashboardCourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default ContinueLearningSection;
