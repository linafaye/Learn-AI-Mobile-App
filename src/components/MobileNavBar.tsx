
import { Home, BookOpen, Award, Settings } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const MobileNavBar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", icon: Home, path: "/dashboard" },
    { name: "Learn", icon: BookOpen, path: "/learn" },
    { name: "Progress", icon: Award, path: "/progress" },
    { name: "Settings", icon: Settings, path: "/settings" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:hidden">
      <nav className="flex justify-between items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "mobile-nav-item flex-1 h-full",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileNavBar;
