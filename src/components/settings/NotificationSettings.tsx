
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export function NotificationSettings() {
  const { toast } = useToast();
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    dailyReminders: true,
    newContent: true,
    achievements: true,
    weeklyRecap: false
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

  return (
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
  );
}
