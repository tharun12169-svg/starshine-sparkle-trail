import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Mail, Lock, Globe } from "lucide-react";
import { registerBrand } from "@/lib/adminStore";
import { toast } from "sonner";

const industries = ["E-commerce", "SaaS", "Fashion", "Food & Beverage", "Health & Wellness", "Technology", "Education", "Finance", "Entertainment", "Other"];

const BrandRegister = () => {
  const [form, setForm] = useState({ brandName: "", email: "", password: "", website: "", industry: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.brandName.trim() || !form.email.trim() || !form.password.trim() || !form.industry) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const brand = registerBrand(form);
      if (brand) {
        localStorage.setItem("brand_session", JSON.stringify(brand));
        toast.success("Welcome to InfluenceHub!");
        navigate("/brand/dashboard");
      } else {
        toast.error("An account with this email already exists.");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center hero-section px-4 py-24">
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="glow-card rounded-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl gradient-bg mx-auto mb-4 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-2 text-foreground">Create Brand Account</h1>
            <p className="text-sm text-muted-foreground">Start connecting with top influencers</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm text-foreground">Brand Name *</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input value={form.brandName} onChange={e => update("brandName", e.target.value)} placeholder="Your brand name" className="pl-10 bg-background border-border" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-foreground">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="brand@email.com" className="pl-10 bg-background border-border" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-foreground">Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="password" value={form.password} onChange={e => update("password", e.target.value)} placeholder="••••••••" className="pl-10 bg-background border-border" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-foreground">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input value={form.website} onChange={e => update("website", e.target.value)} placeholder="https://yourbrand.com" className="pl-10 bg-background border-border" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-foreground">Industry *</Label>
              <Select value={form.industry} onValueChange={v => update("industry", v)}>
                <SelectTrigger className="bg-background border-border"><SelectValue placeholder="Select industry" /></SelectTrigger>
                <SelectContent>{industries.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={loading} className="w-full gradient-bg border-0 text-primary-foreground h-11">
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/brand-login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BrandRegister;
