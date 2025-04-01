
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";

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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!learningGoal || !targetTime || !learningExperience) {
      return;
    }
    
    try {
      setIsLoading(true);
      updateUserPreferences({
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
  
  return (
    <AppLayout showNav={false}>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50">
        <div className="container max-w-3xl mx-auto py-12 px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Welcome to AI Learn</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Help us personalize your learning experience by answering a few quick questions.
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Learning Goal */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">What's your learning goal?</h2>
                    <p className="text-muted-foreground">Choose what best describes your intention for using our app.</p>
                    
                    <RadioGroup value={learningGoal} onValueChange={(value) => setLearningGoal(value as any)}>
                      <div className="grid gap-4 mt-4">
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value="casual" id="goal-casual" className="mt-1" />
                          <div className="space-y-1.5">
                            <Label htmlFor="goal-casual" className="text-base font-medium">Casual Learning</Label>
                            <p className="text-sm text-muted-foreground">I want to explore AI concepts casually out of curiosity</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value="professional" id="goal-professional" className="mt-1" />
                          <div className="space-y-1.5">
                            <Label htmlFor="goal-professional" className="text-base font-medium">Professional Growth</Label>
                            <p className="text-sm text-muted-foreground">I need to understand AI for my current or future job</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value="skill" id="goal-skill" className="mt-1" />
                          <div className="space-y-1.5">
                            <Label htmlFor="goal-skill" className="text-base font-medium">Specific Skill Development</Label>
                            <p className="text-sm text-muted-foreground">I want to build specific skills to use AI in my projects</p>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
              
              {/* Target Time */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">How much time do you have for learning?</h2>
                    <p className="text-muted-foreground">We'll tailor content to fit your schedule.</p>
                    
                    <RadioGroup value={targetTime?.toString()} onValueChange={(value) => setTargetTime(parseInt(value) as any)}>
                      <div className="grid gap-4 mt-4">
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value="5" id="time-5" className="mt-1" />
                          <div className="space-y-1.5">
                            <Label htmlFor="time-5" className="text-base font-medium">5 minutes</Label>
                            <p className="text-sm text-muted-foreground">Quick microlearning sessions</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value="10" id="time-10" className="mt-1" />
                          <div className="space-y-1.5">
                            <Label htmlFor="time-10" className="text-base font-medium">10 minutes</Label>
                            <p className="text-sm text-muted-foreground">Standard learning sessions</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value="15" id="time-15" className="mt-1" />
                          <div className="space-y-1.5">
                            <Label htmlFor="time-15" className="text-base font-medium">15 minutes</Label>
                            <p className="text-sm text-muted-foreground">Deep dive learning sessions</p>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
              
              {/* Learning Experience */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Preferred learning experience?</h2>
                    <p className="text-muted-foreground">Choose your preferred way to consume content.</p>
                    
                    <RadioGroup value={learningExperience} onValueChange={(value) => setLearningExperience(value as any)}>
                      <div className="grid gap-4 mt-4">
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value="voice" id="exp-voice" className="mt-1" />
                          <div className="space-y-1.5">
                            <Label htmlFor="exp-voice" className="text-base font-medium">Voice-only</Label>
                            <p className="text-sm text-muted-foreground">Listen to lessons like a podcast</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value="interactive" id="exp-interactive" className="mt-1" />
                          <div className="space-y-1.5">
                            <Label htmlFor="exp-interactive" className="text-base font-medium">Interactive</Label>
                            <p className="text-sm text-muted-foreground">Learn through interactive exercises and visuals</p>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-center">
                <Button 
                  className="w-full md:w-auto md:min-w-[200px]" 
                  type="submit"
                  disabled={isLoading || !learningGoal || !targetTime || !learningExperience}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Start Learning"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Onboarding;
