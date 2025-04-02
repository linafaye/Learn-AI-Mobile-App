
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { User, Camera, BookOpen, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { UserPreferences } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form validation schema for profile
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." })
});

// Form validation schema for preferences
const preferencesFormSchema = z.object({
  customerRole: z.string().optional(),
  learningGoal: z.string().optional(),
  weeklyFrequency: z.string().optional(),
  learningExperience: z.string().optional(),
  targetTime: z.string().optional()
});

export function ProfileSettings() {
  const { toast } = useToast();
  const { user, updateUserPreferences } = useAuth();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPreferences, setIsUpdatingPreferences] = useState(false);
  
  // Profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || ""
    }
  });

  // Preference form
  const preferencesForm = useForm<z.infer<typeof preferencesFormSchema>>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      customerRole: user?.preferences?.customerRole,
      learningGoal: user?.preferences?.learningGoal,
      weeklyFrequency: user?.preferences?.weeklyFrequency,
      learningExperience: user?.preferences?.learningExperience,
      targetTime: user?.preferences?.targetTime?.toString()
    }
  });
  
  // Update forms when user changes
  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        email: user.email
      });
      
      preferencesForm.reset({
        customerRole: user.preferences?.customerRole,
        learningGoal: user.preferences?.learningGoal,
        weeklyFrequency: user.preferences?.weeklyFrequency,
        learningExperience: user.preferences?.learningExperience,
        targetTime: user.preferences?.targetTime?.toString()
      });
    }
  }, [user, profileForm, preferencesForm]);
  
  const onProfileSubmit = (data: z.infer<typeof profileFormSchema>) => {
    setIsUpdatingProfile(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would update the user profile with an API call
      setIsUpdatingProfile(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  };
  
  const onPreferencesSubmit = (data: z.infer<typeof preferencesFormSchema>) => {
    setIsUpdatingPreferences(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPreferences: UserPreferences = {
        customerRole: data.customerRole as any,
        learningGoal: data.learningGoal as any,
        weeklyFrequency: data.weeklyFrequency as any,
        learningExperience: data.learningExperience as any,
        targetTime: data.targetTime ? parseInt(data.targetTime) as any : undefined
      };
      
      updateUserPreferences(newPreferences);
      setIsUpdatingPreferences(false);
    }, 1000);
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Your Profile</CardTitle>
          </div>
          <CardDescription>
            Update your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-semibold">
                    {user?.name.substring(0, 1).toUpperCase()}
                  </div>
                  <button type="button" className="absolute bottom-0 right-0 h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <Button type="submit" disabled={isUpdatingProfile}>
                {isUpdatingProfile ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <CardTitle>Learning Preferences</CardTitle>
          </div>
          <CardDescription>
            Customize your learning experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...preferencesForm}>
            <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={preferencesForm.control}
                  name="customerRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>I am a...</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="administrator">Administrator</SelectItem>
                          <SelectItem value="data_analyst">Data Analyst/Scientist</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="solution_architect">Solution Architect</SelectItem>
                          <SelectItem value="it">IT</SelectItem>
                          <SelectItem value="data_engineer">Data Engineer</SelectItem>
                          <SelectItem value="security_engineer">Security Engineer</SelectItem>
                          <SelectItem value="ai_engineer">AI Engineer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={preferencesForm.control}
                  name="learningGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Learning Goal</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="casual">Casual Learning</SelectItem>
                          <SelectItem value="professional">Professional Growth</SelectItem>
                          <SelectItem value="skill">Skill Development</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={preferencesForm.control}
                  name="targetTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Session Time</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select session length" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="5">5 minutes</SelectItem>
                          <SelectItem value="10">10 minutes</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={preferencesForm.control}
                  name="weeklyFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weekly Frequency</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="once">Once a week</SelectItem>
                          <SelectItem value="twice">Twice a week</SelectItem>
                          <SelectItem value="thrice">Three times a week</SelectItem>
                          <SelectItem value="weekday">Weekdays only</SelectItem>
                          <SelectItem value="weekend">Weekends only</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={preferencesForm.control}
                  name="learningExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Learning Experience</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="voice">Hands-free voice only</SelectItem>
                          <SelectItem value="interactive">Interactive</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit" disabled={isUpdatingPreferences}>
                {isUpdatingPreferences ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Preferences"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
