
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { LearningGoal } from "@/contexts/AuthContext";

interface LearningGoalStepProps {
  value: LearningGoal | undefined;
  onChange: (value: LearningGoal) => void;
}

const LearningGoalStep = ({ value, onChange }: LearningGoalStepProps) => {
  return (
    <RadioGroup value={value} onValueChange={(value) => onChange(value as LearningGoal)}>
      <div className="grid gap-4 mt-2">
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="casual" id="goal-casual" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="goal-casual" className="text-base font-medium">Casual Learning</Label>
            <p className="text-sm text-muted-foreground">I want to explore AI concepts casually out of curiosity</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="professional" id="goal-professional" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="goal-professional" className="text-base font-medium">Professional Growth</Label>
            <p className="text-sm text-muted-foreground">I need to understand AI for my current or future job</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="skill" id="goal-skill" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="goal-skill" className="text-base font-medium">Skill Development</Label>
            <p className="text-sm text-muted-foreground">I want to build specific skills to use AI in my projects</p>
          </div>
        </div>
      </div>
    </RadioGroup>
  );
};

export default LearningGoalStep;
