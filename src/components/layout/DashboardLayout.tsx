
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import ColorDivider from "../ColorDivider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-sakewinkel-background">
        <DashboardSidebar />
        <main className="flex-1">
          <div className="p-6">
            <div className="mb-4">
              <SidebarTrigger />
            </div>
            <ColorDivider />
            <div className="mt-6">{children}</div>
            <ColorDivider />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
