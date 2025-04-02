
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, Headphones, MousePointer } from "lucide-react";
import { ContentFormat } from "@/utils/learningPathUtils";

interface CourseFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  formatFilter: ContentFormat | "all";
  filterByFormat: (format: ContentFormat | "all") => void;
  filterByCategory: (category: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  formatFilter,
  filterByFormat,
  filterByCategory,
  handleSearch
}) => {
  return (
    <>
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
      </Tabs>
    </>
  );
};

export default CourseFilters;
