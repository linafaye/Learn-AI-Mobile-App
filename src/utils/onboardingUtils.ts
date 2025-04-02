
import { CustomerRole, LearningGoal, TargetTime, WeeklyFrequency, LearningExperience } from "@/contexts/AuthContext";

// Helper function to check if user has completed onboarding
export const hasCompletedOnboarding = (user: any) => {
  if (!user?.preferences) return false;
  
  return !!(
    user.preferences.customerRole &&
    user.preferences.learningGoal &&
    user.preferences.targetTime &&
    user.preferences.weeklyFrequency &&
    user.preferences.learningExperience
  );
};

// Get step title based on current step
export const getStepTitle = (step: number): string => {
  switch (step) {
    case 1:
      return "What's your role?";
    case 2:
      return "What's your learning goal?";
    case 3:
      return "How much time do you have for learning?";
    case 4:
      return "How often would you like to learn?";
    case 5:
      return "Preferred learning experience?";
    default:
      return "";
  }
};

// Get step description based on current step
export const getStepDescription = (step: number): string => {
  switch (step) {
    case 1:
      return "Select your professional role so we can tailor content to your needs.";
    case 2:
      return "Choose what best describes your intention for using our app.";
    case 3:
      return "We'll adjust content length to fit your schedule.";
    case 4:
      return "Set a learning frequency that works for you.";
    case 5:
      return "Choose your preferred way to consume content.";
    default:
      return "";
  }
};

// Check if current step is valid to proceed
export const canProceed = (
  step: number, 
  { customerRole, learningGoal, targetTime, weeklyFrequency, learningExperience }: {
    customerRole?: CustomerRole;
    learningGoal?: LearningGoal;
    targetTime?: TargetTime;
    weeklyFrequency?: WeeklyFrequency;
    learningExperience?: LearningExperience;
  }
): boolean => {
  switch (step) {
    case 1:
      return !!customerRole;
    case 2:
      return !!learningGoal;
    case 3:
      return !!targetTime;
    case 4:
      return !!weeklyFrequency;
    case 5:
      return !!learningExperience;
    default:
      return false;
  }
};
