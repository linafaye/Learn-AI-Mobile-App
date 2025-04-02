
import { useState, useEffect } from "react";
import { useAuth, CustomerRole, LearningGoal, TargetTime, WeeklyFrequency, LearningExperience } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Dialog } from "@/components/ui/dialog";
import OnboardingDialogContent from "@/components/onboarding/OnboardingDialogContent";
import { hasCompletedOnboarding } from "@/utils/onboardingUtils";

const Onboarding = () => {
  const { user, updateUserPreferences } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [customerRole, setCustomerRole] = useState<CustomerRole | undefined>(
    user?.preferences?.customerRole
  );
  const [learningGoal, setLearningGoal] = useState<LearningGoal | undefined>(
    user?.preferences?.learningGoal
  );
  const [targetTime, setTargetTime] = useState<TargetTime | undefined>(
    user?.preferences?.targetTime
  );
  const [weeklyFrequency, setWeeklyFrequency] = useState<WeeklyFrequency | undefined>(
    user?.preferences?.weeklyFrequency
  );
  const [learningExperience, setLearningExperience] = useState<LearningExperience | undefined>(
    user?.preferences?.learningExperience
  );

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (user && hasCompletedOnboarding(user)) {
      navigate("/dashboard");
    } else {
      setDialogOpen(true);
    }
  }, [user, navigate]);

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    
    if (!open) {
      navigate("/learn");
    }
  };

  const handleSkip = () => {
    navigate("/learn");
  };

  const nextStep = () => {
    setCurrentStep((prev) => {
      const nextStep = prev + 1;
      
      if (nextStep > totalSteps) {
        handleSubmit();
        return prev;
      }
      
      return nextStep;
    });
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };
  
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await updateUserPreferences({
        customerRole,
        learningGoal,
        targetTime,
        weeklyFrequency,
        learningExperience
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AppLayout showNav={false}>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50 flex flex-col">
        <div className="container max-w-md mx-auto py-6 px-4 flex-1 flex flex-col">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold mb-2">Welcome to AI Learn</h1>
            <p className="text-muted-foreground">
              Help us personalize your learning experience
            </p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
            <OnboardingDialogContent
              currentStep={currentStep}
              totalSteps={totalSteps}
              isLoading={isLoading}
              customerRole={customerRole}
              learningGoal={learningGoal}
              targetTime={targetTime}
              weeklyFrequency={weeklyFrequency}
              learningExperience={learningExperience}
              setCustomerRole={setCustomerRole}
              setLearningGoal={setLearningGoal}
              setTargetTime={setTargetTime}
              setWeeklyFrequency={setWeeklyFrequency}
              setLearningExperience={setLearningExperience}
              nextStep={nextStep}
              previousStep={previousStep}
              handleSkip={handleSkip}
              handleSubmit={handleSubmit}
            />
          </Dialog>
        </div>
      </div>
    </AppLayout>
  );
};

export default Onboarding;
