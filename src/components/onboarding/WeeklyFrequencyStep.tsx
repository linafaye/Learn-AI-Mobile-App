
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { WeeklyFrequency } from "@/contexts/AuthContext";

interface WeeklyFrequencyStepProps {
  value: WeeklyFrequency | undefined;
  onChange: (value: WeeklyFrequency) => void;
}

const WeeklyFrequencyStep = ({ value, onChange }: WeeklyFrequencyStepProps) => {
  return (
    <RadioGroup value={value} onValueChange={(value) => onChange(value as WeeklyFrequency)}>
      <div className="grid gap-4 mt-2">
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="once" id="freq-once" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="freq-once" className="text-base font-medium">Once a week</Label>
            <p className="text-sm text-muted-foreground">One learning session per week</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="twice" id="freq-twice" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="freq-twice" className="text-base font-medium">Twice a week</Label>
            <p className="text-sm text-muted-foreground">Two learning sessions per week</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="thrice" id="freq-thrice" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="freq-thrice" className="text-base font-medium">Three times a week</Label>
            <p className="text-sm text-muted-foreground">Three learning sessions per week</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="daily" id="freq-daily" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="freq-daily" className="text-base font-medium">Daily</Label>
            <p className="text-sm text-muted-foreground">Learn every day</p>
          </div>
        </div>
      </div>
    </RadioGroup>
  );
};

export default WeeklyFrequencyStep;
