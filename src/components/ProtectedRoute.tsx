
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user needs to complete onboarding
  // Don't redirect to onboarding if user is already on onboarding page
  // Also don't redirect if user is on learn page, since that's where they're sent if they close the dialog
  if (user && 
      !hasCompletedOnboarding(user) && 
      location.pathname !== "/onboarding" &&
      location.pathname !== "/learn") {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

// Helper function to check if user has completed onboarding
const hasCompletedOnboarding = (user: any) => {
  if (!user.preferences) return false;
  
  return !!(
    user.preferences.customerRole &&
    user.preferences.learningGoal &&
    user.preferences.targetTime &&
    user.preferences.weeklyFrequency &&
    user.preferences.learningExperience
  );
};

export default ProtectedRoute;
