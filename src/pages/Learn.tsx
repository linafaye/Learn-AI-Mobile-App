
import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Clock, 
  SearchIcon, 
  BookOpen, 
  PlayCircle, 
  CheckCircle,
  Filter 
} from "lucide-react";
import { useState } from "react";

// Mock courses data
const mockAllCourses = [
  {
    id: 1,
    title: "Introduction to AI Concepts",
    category: "Fundamentals",
    progress: 45,
    duration: "15 min",
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103652.png",
    level: "Beginner"
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    category: "Machine Learning",
    progress: 20,
    duration: "10 min",
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    level: "Beginner"
  },
  {
    id: 3,
    title: "Neural Networks 101",
    category: "Deep Learning",
    progress: 0,
    duration: "15 min",
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103674.png",
    level: "Intermediate"
  },
  {
    id: 4,
    title: "Ethical AI and Responsible Development",
    category: "Ethics",
    progress: 0,
    duration: "10 min",
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103618.png",
    level: "All Levels"
  },
  {
    id: 5,
    title: "Natural Language Processing",
    category: "NLP",
    progress: 0,
    duration: "15 min",
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103666.png",
    level: "Intermediate"
  },
  {
    id: 6,
    title: "Computer Vision Fundamentals",
    category: "Computer Vision",
    progress: 0,
    duration: "15 min",
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103650.png",
    level: "Intermediate"
  },
  {
    id: 7,
    title: "Reinforcement Learning",
    category: "Machine Learning",
    progress: 0,
    duration: "10 min",
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103658.png",
    level: "Advanced"
  },
  {
    id: 8,
    title: "AI for Business Decision Making",
    category: "Business",
    progress: 0,
    duration: "10 min",
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103611.png",
    level: "All Levels"
  }
];

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(mockAllCourses);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    const filtered = mockAllCourses.filter(
      course => 
        course.title.toLowerCase().includes(query) || 
        course.category.toLowerCase().includes(query)
    );
    setFilteredCourses(filtered);
  };
  
  const filterByCategory = (category: string) => {
    if (category === "all") {
      setFilteredCourses(mockAllCourses);
    } else {
      const filtered = mockAllCourses.filter(
        course => course.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredCourses(filtered);
    }
  };
  
  return (
    <AppLayout>
      <div className="p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Learn AI with Microsoft Content
          </h1>
          <p className="text-muted-foreground">
            Explore our collection of AI learning materials from Microsoft Learn
          </p>
        </header>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              Level
            </Button>
            <Button variant="outline" size="sm">
              Duration
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all" onClick={() => filterByCategory("all")}>All</TabsTrigger>
            <TabsTrigger value="fundamentals" onClick={() => filterByCategory("fundamentals")}>Fundamentals</TabsTrigger>
            <TabsTrigger value="machine-learning" onClick={() => filterByCategory("machine learning")}>Machine Learning</TabsTrigger>
            <TabsTrigger value="deep-learning" onClick={() => filterByCategory("deep learning")}>Deep Learning</TabsTrigger>
            <TabsTrigger value="other" onClick={() => filterByCategory("ethics")}>Ethics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="fundamentals" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="machine-learning" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="deep-learning" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="other" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    category: string;
    progress: number;
    duration: string;
    image: string;
    level: string;
  };
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
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
          <span className="text-xs bg-muted rounded-full px-2 py-1">
            {course.level}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>{course.duration}</span>
        </div>
        
        {course.progress > 0 && (
          <div className="mb-4 space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-1.5" />
          </div>
        )}
        
        <div className="mt-auto">
          <Button className="w-full" variant={course.progress > 0 ? "default" : "outline"}>
            {course.progress > 0 ? (
              <>
                <PlayCircle className="mr-2 h-4 w-4" />
                Continue
              </>
            ) : course.progress === 100 ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Completed
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

export default Learn;
