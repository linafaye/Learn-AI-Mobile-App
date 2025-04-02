
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { getStepTitle, getStepDescription, canProceed } from "@/utils/onboardingUtils";
import CustomerRoleStep from "./CustomerRoleStep";
import LearningGoalStep from "./LearningGoalStep";
import TargetTimeStep from "./TargetTimeStep";
import WeeklyFrequencyStep from "./WeeklyFrequencyStep";
import LearningExperienceStep from "./LearningExperienceStep";
import { CustomerRole, LearningGoal, TargetTime, WeeklyFrequency, LearningExperience } from "@/contexts/AuthContext";

interface OnboardingDialogContentProps {
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;
  customerRole?: CustomerRole;
  learningGoal?: LearningGoal;
  targetTime?: TargetTime;
  weeklyFrequency?: WeeklyFrequency;
  learningExperience?: LearningExperience;
  setCustomerRole: (value: CustomerRole) => void;
  setLearningGoal: (value: LearningGoal) => void;
  setTargetTime: (value: TargetTime) => void;
  setWeeklyFrequency: (value: WeeklyFrequency) => void;
  setLearningExperience: (value: LearningExperience) => void;
  nextStep: () => void;
  previousStep: () => void;
  handleSubmit: () => void;
}

const OnboardingDialogContent = ({
  currentStep,
  totalSteps,
  isLoading,
  customerRole,
  learningGoal,
  targetTime,
  weeklyFrequency,
  learningExperience,
  setCustomerRole,
  setLearningGoal,
  setTargetTime,
  setWeeklyFrequency,
  setLearningExperience,
  nextStep,
  previousStep,
  handleSubmit
}: OnboardingDialogContentProps) => {
  const progress = Math.round((currentStep / totalSteps) * 100);
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <CustomerRoleStep value={customerRole} onChange={setCustomerRole} />;
      case 2:
        return <LearningGoalStep value={learningGoal} onChange={setLearningGoal} />;
      case 3:
        return <TargetTimeStep value={targetTime} onChange={setTargetTime} />;
      case 4:
        return <WeeklyFrequencyStep value={weeklyFrequency} onChange={setWeeklyFrequency} />;
      case 5:
        return <LearningExperienceStep value={learningExperience} onChange={setLearningExperience} />;
      default:
        return null;
    }
  };

  const userPreferences = {
    customerRole,
    learningGoal,
    targetTime,
    weeklyFrequency,
    learningExperience
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <DialogTitle>{getStepTitle(currentStep)}</DialogTitle>
        <DialogDescription>{getStepDescription(currentStep)}</DialogDescription>
      </DialogHeader>
      
      <div className="py-4 max-h-[60vh] overflow-y-auto">
        {renderCurrentStep()}
      </div>
      
      <div className="flex justify-between mt-2">
        {currentStep > 1 ? (
          <Button variant="outline" onClick={previousStep}>
            Back
          </Button>
        ) : (
          <div></div> // Empty div to maintain the flex layout
        )}
        
        {currentStep < totalSteps ? (
          <Button 
            onClick={nextStep} 
            disabled={!canProceed(currentStep, userPreferences)}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            disabled={isLoading || !canProceed(currentStep, userPreferences)}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Finish
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </DialogContent>
  );
};

export default OnboardingDialogContent;
