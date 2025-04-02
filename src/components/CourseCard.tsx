
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Headphones,
  MousePointer,
  PlayCircle,
  CheckCircle,
  BookOpen,
  PauseCircle,
  Info,
  Clock,
  Volume2
} from "lucide-react";
import { LearningCourse } from "@/utils/learningPathUtils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface CourseCardProps {
  course: LearningCourse;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const FormatIcon = course.format === "audio" ? Headphones : MousePointer;
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAudioContent, setShowAudioContent] = useState(false);
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
  
  const handleAudioContentView = () => {
    setShowAudioContent(true);
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
    <>
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
            {course.format === "audio" && (course.audioUrl || course.audioContent) ? (
              <div className="flex gap-2">
                {course.audioUrl && (
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
                )}
                
                {course.audioContent && (
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleAudioContentView}
                    className="flex-shrink-0"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                )}
                
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
      
      <Dialog open={showAudioContent} onOpenChange={setShowAudioContent}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{course.title}</DialogTitle>
            <DialogDescription>
              {course.duration} minute audio content
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 whitespace-pre-line text-sm">
            {course.audioContent}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseCard;
