import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, BarChart3, Target, Users, Shield, Zap, TrendingUp } from "lucide-react";

const benefits = [
  { icon: Target, title: "Targeted Reach", desc: "Access influencers perfectly aligned with your niche and audience." },
  { icon: BarChart3, title: "Data-Driven", desc: "Make decisions backed by real-time analytics and performance data." },
  { icon: Users, title: "Vetted Creators", desc: "Every influencer on our platform is verified for authentic engagement." },
  { icon: Shield, title: "Brand Safety", desc: "Content review and brand safety measures protect your reputation." },
  { icon: Zap, title: "Fast Execution", desc: "Launch campaigns in days, not weeks with our streamlined workflow." },
  { icon: TrendingUp, title: "Measurable ROI", desc: "Track every dollar spent with detailed attribution and reporting." },
];

const ForBrands = () => (
  <div className="pt-24">
    <section className="hero-section section-padding">
      <div className="container mx-auto text-center max-w-3xl">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-bold mb-6">
          Supercharge Your Brand with <span className="gradient-text">Influencer Marketing</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="text-lg text-muted-foreground mb-8">
          Reach millions of engaged audiences through authentic creator partnerships.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Button size="lg" className="gradient-bg border-0 text-primary-foreground px-8" asChild>
            <Link to="/contact">Start Campaign <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </motion.div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading title="Why Brands Choose Us" subtitle="Everything you need to run successful influencer campaigns" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }} className="glow-card rounded-xl p-8">
              <b.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display font-semibold text-lg mb-2">{b.title}</h3>
              <p className="text-muted-foreground text-sm">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="dark-section section-padding">
      <div className="container mx-auto text-center max-w-2xl">
        <SectionHeading title="Campaign Management Services" subtitle="End-to-end campaign management from strategy to reporting" />
        <div className="space-y-4 text-left">
          {["Campaign strategy & planning", "Influencer discovery & vetting", "Content creation & approval", "Campaign execution & monitoring", "Performance reporting & analytics"].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }} className="flex items-center gap-3 glow-card rounded-lg p-4">
              <div className="w-2 h-2 rounded-full gradient-bg shrink-0" />
              <span>{s}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default ForBrands;
