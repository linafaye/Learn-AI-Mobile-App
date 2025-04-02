
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { 
  getRecommendedPath, 
  getRecommendedCourses
} from "@/utils/learningPathUtils";

// Import refactored components
import DashboardStats from "@/components/dashboard/DashboardStats";
import PersonalizedPathSection from "@/components/dashboard/PersonalizedPathSection";
import ContinueLearningSection from "@/components/dashboard/ContinueLearningSection";
import RecommendedCoursesSection from "@/components/dashboard/RecommendedCoursesSection";
import DashboardCourseCard from "@/components/dashboard/DashboardCourseCard";

const Dashboard = () => {
  const { user } = useAuth();
  
  // Get recommended learning path based on user preferences
  const recommendedPath = getRecommendedPath(user);
  
  // Get recommended individual courses
  const recommendedCourses = getRecommendedCourses(user, 3);
  
  const getLearningGoalText = () => {
    switch (user?.preferences?.learningGoal) {
      case "casual":
        return "Casual Learning";
      case "professional":
        return "Professional Growth";
      case "skill":
        return "Skill Development";
      default:
        return "Learning";
    }
  };
  
  const getFormatPreferenceText = () => {
    if (!user?.preferences?.learningExperience) return "";
    return user.preferences.learningExperience === "voice" 
      ? " with audio content"
      : " with interactive exercises";
  };
  
  return (
    <AppLayout>
      <div className="p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Continue your {getLearningGoalText()} journey{getFormatPreferenceText()}.
          </p>
        </header>
        
        <DashboardStats />
        
        <PersonalizedPathSection recommendedPath={recommendedPath} />
        
        <ContinueLearningSection courses={recommendedCourses} />
        
        <RecommendedCoursesSection courses={recommendedCourses} />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
