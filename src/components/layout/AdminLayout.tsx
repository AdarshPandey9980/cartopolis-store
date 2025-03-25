
import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: ReactNode;
}

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sidebarLinks: SidebarLink[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: Package,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: ShoppingCart,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Clear any authentication data
    localStorage.removeItem("adminUser");
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel",
    });
    
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 z-50 bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
          collapsed ? "w-[70px]" : "w-[250px]",
          isMobile ? "left-[-250px]" : "left-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
            {!collapsed && (
              <Link to="/admin" className="text-lg font-semibold">
                Admin Panel
              </Link>
            )}
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed(!collapsed)}
                className="ml-auto"
              >
                {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </Button>
            )}
          </div>

          <nav className="flex-1 py-6 px-2 space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center"
                )}
              >
                <link.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className={cn(
                "w-full text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive",
                collapsed && "justify-center p-2"
              )}
              onClick={handleLogout}
            >
              <LogOut className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
              {!collapsed && <span>Log out</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 left-4 z-50 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border animate-slide-in-right">
            <div className="p-4 border-b border-sidebar-border">
              <div className="text-lg font-semibold">Admin Panel</div>
            </div>
            <nav className="py-6 px-4 space-y-1">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === link.href
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <link.icon className="h-5 w-5 mr-3" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-sidebar-border">
              <Button
                variant="ghost"
                className="w-full text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span>Log out</span>
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          isMobile ? "ml-0" : (collapsed ? "ml-[70px]" : "ml-[250px]")
        )}
      >
        <div className="container py-8 px-4 md:px-8 mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
