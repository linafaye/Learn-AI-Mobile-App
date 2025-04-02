
import StatsCard from "./StatsCard";
import { Award, Clock, BarChart } from "lucide-react";

// Learning stats data
const learningStats = [
  { label: "Lessons Completed", value: 7, icon: Award },
  { label: "Minutes Learned", value: 73, icon: Clock },
  { label: "Current Streak", value: 3, icon: BarChart }
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {learningStats.map((stat, index) => (
        <StatsCard 
          key={index} 
          label={stat.label} 
          value={stat.value} 
          icon={stat.icon} 
        />
      ))}
    </div>
  );
};

export default DashboardStats;
