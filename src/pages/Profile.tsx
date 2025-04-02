import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Mail, 
  Clock, 
  BookOpen, 
  Goal, 
  Volume2, 
  MousePointer,
  Loader2 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const learningExperienceOptions = [
  { value: "voice", label: "Audio content" },
  { value: "interactive", label: "Interactive content" },
  { value: "both", label: "Both formats" },
];

type TargetTime = 5 | 10 | 15 | 20;

const Profile = () => {
  const { user, updateUserPreferences } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // State for preferences form
  const [learningGoal, setLearningGoal] = useState<"casual" | "professional" | "skill" | undefined>(
    user?.preferences?.learningGoal
  );
  const [targetTime, setTargetTime] = useState<TargetTime | undefined>(
    user?.preferences?.targetTime
  );
  const [learningExperience, setLearningExperience] = useState<"voice" | "interactive" | "both" | undefined>(
    user?.preferences?.learningExperience
  );
  
  const handleSavePreferences = () => {
    if (!learningGoal || !targetTime || !learningExperience) {
      return;
    }
    
    setIsLoading(true);
    
    updateUserPreferences({
      learningGoal,
      targetTime,
      learningExperience
    });
    
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  
  // Helper function to get text for preferences
  const getLearningGoalText = () => {
    switch (user?.preferences?.learningGoal) {
      case "casual":
        return "Casual Learning";
      case "professional":
        return "Professional Growth";
      case "skill":
        return "Specific Skill Development";
      default:
        return "Not set";
    }
  };
  
  const getTargetTimeText = () => {
    return user?.preferences?.targetTime
      ? `${user.preferences.targetTime} minutes`
      : "Not set";
  };
  
  const getLearningExperienceText = () => {
    switch (user?.preferences?.learningExperience) {
      case "voice":
        return "Voice-only";
      case "interactive":
        return "Interactive";
      case "both":
        return "Both formats";
      default:
        return "Not set";
    }
  };
  
  return (
    <AppLayout>
      <div className="p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Your Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your personal information and learning preferences
          </p>
        </header>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Your basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center mb-4">
                <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-semibold mb-3">
                  {user?.name.substring(0, 1).toUpperCase()}
                </div>
                <h3 className="text-xl font-medium">{user?.name}</h3>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Edit Profile</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
              <CardDescription>
                Customize your learning experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Goal className="h-4 w-4" />
                  <p className="text-sm">Learning Goal</p>
                </div>
                <RadioGroup value={learningGoal} onValueChange={(value) => setLearningGoal(value as any)}>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="casual" id="goal-casual" />
                      <Label htmlFor="goal-casual">Casual Learning</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="professional" id="goal-professional" />
                      <Label htmlFor="goal-professional">Professional Growth</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="skill" id="goal-skill" />
                      <Label htmlFor="goal-skill">Specific Skill Development</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                  <p className="text-sm">Target Time</p>
                </div>
                <RadioGroup value={targetTime?.toString()} onValueChange={(value) => setTargetTime(parseInt(value) as any)}>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5" id="time-5" />
                      <Label htmlFor="time-5">5 minutes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10" id="time-10" />
                      <Label htmlFor="time-10">10 minutes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="15" id="time-15" />
                      <Label htmlFor="time-15">15 minutes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="20" id="time-20" />
                      <Label htmlFor="time-20">20 minutes</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <BookOpen className="h-4 w-4" />
                  <p className="text-sm">Learning Experience</p>
                </div>
                <RadioGroup value={learningExperience} onValueChange={(value) => setLearningExperience(value as any)}>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="voice" id="exp-voice" />
                      <div className="flex items-center gap-1">
                        <Label htmlFor="exp-voice">Voice-only</Label>
                        <Volume2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="interactive" id="exp-interactive" />
                      <div className="flex items-center gap-1">
                        <Label htmlFor="exp-interactive">Interactive</Label>
                        <MousePointer className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="exp-both" />
                      <div className="flex items-center gap-1">
                        <Label htmlFor="exp-both">Both formats</Label>
                        <Volume2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleSavePreferences}
                disabled={isLoading || !learningGoal || !targetTime || !learningExperience}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Preferences"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Current Settings</CardTitle>
            <CardDescription>
              Your learning preferences summary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Goal className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Learning Goal</span>
                </div>
                <p className="text-sm text-muted-foreground ml-10">
                  {getLearningGoalText()}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Target Time</span>
                </div>
                <p className="text-sm text-muted-foreground ml-10">
                  {getTargetTimeText()}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Learning Experience</span>
                </div>
                <p className="text-sm text-muted-foreground ml-10">
                  {getLearningExperienceText()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Profile;
