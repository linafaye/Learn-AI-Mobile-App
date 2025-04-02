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
  Filter,
  Headphones,
  MousePointer,
  Volume2,
  PauseCircle
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getAllCourses, 
  getRecommendedPath,
  LearningCourse,
  ContentFormat
} from "@/utils/learningPathUtils";
import { LearningPathCard } from "@/components/LearningPathCard";

const Learn = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [allCourses, setAllCourses] = useState<LearningCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<LearningCourse[]>([]);
  const [formatFilter, setFormatFilter] = useState<ContentFormat | "all">("all");
  
  const recommendedPath = getRecommendedPath(user);
  
  useEffect(() => {
    const courses = getAllCourses();
    setAllCourses(courses);
    setFilteredCourses(courses);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    
    let filtered = allCourses;
    
    if (query) {
      filtered = filtered.filter(
        course => 
          course.title.toLowerCase().includes(query) || 
          course.category.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query)
      );
    }
    
    if (formatFilter !== "all") {
      filtered = filtered.filter(course => course.format === formatFilter);
    }
    
    setFilteredCourses(filtered);
  };
  
  const filterByCategory = (category: string) => {
    if (category === "all") {
      if (formatFilter !== "all") {
        setFilteredCourses(allCourses.filter(course => course.format === formatFilter));
      } else {
        setFilteredCourses(allCourses);
      }
    } else {
      let filtered = allCourses.filter(
        course => course.category.toLowerCase() === category.toLowerCase()
      );
      
      if (formatFilter !== "all") {
        filtered = filtered.filter(course => course.format === formatFilter);
      }
      
      setFilteredCourses(filtered);
    }
  };
  
  const filterByFormat = (format: ContentFormat | "all") => {
    setFormatFilter(format);
    
    if (format === "all") {
      setFilteredCourses(allCourses);
    } else {
      setFilteredCourses(allCourses.filter(course => course.format === format));
    }
  };
  
  const FormatIcon = ({ format }: { format: ContentFormat }) => {
    return format === "audio" 
      ? <Headphones className="h-4 w-4" /> 
      : <MousePointer className="h-4 w-4" />;
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
        
        {recommendedPath && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Recommended Learning Path</h2>
            <div className="max-w-2xl">
              <LearningPathCard path={recommendedPath} />
            </div>
          </div>
        )}
        
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
            <Button 
              variant={formatFilter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => filterByFormat("all")}
            >
              All Formats
            </Button>
            <Button 
              variant={formatFilter === "audio" ? "default" : "outline"} 
              size="sm"
              onClick={() => filterByFormat("audio")}
            >
              <Headphones className="mr-1 h-4 w-4" />
              Audio
            </Button>
            <Button 
              variant={formatFilter === "interactive" ? "default" : "outline"} 
              size="sm"
              onClick={() => filterByFormat("interactive")}
            >
              <MousePointer className="mr-1 h-4 w-4" />
              Interactive
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
  course: LearningCourse;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const FormatIcon = course.format === "audio" ? Headphones : MousePointer;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const handleAudioToggle = () => {
    if (!audioRef.current || !course.audioUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  useEffect(() => {
    if (course.format === "audio" && course.audioUrl) {
      audioRef.current = new Audio(course.audioUrl);
      
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
      
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener("ended", () => setIsPlaying(false));
        }
      };
    }
  }, [course]);
  
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
          <div className="flex items-center gap-1 text-xs bg-muted rounded-full px-2 py-1">
            <FormatIcon className="h-3 w-3" />
            <span className="capitalize">
              {course.level}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>{course.duration} min</span>
          <span className="mx-2">•</span>
          <FormatIcon className="h-4 w-4 mr-1" />
          <span className="capitalize">{course.format}</span>
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
          {course.format === "audio" && course.audioUrl ? (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleAudioToggle}
                className="flex-shrink-0"
              >
                {isPlaying ? (
                  <PauseCircle className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Button 
                className="w-full" 
                variant={course.progress !== undefined && course.progress > 0 ? "default" : "outline"}
              >
                {course.progress !== undefined && course.progress > 0 ? (
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
          ) : (
            <Button 
              className="w-full" 
              variant={course.progress !== undefined && course.progress > 0 ? "default" : "outline"}
            >
              {course.progress !== undefined && course.progress > 0 ? (
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
          )}
        </div>
      </div>
    </Card>
  );
};

export default Learn;
