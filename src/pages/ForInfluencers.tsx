import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "@/components/SectionHeading";
import { DollarSign, Handshake, Megaphone, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const benefits = [
  { icon: DollarSign, title: "Earn More", desc: "Get paid for brand collaborations with transparent pricing." },
  { icon: Handshake, title: "Brand Deals", desc: "Access campaigns from top brands matched to your niche." },
  { icon: Megaphone, title: "Grow Your Reach", desc: "Cross-promote with other creators and grow your audience." },
  { icon: Star, title: "Premium Support", desc: "Dedicated team to help you succeed and maximize earnings." },
];

const ForInfluencers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in required fields.");
      return;
    }
    toast.success("Application submitted! We'll be in touch soon.");
    setName(""); setEmail(""); setPlatform(""); setBio("");
  };

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

          <SectionHeading title="Join InfluenceHub" subtitle="Apply to become a verified influencer on our platform" />
          <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            onSubmit={handleSubmit} className="glow-card rounded-xl p-8 max-w-xl mx-auto space-y-4">
            <Input placeholder="Full Name *" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Email *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Primary Platform (e.g., Instagram)" value={platform} onChange={(e) => setPlatform(e.target.value)} />
            <Textarea placeholder="Tell us about yourself and your content..." value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
            <Button type="submit" className="w-full gradient-bg border-0 text-primary-foreground">Submit Application</Button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default ForInfluencers;
