
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, BookOpen, Headphones, MousePointer, Video, Youtube } from "lucide-react";
import { LearningCourse } from "@/utils/learningPathUtils";
import CourseMetadata from "../CourseMetadata";
import CourseProgress from "../CourseProgress";

interface RecommendedCourseCardProps {
  course: LearningCourse;
}

const RecommendedCourseCard: React.FC<RecommendedCourseCardProps> = ({ course }) => {
  const getFormatIcon = () => {
    switch(course.format) {
      case "audio": return Headphones;
      case "video": return Video;
      default: return MousePointer;
    }
  };
  const FormatIcon = getFormatIcon();
  
  // Function to extract YouTube video ID from URL
  const getYoutubeVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };
  
  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="aspect-video bg-muted flex items-center justify-center p-6">
        {course.format === "video" && course.videoUrl ? (
          <div className="w-full h-full flex items-center justify-center relative">
            {course.videoUrl.includes("youtube") || course.videoUrl.includes("youtu.be") ? (
              <iframe 
                src={`https://www.youtube.com/embed/${getYoutubeVideoId(course.videoUrl)}`}
                className="w-full h-full border-0"
                allowFullScreen
                title={course.title}
              ></iframe>
            ) : (
              <>
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Video className="w-12 h-12 text-primary opacity-90" />
                </div>
              </>
            )}
          </div>
        ) : (
          <img 
            src={course.image} 
            alt={course.title}
            className="w-20 h-20 object-contain"
          />
        )}
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
        
        <CourseMetadata 
          duration={course.duration} 
          format={course.format}
          FormatIcon={FormatIcon} 
        />
        
        <CourseProgress value={course.progress || 0} />
        
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

export default RecommendedCourseCard;
