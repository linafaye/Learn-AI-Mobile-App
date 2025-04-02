
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TargetTime } from "@/contexts/AuthContext";

interface TargetTimeStepProps {
  value: TargetTime | undefined;
  onChange: (value: TargetTime) => void;
}

const TargetTimeStep = ({ value, onChange }: TargetTimeStepProps) => {
  return (
    <RadioGroup value={value?.toString()} onValueChange={(value) => onChange(parseInt(value) as TargetTime)}>
      <div className="grid gap-4 mt-2">
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="5" id="time-5" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="time-5" className="text-base font-medium">5 minutes</Label>
            <p className="text-sm text-muted-foreground">Quick microlearning sessions</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="10" id="time-10" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="time-10" className="text-base font-medium">10 minutes</Label>
            <p className="text-sm text-muted-foreground">Standard learning sessions</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="15" id="time-15" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="time-15" className="text-base font-medium">15 minutes</Label>
            <p className="text-sm text-muted-foreground">Deep dive learning sessions</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="20" id="time-20" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="time-20" className="text-base font-medium">20+ minutes</Label>
            <p className="text-sm text-muted-foreground">Extended in-depth learning</p>
          </div>
        </div>
      </div>
    </RadioGroup>
  );
};

export default TargetTimeStep;
