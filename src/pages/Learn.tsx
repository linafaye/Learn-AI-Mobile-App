
import AppLayout from "@/components/AppLayout";
import { TabsContent } from "@/components/ui/tabs";
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
        
        <CourseFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          formatFilter={formatFilter}
          filterByFormat={filterByFormat}
          filterByCategory={filterByCategory}
          handleSearch={handleSearch}
        />
        
        <TabsContent value="all" className="mt-6">
          <CourseGrid courses={filteredCourses} />
        </TabsContent>
        
        <TabsContent value="fundamentals" className="mt-6">
          <CourseGrid courses={filteredCourses} />
        </TabsContent>
        
        <TabsContent value="machine-learning" className="mt-6">
          <CourseGrid courses={filteredCourses} />
        </TabsContent>
        
        <TabsContent value="deep-learning" className="mt-6">
          <CourseGrid courses={filteredCourses} />
        </TabsContent>
        
        <TabsContent value="other" className="mt-6">
          <CourseGrid courses={filteredCourses} />
        </TabsContent>
      </div>
    </AppLayout>
  );
};

export default Learn;
