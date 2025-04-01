
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, Link } from "react-router-dom";
import { 
  Home, 
  BookOpen, 
  Settings, 
  User, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, showNav = true }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = React.useState(false);

  if (!showNav) {
    return <main className="min-h-screen">{children}</main>;
  }

  const navigation = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Learn", href: "/learn", icon: BookOpen },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const NavItem = ({ item, isMobile = false }: { item: typeof navigation[0], isMobile?: boolean }) => {
    const isActive = location.pathname === item.href;
    
    return (
      <Link 
        to={item.href}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
          isActive 
            ? "bg-primary text-primary-foreground" 
            : "text-foreground hover:bg-muted",
          isMobile && "w-full"
        )}
        onClick={() => isMobile && setSheetOpen(false)}
      >
        <item.icon className="h-5 w-5" />
        <span>{item.name}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile header */}
      <header className="md:hidden sticky top-0 z-50 bg-background border-b px-4 h-14 flex items-center justify-between">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 pt-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-semibold">
                  {user?.name.substring(0, 1).toUpperCase()}
                </div>
                <h3 className="font-medium mt-2">{user?.name}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              
              <nav className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <NavItem key={item.name} item={item} isMobile />
                ))}
                
                <button 
                  onClick={() => {
                    setSheetOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-destructive hover:bg-destructive/10 w-full"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex items-center">
          <h1 className="text-lg font-semibold">AI Learn</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/profile">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
              {user?.name.substring(0, 1).toUpperCase()}
            </div>
          </Link>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex border-r w-64 p-4 flex-col h-screen sticky top-0">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary-foreground"
              >
                <path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.95 1.61 5.15" />
                <path d="M19.8 17.817a7.5 7.5 0 0 0-2.607-11.66l-.803 3.136" />
                <path d="M14.25 17.567c.15-.556.2-1.36.2-2.467a5.5 5.5 0 0 1 .236-1.6" />
                <path d="M18 3v4" />
                <path d="M14 5h8" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold">AI Learn</h1>
          </div>
          
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex flex-col items-center mb-6">
              <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-semibold">
                {user?.name.substring(0, 1).toUpperCase()}
              </div>
              <h3 className="font-medium mt-2">{user?.name}</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </nav>
            
            <div className="mt-auto">
              <button 
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-destructive hover:bg-destructive/10 w-full"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>
        
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
