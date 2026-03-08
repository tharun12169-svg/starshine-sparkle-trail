import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Sun, Moon, Save, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme, setAdminDefaultTheme, getAdminDefaultTheme } from "@/hooks/useTheme";
import { toast } from "sonner";

const AdminSettings = () => {
  const { theme, setTheme } = useTheme();
  const [defaultTheme, setDefaultTheme] = useState<"light" | "dark">(getAdminDefaultTheme());

  const handleSave = () => {
    setAdminDefaultTheme(defaultTheme);
    toast.success(`Default theme set to ${defaultTheme} mode`);
  };

  const handlePreview = () => {
    setTheme(defaultTheme);
    toast.info(`Previewing ${defaultTheme} mode`);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="glow-card rounded-xl p-6">
          <h3 className="font-display font-semibold text-lg mb-1 flex items-center gap-2 text-foreground">
            <Settings className="w-5 h-5 text-primary" /> Website Theme
          </h3>
          <p className="text-sm text-muted-foreground mb-6">Control the default theme visitors see when they first visit the website.</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setDefaultTheme("light")}
              className={`rounded-xl p-5 border-2 transition-all text-left ${
                defaultTheme === "light"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/30"
              }`}
            >
              <Sun className={`w-8 h-8 mb-3 ${defaultTheme === "light" ? "text-primary" : "text-muted-foreground"}`} />
              <div className="font-semibold text-foreground">Light Theme</div>
              <div className="text-xs text-muted-foreground mt-1">Clean, bright interface</div>
            </button>

            <button
              onClick={() => setDefaultTheme("dark")}
              className={`rounded-xl p-5 border-2 transition-all text-left ${
                defaultTheme === "dark"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/30"
              }`}
            >
              <Moon className={`w-8 h-8 mb-3 ${defaultTheme === "dark" ? "text-primary" : "text-muted-foreground"}`} />
              <div className="font-semibold text-foreground">Dark Theme</div>
              <div className="text-xs text-muted-foreground mt-1">Modern, dark interface</div>
            </button>
          </div>

          <div className="flex gap-3">
            <Button onClick={handlePreview} variant="outline" className="gap-2">
              <Eye className="w-4 h-4" /> Preview
            </Button>
            <Button onClick={handleSave} className="gradient-bg border-0 text-primary-foreground gap-2">
              <Save className="w-4 h-4" /> Save Default
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="glow-card rounded-xl p-6">
          <h3 className="font-display font-semibold text-lg mb-2 text-foreground">Current Theme</h3>
          <p className="text-sm text-muted-foreground">
            You are currently viewing: <span className="font-semibold text-foreground capitalize">{theme} Mode</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Users can override the default theme using the toggle in the navigation bar. Their preference is saved locally.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSettings;
