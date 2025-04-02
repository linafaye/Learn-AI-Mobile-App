
import AppLayout from "@/components/AppLayout";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getAllCourses, 
  getRecommendedPath,
  LearningCourse,
  ContentFormat
} from "@/utils/learningPathUtils";
import { LearningPathCard } from "@/components/LearningPathCard";
import CourseFilters from "@/components/CourseFilters";
import CourseGrid from "@/components/CourseGrid";
import { Input } from "@/components/ui/input";
import { SearchIcon, TrendingUp } from "lucide-react";
import PopularCategories from "@/components/PopularCategories";
import TrendingCourses from "@/components/TrendingCourses";

const Learn = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [allCourses, setAllCourses] = useState<LearningCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<LearningCourse[]>([]);
  const [formatFilter, setFormatFilter] = useState<ContentFormat | "all">("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showFullGrid, setShowFullGrid] = useState(false);
  
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
    setActiveCategory(category);
    setShowFullGrid(true);
    
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
      if (activeCategory !== "all") {
        setFilteredCourses(allCourses.filter(
          course => course.category.toLowerCase() === activeCategory.toLowerCase()
        ));
      } else {
        setFilteredCourses(allCourses);
      }
    } else {
      let filtered = allCourses.filter(course => course.format === format);
      
      if (activeCategory !== "all") {
        filtered = filtered.filter(
          course => course.category.toLowerCase() === activeCategory.toLowerCase()
        );
      }
      
      setFilteredCourses(filtered);
    }
  };
  
  return (
    <AppLayout>
      <div className="p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Explore
          </h1>
          <p className="text-muted-foreground">
            Discover AI learning materials and courses
          </p>
        </header>
        
        <form onSubmit={handleSearch} className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses and topics..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        
        {!showFullGrid && (
          <>
            <PopularCategories onSelectCategory={filterByCategory} />
            
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Trending Courses</h2>
              </div>
              <TrendingCourses courses={allCourses.slice(0, 3)} />
            </div>
          </>
        )}
        
        {recommendedPath && !showFullGrid && (
          <div className="my-8">
            <h2 className="text-xl font-semibold mb-4">Your Recommended Learning Path</h2>
            <div className="max-w-2xl">
              <LearningPathCard path={recommendedPath} />
            </div>
          </div>
        )}
        
        {showFullGrid && (
          <>
            <CourseFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              formatFilter={formatFilter}
              filterByFormat={filterByFormat}
              filterByCategory={filterByCategory}
              handleSearch={handleSearch}
              activeCategory={activeCategory}
            />
            
            <CourseGrid courses={filteredCourses} />
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Learn;
