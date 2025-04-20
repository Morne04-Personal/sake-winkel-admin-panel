import DashboardSidebar from "./DashboardSidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { signOut } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { type SidebarProps } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  const sidebarProps: SidebarProps = {
    isOpen: sidebarOpen,
    onOpenChange: setSidebarOpen,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className={cn(
          "fixed inset-0 bg-gray-800/60 z-40 lg:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      <DashboardSidebar {...sidebarProps} />

      <div
        className={cn(
          "lg:pl-72 flex flex-col flex-1 min-h-screen transition-all duration-300"
        )}
      >
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open sidebar</span>
              </Button>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <div className="text-sm text-gray-700 mr-2">
                  {user.email}
                </div>
              )}
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Sign out</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
