
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Building2, 
  CalendarDays,
  Settings,
  BookCheck 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ColorDivider from "../ColorDivider";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Order Tracking",
    icon: BookCheck,
    url: "/order-tracking",
  },
  {
    title: "Products",
    icon: Package,
    url: "/products",
  },
  {
    title: "Suppliers",
    icon: Building2,
    url: "/suppliers",
  },
  {
    title: "Users",
    icon: Users,
    url: "/users",
  },
  {
    title: "Events",
    icon: CalendarDays,
    url: "/events",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

const DashboardSidebar = () => {
  const location = useLocation();
  
  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-6">
          <h1 className="text-h2 font-bold text-sakewinkel-navy">SAKEwinkel</h1>
          <p className="text-small text-sakewinkel-slate">Admin Dashboard</p>
        </div>
        <ColorDivider />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <Link
                      to={item.url}
                      className="flex items-center gap-3 px-4 py-2 text-sakewinkel-slate hover:text-sakewinkel-navy"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
