
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  
  // Get from user if available
  const [learningGoal, setLearningGoal] = useState<"casual" | "professional" | "skill" | undefined>(
    user?.preferences?.learningGoal
  );
  const [targetTime, setTargetTime] = useState<5 | 10 | 15 | undefined>(
    user?.preferences?.targetTime
  );
  const [learningExperience, setLearningExperience] = useState<"voice" | "interactive" | undefined>(
    user?.preferences?.learningExperience
  );

  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [dialogOpen, setDialogOpen] = useState(false);

  // Progress calculation
  const progress = Math.round((currentStep / totalSteps) * 100);

  // Initialize dialog on first render
  useEffect(() => {
    setDialogOpen(true);
  }, []);

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
    if (!learningGoal || !targetTime || !learningExperience) {
      return;
    }
    
    try {
      setIsLoading(true);
      await updateUserPreferences({
        learningGoal,
        targetTime,
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
        return !!learningGoal;
      case 2:
        return !!targetTime;
      case 3:
        return !!learningExperience;
      default:
        return false;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "What's your learning goal?";
      case 2:
        return "How much time do you have for learning?";
      case 3:
        return "Preferred learning experience?";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Choose what best describes your intention for using our app.";
      case 2:
        return "We'll tailor content to fit your schedule.";
      case 3:
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
          
          {/* Main dialog for step-by-step onboarding */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
              
              <div className="py-4">
                {/* Step 1: Learning Goal */}
                {currentStep === 1 && (
                  <RadioGroup value={learningGoal} onValueChange={(value) => setLearningGoal(value as any)}>
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
                          <Label htmlFor="goal-skill" className="text-base font-medium">Specific Skill Development</Label>
                          <p className="text-sm text-muted-foreground">I want to build specific skills to use AI in my projects</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                )}
                
                {/* Step 2: Target Time */}
                {currentStep === 2 && (
                  <RadioGroup value={targetTime?.toString()} onValueChange={(value) => setTargetTime(parseInt(value) as any)}>
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
                    </div>
                  </RadioGroup>
                )}
                
                {/* Step 3: Learning Experience */}
                {currentStep === 3 && (
                  <RadioGroup value={learningExperience} onValueChange={(value) => setLearningExperience(value as any)}>
                    <div className="grid gap-4 mt-2">
                      <div className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted/50">
                        <RadioGroupItem value="voice" id="exp-voice" className="mt-1" />
                        <div className="space-y-1.5">
                          <Label htmlFor="exp-voice" className="text-base font-medium">Voice-only</Label>
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
