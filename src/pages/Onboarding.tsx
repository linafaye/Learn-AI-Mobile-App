
import { useState, useEffect } from "react";
import { useAuth, CustomerRole, LearningGoal, TargetTime, WeeklyFrequency, LearningExperience } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

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

  const progress = Math.round((currentStep / totalSteps) * 100);

  useEffect(() => {
    if (user && hasCompletedOnboarding(user)) {
      navigate("/dashboard");
    } else {
      setDialogOpen(true);
    }
  }, [user, navigate]);

  // Handle dialog close
  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    
    // If user closes the dialog, navigate to learn page
    if (!open) {
      navigate("/learn");
    }
  };

  const hasCompletedOnboarding = (user: any) => {
    if (!user.preferences) return false;
    
    return !!(
      user.preferences.customerRole &&
      user.preferences.learningGoal &&
      user.preferences.targetTime &&
      user.preferences.weeklyFrequency &&
      user.preferences.learningExperience
    );
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

  const canProceed = () => {
    switch (currentStep) {
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

  const getStepTitle = () => {
    switch (currentStep) {
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

  const getStepDescription = () => {
    switch (currentStep) {
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
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Step {currentStep} of {totalSteps}</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <DialogTitle>{getStepTitle()}</DialogTitle>
                <DialogDescription>{getStepDescription()}</DialogDescription>
              </DialogHeader>
              
              <div className="py-4 max-h-[60vh] overflow-y-auto">
                {currentStep === 1 && (
                  <RadioGroup value={customerRole} onValueChange={(value) => setCustomerRole(value as CustomerRole)}>
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
                )}
                
                {currentStep === 2 && (
                  <RadioGroup value={learningGoal} onValueChange={(value) => setLearningGoal(value as LearningGoal)}>
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
                )}
                
                {currentStep === 3 && (
                  <RadioGroup value={targetTime?.toString()} onValueChange={(value) => setTargetTime(parseInt(value) as TargetTime)}>
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
                )}
                
                {currentStep === 4 && (
                  <RadioGroup value={weeklyFrequency} onValueChange={(value) => setWeeklyFrequency(value as WeeklyFrequency)}>
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
                )}
                
                {currentStep === 5 && (
                  <RadioGroup value={learningExperience} onValueChange={(value) => setLearningExperience(value as LearningExperience)}>
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
                )}
              </div>
              
              <div className="flex justify-between mt-2">
                {currentStep > 1 ? (
                  <Button variant="outline" onClick={previousStep}>
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < totalSteps ? (
                  <Button 
                    onClick={nextStep} 
                    disabled={!canProceed()}
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={isLoading || !canProceed()}
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
          </Dialog>
        </div>
      </div>
    </AppLayout>
  );
};

export default Onboarding;
