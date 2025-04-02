
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export function AppearanceSettings() {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    
    toast({
      title: "Appearance updated",
      description: `${!darkMode ? 'Dark' : 'Light'} mode enabled.`,
    });
  };

  return (
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
  );
}
