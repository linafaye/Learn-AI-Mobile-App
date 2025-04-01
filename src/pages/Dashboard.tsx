
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlayCircle, BookOpen, Award, Clock, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { LearningPathCard } from "@/components/LearningPathCard";
import { 
  getRecommendedPath, 
  getRecommendedCourses, 
  LearningCourse 
} from "@/utils/learningPathUtils";

// Learning stats data
const learningStats = [
  { label: "Lessons Completed", value: 7, icon: Award },
  { label: "Minutes Learned", value: 73, icon: Clock },
  { label: "Current Streak", value: 3, icon: BarChart }
];

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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {learningStats.map((stat, index) => (
            <Card key={index} className="p-4 flex">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>
        
        {recommendedPath && (
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
        )}
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Continue Learning</h2>
            <Link to="/learn">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recommendedCourses.slice(0, 2).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recommended For You</h2>
            <Link to="/learn">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedCourses.map((course) => (
              <RecommendedCourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

interface CourseCardProps {
  course: LearningCourse;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex h-full">
        <div className="w-1/4 bg-muted flex items-center justify-center p-4">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="w-3/4 p-4 flex flex-col">
          <div className="mb-2">
            <span className="text-xs text-muted-foreground">{course.category}</span>
            <h3 className="font-semibold">{course.title}</h3>
          </div>
          
          <div className="mb-2 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration} min</span>
            </div>
            <div className="flex items-center">
              <span className="capitalize text-xs px-2 py-0.5 bg-muted rounded-full">
                {course.format}
              </span>
            </div>
          </div>
          
          <div className="mt-auto space-y-2">
            <div className="flex justify-between text-sm">
              <span>{course.progress ? `${course.progress}% complete` : "New"}</span>
              <span>{course.progress && course.progress > 0 ? "Continue" : "Start"}</span>
            </div>
            <Progress value={course.progress || 0} className="h-2" />
          </div>
        </div>
      </div>
    </Card>
  );
};

const RecommendedCourseCard = ({ course }: CourseCardProps) => {
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
          <span className="text-xs bg-muted rounded-full px-2 py-1 capitalize">
            {course.format}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>{course.duration} min</span>
        </div>
        
        {course.progress !== undefined && course.progress > 0 && (
          <div className="mb-4 space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-1.5" />
          </div>
        )}
        
        <div className="mt-auto">
          <Button className="w-full" size="sm">
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

export default Dashboard;
