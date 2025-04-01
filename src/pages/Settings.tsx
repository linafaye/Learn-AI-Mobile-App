
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
  HelpCircle 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  
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
        
        <Tabs defaultValue="notifications" className="space-y-8">
          <TabsList className="mb-4">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="app">App Settings</TabsTrigger>
            <TabsTrigger value="help">Help & Support</TabsTrigger>
          </TabsList>
          
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
