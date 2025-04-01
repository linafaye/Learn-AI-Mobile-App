
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlayCircle, BookOpen, Award, Clock, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for the dashboard
const mockCourses = [
  {
    id: 1,
    title: "Introduction to AI Concepts",
    category: "Fundamentals",
    progress: 45,
    duration: "15 min",
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103652.png"
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    category: "Machine Learning",
    progress: 20,
    duration: "10 min",
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png"
  },
  {
    id: 3,
    title: "Neural Networks 101",
    category: "Deep Learning",
    progress: 0,
    duration: "15 min",
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103674.png"
  }
];

const learningStats = [
  { label: "Lessons Completed", value: 7, icon: Award },
  { label: "Minutes Learned", value: 73, icon: Clock },
  { label: "Current Streak", value: 3, icon: BarChart }
];

const Dashboard = () => {
  const { user } = useAuth();
  
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
  
  return (
    <AppLayout>
      <div className="p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Continue your {getLearningGoalText()} journey with personalized content.
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
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Continue Learning</h2>
            <Link to="/learn">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockCourses.slice(0, 2).map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                    
                    <div className="mb-2 flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    
                    <div className="mt-auto space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{course.progress}% complete</span>
                        <span>{course.progress > 0 ? "Continue" : "Start"}</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recommended for You</h2>
            <Link to="/learn">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                <div className="aspect-video bg-muted flex items-center justify-center p-6">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="mb-2">
                    <span className="text-xs text-muted-foreground">{course.category}</span>
                    <h3 className="font-semibold">{course.title}</h3>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="mt-auto">
                    <Button className="w-full" size="sm">
                      {course.progress > 0 ? (
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
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
