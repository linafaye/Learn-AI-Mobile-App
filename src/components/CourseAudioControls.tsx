
import { Button } from "@/components/ui/button";
import { Volume2, Info, PauseCircle } from "lucide-react";

interface CourseAudioControlsProps {
  isPlaying: boolean;
  audioUrl?: string;
  audioContent?: string;
  onAudioToggle: () => void;
  onViewContent: () => void;
}

const CourseAudioControls: React.FC<CourseAudioControlsProps> = ({
  isPlaying,
  audioUrl,
  audioContent,
  onAudioToggle,
  onViewContent
}) => {
  return (
    <div className="flex gap-2">
      {audioUrl && (
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onAudioToggle}
          className="flex-shrink-0"
        >
          {isPlaying ? (
            <PauseCircle className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
      )}
      
      {audioContent && (
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onViewContent}
          className="flex-shrink-0"
        >
          <Info className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default CourseAudioControls;
