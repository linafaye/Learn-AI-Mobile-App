
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LearningPathCard } from "@/components/LearningPathCard";
import { LearningPath } from "@/utils/learningPathUtils";

interface PersonalizedPathSectionProps {
  recommendedPath: LearningPath | null;
}

const PersonalizedPathSection: React.FC<PersonalizedPathSectionProps> = ({ 
  recommendedPath 
}) => {
  if (!recommendedPath) return null;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Personalized Learning Path</h2>
        <Link to="/learn">
          <Button variant="ghost" size="sm">View All Paths</Button>
        </Link>
      </div>
      
      <div className="max-w-2xl">
        <LearningPathCard path={recommendedPath} />
      </div>
    </div>
  );
};

export default PersonalizedPathSection;
