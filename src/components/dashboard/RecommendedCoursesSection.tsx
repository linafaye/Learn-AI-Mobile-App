
import { Button } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { LearningCourse } from "@/utils/learningPathUtils";
import RecommendedCourseCard from "./RecommendedCourseCard";

interface RecommendedCoursesSectionProps {
  courses: LearningCourse[];
}

const RecommendedCoursesSection: React.FC<RecommendedCoursesSectionProps> = ({ 
  courses 
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recommended For You</h2>
        <Link to="/learn">
          <Button variant="ghost" size="sm">View All</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <RecommendedCourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedCoursesSection;
