import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SectionHeading from "@/components/SectionHeading";
import PhotoUpload from "@/components/PhotoUpload";
import { addApplication } from "@/lib/adminStore";
import { toast } from "sonner";
import { CheckCircle, DollarSign, Handshake, Megaphone, Star } from "lucide-react";

const categories = ["Fashion", "Tech", "Fitness", "Gaming", "Beauty", "Travel", "Food"];

const benefits = [
  { icon: DollarSign, title: "Earn More", desc: "Get paid for brand collaborations with transparent pricing." },
  { icon: Handshake, title: "Brand Deals", desc: "Access campaigns from top brands matched to your niche." },
  { icon: Megaphone, title: "Grow Your Reach", desc: "Cross-promote with other creators and grow your audience." },
  { icon: Star, title: "Premium Support", desc: "Dedicated team to help you succeed and maximize earnings." },
];

const JoinInfluencer = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", instagram: "",
    category: "", followers: "", engagement: "", bio: "", photo: "", password: "",
  });

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.category) {
      toast.error("Please fill in all required fields.");
      return;
    }
    addApplication(form);
    setSubmitted(true);
    toast.success("Application submitted successfully!");
  };

  if (submitted) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="glow-card rounded-2xl p-10 text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">Application Submitted!</h2>
          <p className="text-muted-foreground">Thank you for applying. Our team will review your application and get back to you soon.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <section className="hero-section section-padding">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6">
            Monetize Your <span className="gradient-text">Influence</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground">
            Join 12,000+ creators earning through brand collaborations on InfluenceHub.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} className="glow-card rounded-xl p-8 text-center">
                <b.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          <SectionHeading title="Apply to Join" subtitle="Submit your application and our team will review it within 48 hours" />

          <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            onSubmit={handleSubmit} className="glow-card rounded-xl p-8 max-w-2xl mx-auto space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Full Name *</Label>
                <Input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Your full name" className="bg-surface-card border-border" />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Email *</Label>
                <Input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="your@email.com" className="bg-surface-card border-border" />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Phone Number</Label>
                <Input value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+1 (555) 123-4567" className="bg-surface-card border-border" />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Category / Niche *</Label>
                <Select value={form.category} onValueChange={v => update("category", v)}>
                  <SelectTrigger className="bg-surface-card border-border"><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Followers Count</Label>
                <Input value={form.followers} onChange={e => update("followers", e.target.value)} placeholder="e.g. 150K" className="bg-surface-card border-border" />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Engagement Rate</Label>
                <Input value={form.engagement} onChange={e => update("engagement", e.target.value)} placeholder="e.g. 5.2%" className="bg-surface-card border-border" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">YouTube Channel Link (Optional)</Label>
              <Input value={form.youtube} onChange={e => update("youtube", e.target.value)} placeholder="https://youtube.com/@yourchannel" className="bg-surface-card border-border" />
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Password *</Label>
              <Input type="password" value={form.password} onChange={e => update("password", e.target.value)} placeholder="Create a password for your account" className="bg-surface-card border-border" required />
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Profile Photo (Optional)</Label>
              <PhotoUpload
                currentPhoto={form.photo}
                name={form.name}
                onPhotoChange={(url) => update("photo", url)}
                onPhotoRemove={() => update("photo", "")}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Short Bio *</Label>
              <Textarea value={form.bio} onChange={e => update("bio", e.target.value)} placeholder="Tell us about yourself, your content, and your audience..." rows={4} className="bg-surface-card border-border" />
            </div>

            <Button type="submit" className="w-full gradient-bg border-0 text-primary-foreground h-11">
              Submit Application
            </Button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default JoinInfluencer;
