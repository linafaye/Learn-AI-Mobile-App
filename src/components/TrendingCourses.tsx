
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, Plus } from "lucide-react";
import { LearningCourse } from "@/utils/learningPathUtils";

interface TrendingCoursesProps {
  courses: LearningCourse[];
}

const TrendingCourses: React.FC<TrendingCoursesProps> = ({ courses }) => {
  return (
    <div className="space-y-4">
      {courses.map(course => (
        <Card key={course.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-4">
                <h3 className="font-semibold text-lg">{course.title}</h3>
                
                <div className="flex items-center mt-2 gap-4">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{course.duration} min</span>
                  </div>
                  
                  <div className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full capitalize">
                    {course.level}
                  </div>
                </div>
                
                <div className="flex items-center mt-3">
                  <div className="flex items-center text-amber-500">
                    <Star className="h-4 w-4 fill-amber-500" />
                    <span className="ml-1 font-medium">4.8</span>
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">(1250 enrolled)</span>
                </div>
              </div>
              
              <div className="p-4 flex items-center md:border-l md:border-t-0 border-t">
                <Button className="w-full" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add to Queue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TrendingCourses;
