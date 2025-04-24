import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  Settings,
  User,
  Users,
  X,
  Baby
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  { title: "Dashboard", icon: Home, href: "/dashboard" },
  { title: "Baby Care", icon: Baby, href: "/baby-care" },
  { title: "Patients", icon: Users, href: "/patients" },
  { title: "Caregivers", icon: User, href: "/caregivers" },
  { title: "Visits", icon: Calendar, href: "/visits" },
  { title: "Reports", icon: ClipboardList, href: "/reports" },
  { title: "Settings", icon: Settings, href: "/settings" },
];

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside 
        className={`
          ${isMobile 
            ? `fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ease-in-out transform
               ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`
            : "w-64 sticky top-0 h-screen"
          }
          bg-white border-r border-border flex flex-col
        `}
      >
        <div className="h-16 flex items-center px-4 border-b border-border justify-between">
          <h1 className="font-bold text-xl text-care-blue">CareConnect</h1>
          {isMobile && (
            <button onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.title}>
                <button
                  onClick={() => {
                    navigate(item.href);
                    if (isMobile) setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm
                    ${location.pathname === item.href 
                      ? "bg-care-blue-light text-care-blue font-medium" 
                      : "text-gray-700 hover:bg-gray-100"
                    }
                    transition-colors
                  `}
                >
                  <item.icon size={18} />
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-care-blue text-white flex items-center justify-center font-semibold">
              D
            </div>
            <div>
              <p className="text-sm font-medium">Dr. Smith</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>Log out</span>
          </Button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border flex items-center px-4 sticky top-0 bg-background z-10">
          {isMobile && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="mr-4"
            >
              <Menu size={20} />
            </button>
          )}
          <div className="flex-1"></div>
        </header>

        <div className="flex-1 p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
