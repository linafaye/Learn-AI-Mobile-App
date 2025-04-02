
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookmarkCheck } from "lucide-react";
import { LearningCourse } from "@/utils/learningPathUtils";
import CourseCard from "@/components/CourseCard";

interface QueuedCoursesSectionProps {
  courses: LearningCourse[];
}

const QueuedCoursesSection: React.FC<QueuedCoursesSectionProps> = ({ courses }) => {
  if (courses.length === 0) {
    return null;
  }
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookmarkCheck className="h-5 w-5 text-primary" />
          <CardTitle>Your Learning Queue</CardTitle>
        </div>
        <CardDescription>
          Courses you've saved to learn later
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QueuedCoursesSection;
