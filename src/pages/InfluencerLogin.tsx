import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock } from "lucide-react";
import { influencerLogin } from "@/lib/adminStore";
import { toast } from "sonner";

const InfluencerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (influencerLogin(email, password)) {
        toast.success("Welcome back!");
        navigate("/influencer/dashboard");
      } else {
        toast.error("Invalid credentials or account not yet approved.");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center hero-section px-4">
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="glow-card rounded-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl gradient-bg mx-auto mb-4 flex items-center justify-center">
              <User className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-2 text-foreground">Influencer Login</h1>
            <p className="text-sm text-muted-foreground">Sign in to your influencer dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="pl-10 bg-background border-border" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="pl-10 bg-background border-border" required />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full gradient-bg border-0 text-primary-foreground h-11">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Want to join? <Link to="/join-influencer" className="text-primary hover:underline">Apply as Influencer</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default InfluencerLogin;
