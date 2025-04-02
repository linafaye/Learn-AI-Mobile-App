
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CustomerRole } from "@/contexts/AuthContext";

interface CustomerRoleStepProps {
  value: CustomerRole | undefined;
  onChange: (value: CustomerRole) => void;
}

const CustomerRoleStep = ({ value, onChange }: CustomerRoleStepProps) => {
  return (
    <RadioGroup value={value} onValueChange={(value) => onChange(value as CustomerRole)}>
      <div className="grid gap-4 mt-2">
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="developer" id="role-developer" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="role-developer" className="text-base font-medium">Developer</Label>
            <p className="text-sm text-muted-foreground">Software development professional</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="administrator" id="role-administrator" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="role-administrator" className="text-base font-medium">Administrator</Label>
            <p className="text-sm text-muted-foreground">System or platform administrator</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="data_analyst" id="role-data-analyst" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="role-data-analyst" className="text-base font-medium">Data Analyst/Scientist</Label>
            <p className="text-sm text-muted-foreground">Works with data analysis and interpretation</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="student" id="role-student" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="role-student" className="text-base font-medium">Student</Label>
            <p className="text-sm text-muted-foreground">Currently pursuing education</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="solution_architect" id="role-solution-architect" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="role-solution-architect" className="text-base font-medium">Solution Architect</Label>
            <p className="text-sm text-muted-foreground">System and solution design professional</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="it" id="role-it" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="role-it" className="text-base font-medium">IT</Label>
            <p className="text-sm text-muted-foreground">Information technology professional</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="data_engineer" id="role-data-engineer" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="role-data-engineer" className="text-base font-medium">Data Engineer</Label>
            <p className="text-sm text-muted-foreground">Builds and maintains data infrastructure</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="security_engineer" id="role-security-engineer" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="role-security-engineer" className="text-base font-medium">Security Engineer</Label>
            <p className="text-sm text-muted-foreground">Cybersecurity and information security professional</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
          <RadioGroupItem value="ai_engineer" id="role-ai-engineer" className="mt-1" />
          <div className="space-y-1.5">
            <Label htmlFor="role-ai-engineer" className="text-base font-medium">AI Engineer</Label>
            <p className="text-sm text-muted-foreground">Works on artificial intelligence solutions</p>
          </div>
        </div>
      </div>
    </RadioGroup>
  );
};

export default CustomerRoleStep;
