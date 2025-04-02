
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from "@/components/AppLayout";
import { getAllCourses } from "@/utils/learningPathUtils";
import CourseVideoPlayer from './CourseVideoPlayer';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
  const allCourses = getAllCourses();
  const course = allCourses.find(c => c.id === courseId);
  
  if (!course) {
    return (
      <AppLayout>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <Button onClick={() => navigate('/learn')}>
            Return to Learn Page
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-4 md:p-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/learn')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
        
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{course.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <span>{course.category}</span>
            <span>•</span>
            <span>{course.duration} min</span>
            <span>•</span>
            <span className="capitalize">{course.level}</span>
          </div>
          <p className="text-muted-foreground mb-6">{course.description}</p>
        </div>
        
        {course.videoUrl && (
          <div className="mb-8">
            <CourseVideoPlayer videoUrl={course.videoUrl} title={course.title} />
          </div>
        )}
        
        {course.audioContent && (
          <div className="mt-6 p-4 bg-muted rounded-md">
            <h3 className="font-medium mb-2">Transcript</h3>
            <div className="text-sm whitespace-pre-line">
              {course.audioContent}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CourseDetailPage;
