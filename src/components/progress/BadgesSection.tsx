
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Badge {
  name: string;
  description: string;
  icon: LucideIcon;
  achieved: boolean;
}

interface BadgesSectionProps {
  badges: Badge[];
}

const BadgesSection: React.FC<BadgesSectionProps> = ({ badges }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <CardTitle>Badges & Achievements</CardTitle>
        </div>
        <CardDescription>
          Achievements you've earned through your learning journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {badges.map((badge, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                badge.achieved ? 'bg-primary/10 border-primary' : 'bg-muted/50 border-border text-muted-foreground'
              }`}
            >
              <div className={`p-3 rounded-full mb-2 ${
                badge.achieved ? 'bg-primary/20' : 'bg-muted'
              }`}>
                <badge.icon className={`h-6 w-6 ${
                  badge.achieved ? 'text-primary' : 'text-muted-foreground'
                }`} />
              </div>
              <p className="text-sm font-medium text-center">{badge.name}</p>
              <p className="text-xs text-center mt-1">{badge.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgesSection;
