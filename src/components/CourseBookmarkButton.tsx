
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CourseBookmarkButtonProps {
  inQueue: boolean;
  onToggle: () => void;
}

const CourseBookmarkButton: React.FC<CourseBookmarkButtonProps> = ({ 
  inQueue,
  onToggle
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onToggle}
          >
            {inQueue ? 
              <BookmarkCheck className="h-4 w-4 text-primary" /> : 
              <Bookmark className="h-4 w-4" />
            }
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {inQueue ? "Remove from queue" : "Add to queue"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CourseBookmarkButton;
