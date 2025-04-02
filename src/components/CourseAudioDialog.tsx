
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface CourseAudioDialogProps {
  title: string;
  duration?: number;
  content?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CourseAudioDialog: React.FC<CourseAudioDialogProps> = ({
  title,
  duration,
  content,
  open,
  onOpenChange
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {duration && (
            <DialogDescription>
              {duration} minute audio content
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="mt-4 whitespace-pre-line text-sm">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseAudioDialog;
