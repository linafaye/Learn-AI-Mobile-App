
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Lock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export function PrivacySettings() {
  const { toast } = useToast();
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    shareProgress: true,
    learningAnalytics: true,
    historySaving: true
  });
  
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

  return (
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
  );
}
