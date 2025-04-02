
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { LearningExperience } from "@/contexts/AuthContext";

interface LearningExperienceStepProps {
  value: LearningExperience | undefined;
  onChange: (value: LearningExperience) => void;
}

const LearningExperienceStep = ({ value, onChange }: LearningExperienceStepProps) => {
  return (
    <RadioGroup value={value} onValueChange={(value) => onChange(value as LearningExperience)}>
      <div className="grid gap-4 mt-2">
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="voice" id="exp-voice" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="exp-voice" className="text-base font-medium">Hands-free voice only</Label>
            <p className="text-sm text-muted-foreground">Listen to lessons like a podcast</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="interactive" id="exp-interactive" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="exp-interactive" className="text-base font-medium">Interactive</Label>
            <p className="text-sm text-muted-foreground">Learn through interactive exercises and visuals</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="both" id="exp-both" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="exp-both" className="text-base font-medium">Both</Label>
            <p className="text-sm text-muted-foreground">Combine audio content with interactive elements</p>
          </div>
        </div>
      </div>
    </RadioGroup>
  );
};

export default LearningExperienceStep;
