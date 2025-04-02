import AppLayout from "@/components/AppLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Moon, 
  Smartphone, 
  Lock, 
  Globe, 
  Volume2, 
  HelpCircle,
  User,
  Mail,
  Camera,
  BookOpen,
  Award,
  Flame,
  Star
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { UserPreferences } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

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

const Settings = () => {
  const { toast } = useToast();
  const { user, updateUserPreferences } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
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
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    dailyReminders: true,
    newContent: true,
    achievements: true,
    weeklyRecap: false
  });
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    shareProgress: true,
    learningAnalytics: true,
    historySaving: true
  });
  
  // App settings
  const [appSettings, setAppSettings] = useState({
    downloadOverWifi: true,
    offlineMode: false,
    autoPlay: true
  });
  
  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key]
    });
    
    toast({
      title: "Settings updated",
      description: `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} ${!notificationSettings[key] ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handlePrivacyChange = (key: keyof typeof privacySettings) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key]
    });
    
    toast({
      title: "Privacy setting updated",
      description: `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} ${!privacySettings[key] ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handleAppSettingChange = (key: keyof typeof appSettings) => {
    setAppSettings({
      ...appSettings,
      [key]: !appSettings[key]
    });
    
    toast({
      title: "App setting updated",
      description: `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} ${!appSettings[key] ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    
    toast({
      title: "Appearance updated",
      description: `${!darkMode ? 'Dark' : 'Light'} mode enabled.`,
    });
  };
  
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
    <AppLayout>
      <div className="p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Configure your app preferences and account settings
          </p>
        </header>
        
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="app">App Settings</TabsTrigger>
            <TabsTrigger value="help">Help & Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
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
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <CardTitle>Notification Settings</CardTitle>
                </div>
                <CardDescription>
                  Configure how you want to be notified about your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="daily-reminders">Daily Learning Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Get reminded to continue your learning daily
                      </p>
                    </div>
                    <Switch
                      id="daily-reminders"
                      checked={notificationSettings.dailyReminders}
                      onCheckedChange={() => handleNotificationChange('dailyReminders')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-content">New Content Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new content relevant to your interests is added
                      </p>
                    </div>
                    <Switch
                      id="new-content"
                      checked={notificationSettings.newContent}
                      onCheckedChange={() => handleNotificationChange('newContent')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="achievements">Achievement Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you earn badges or complete milestones
                      </p>
                    </div>
                    <Switch
                      id="achievements"
                      checked={notificationSettings.achievements}
                      onCheckedChange={() => handleNotificationChange('achievements')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-recap">Weekly Learning Recap</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a summary of your weekly learning progress
                      </p>
                    </div>
                    <Switch
                      id="weekly-recap"
                      checked={notificationSettings.weeklyRecap}
                      onCheckedChange={() => handleNotificationChange('weeklyRecap')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-primary" />
                  <CardTitle>Appearance</CardTitle>
                </div>
                <CardDescription>
                  Customize how the app looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use dark theme for the app interface
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="text-size">Text Size</Label>
                    <p className="text-sm text-muted-foreground">
                      Default text size is used
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">A</span>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      defaultValue="3"
                      className="w-24"
                    />
                    <span className="text-muted-foreground">A</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <CardTitle>Privacy</CardTitle>
                </div>
                <CardDescription>
                  Control your data and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="share-progress">Share Learning Progress</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow the app to share your learning progress for community features
                      </p>
                    </div>
                    <Switch
                      id="share-progress"
                      checked={privacySettings.shareProgress}
                      onCheckedChange={() => handlePrivacyChange('shareProgress')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="learning-analytics">Learning Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to collect data to improve your learning experience
                      </p>
                    </div>
                    <Switch
                      id="learning-analytics"
                      checked={privacySettings.learningAnalytics}
                      onCheckedChange={() => handlePrivacyChange('learningAnalytics')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="history-saving">Save Learning History</Label>
                      <p className="text-sm text-muted-foreground">
                        Keep track of your completed lessons and courses
                      </p>
                    </div>
                    <Switch
                      id="history-saving"
                      checked={privacySettings.historySaving}
                      onCheckedChange={() => handlePrivacyChange('historySaving')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="app">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <CardTitle>App Settings</CardTitle>
                </div>
                <CardDescription>
                  Configure how the app works on your device
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="download-wifi">Download Over Wi-Fi Only</Label>
                      <p className="text-sm text-muted-foreground">
                        Only download content when connected to Wi-Fi
                      </p>
                    </div>
                    <Switch
                      id="download-wifi"
                      checked={appSettings.downloadOverWifi}
                      onCheckedChange={() => handleAppSettingChange('downloadOverWifi')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="offline-mode">Offline Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Access previously downloaded content without an internet connection
                      </p>
                    </div>
                    <Switch
                      id="offline-mode"
                      checked={appSettings.offlineMode}
                      onCheckedChange={() => handleAppSettingChange('offlineMode')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-play">Auto-Play Next Lesson</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically start the next lesson when the current one finishes
                      </p>
                    </div>
                    <Switch
                      id="auto-play"
                      checked={appSettings.autoPlay}
                      onCheckedChange={() => handleAppSettingChange('autoPlay')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="language">App Language</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose the language for the app interface
                      </p>
                    </div>
                    <select 
                      id="language" 
                      className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                      defaultValue="en"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="help">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <CardTitle>Help & Support</CardTitle>
                </div>
                <CardDescription>
                  Get help and learn more about using the app
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="text-lg font-medium mb-2">FAQ</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Find answers to commonly asked questions about the app
                    </p>
                    <a href="#" className="text-primary hover:underline text-sm">View FAQ</a>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Contact Support</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Need help? Reach out to our support team
                    </p>
                    <a href="#" className="text-primary hover:underline text-sm">Contact Support</a>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Tutorials</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn how to make the most of the app's features
                    </p>
                    <a href="#" className="text-primary hover:underline text-sm">View Tutorials</a>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Privacy Policy</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Read our privacy policy and terms of service
                    </p>
                    <div className="flex gap-4">
                      <a href="#" className="text-primary hover:underline text-sm">Privacy Policy</a>
                      <a href="#" className="text-primary hover:underline text-sm">Terms of Service</a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
