import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Megaphone, MessageSquare, LogOut, Menu, X, ChevronRight, Settings
} from "lucide-react";
import { getInfluencerSession, influencerLogout } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/influencer/dashboard" },
  { icon: Megaphone, label: "Campaign Requests", path: "/influencer/campaigns" },
  { icon: MessageSquare, label: "Messages", path: "/influencer/messages" },
  { icon: Settings, label: "Settings", path: "/influencer/settings" },
];

const InfluencerDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const influencer = getInfluencerSession();

  useEffect(() => {
    if (!influencer) navigate("/influencer-login");
  }, [influencer, navigate]);

  const handleLogout = () => {
    influencerLogout();
    navigate("/influencer-login");
  };

  if (!influencer) return null;

  return (
    <div className="min-h-screen flex bg-background">
      <aside className={`hidden lg:flex flex-col ${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300 bg-sidebar border-r border-sidebar-border`}>
        <div className="flex items-center gap-3 h-16 px-4 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg gradient-bg shrink-0" />
          {sidebarOpen && <span className="font-display font-bold text-lg text-sidebar-foreground truncate">{influencer.name}</span>}
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {menuItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "gradient-bg text-primary-foreground" : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"}`}>
                <item.icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:block text-muted-foreground hover:text-foreground">
              <ChevronRight className={`w-5 h-5 transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
            </button>
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-muted-foreground"><Menu className="w-6 h-6" /></button>
            <h2 className="font-display font-semibold text-lg text-foreground">
              {menuItems.find(i => i.path === location.pathname)?.label || "Influencer Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild><Link to="/">← Back to Site</Link></Button>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-auto"><Outlet /></main>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-sidebar border-r border-sidebar-border z-50 flex flex-col lg:hidden">
              <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg gradient-bg" />
                  <span className="font-display font-bold text-sidebar-foreground">{influencer.name}</span>
                </div>
                <button onClick={() => setMobileOpen(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
              </div>
              <nav className="flex-1 py-4 px-3 space-y-1">
                {menuItems.map(item => {
                  const active = location.pathname === item.path;
                  return (
                    <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "gradient-bg text-primary-foreground" : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"}`}>
                      <item.icon className="w-5 h-5" /><span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="p-3 border-t border-sidebar-border">
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive">
                  <LogOut className="w-5 h-5" /><span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfluencerDashboardLayout;
