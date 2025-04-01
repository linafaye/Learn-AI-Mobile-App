
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LearningPath, LearningCourse } from "@/utils/learningPathUtils";
import { Clock, PlayCircle, BookOpen, Headphones, Mouse } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface LearningPathCardProps {
  path: LearningPath;
  compact?: boolean;
}

export const LearningPathCard = ({ path, compact = false }: LearningPathCardProps) => {
  // Calculate overall progress if any courses have progress
  const coursesWithProgress = path.courses.filter(course => course.progress !== undefined && course.progress > 0);
  const overallProgress = coursesWithProgress.length > 0
    ? Math.round(coursesWithProgress.reduce((sum, course) => sum + (course.progress || 0), 0) / path.courses.length)
    : 0;
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="bg-primary/5 pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{path.title}</CardTitle>
          <div className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
            {path.totalDuration} min
          </div>
        </div>
        {!compact && <p className="text-sm text-muted-foreground">{path.description}</p>}
      </CardHeader>
      
      <CardContent className={compact ? "p-3" : "p-4"}>
        {overallProgress > 0 && (
          <div className="mb-4 space-y-1">
            <div className="flex justify-between text-xs">
              <span>Overall Progress</span>
              <span>{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-1.5" />
          </div>
        )}
        
        <div className="space-y-3">
          {path.courses.slice(0, compact ? 2 : undefined).map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
          
          {compact && path.courses.length > 2 && (
            <div className="text-xs text-muted-foreground text-center">
              +{path.courses.length - 2} more courses
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/30 pt-3">
        <Button asChild className="w-full">
          <Link to="/learn">
            {overallProgress > 0 ? (
              <>
                <PlayCircle className="mr-2 h-4 w-4" />
                Continue Path
              </>
            ) : (
              <>
                <BookOpen className="mr-2 h-4 w-4" />
                Start Learning Path
              </>
            )}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

interface CourseItemProps {
  course: LearningCourse;
}

const CourseItem = ({ course }: CourseItemProps) => {
  // Format icons based on content type
  const FormatIcon = course.format === "audio" ? Headphones : Mouse;
  
  return (
    <div className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
      <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
        <img src={course.image} alt={course.title} className="h-8 w-8 object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{course.title}</h4>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{course.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <FormatIcon className="h-3 w-3" />
            <span className="capitalize">{course.format}</span>
          </div>
        </div>
      </div>
      {course.progress !== undefined && course.progress > 0 && (
        <div className="h-1.5 w-12 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary"
            style={{ width: `${course.progress}%` }} 
          />
        </div>
      )}
    </div>
  );
};
