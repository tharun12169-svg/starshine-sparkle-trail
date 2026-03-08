import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { teamMembers } from "@/data/siteData";
import { Heart, Globe, Lightbulb } from "lucide-react";

const values = [
  { icon: Heart, title: "Authenticity", desc: "We believe in real connections between brands and creators." },
  { icon: Globe, title: "Global Reach", desc: "Our network spans 50+ countries and every major platform." },
  { icon: Lightbulb, title: "Innovation", desc: "We leverage AI and data to deliver exceptional results." },
];

const About = () => (
  <div className="pt-24">
    <section className="hero-section section-padding">
      <div className="container mx-auto text-center max-w-3xl">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-bold mb-6">
          About <span className="gradient-text">InfluenceHub</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="text-lg text-muted-foreground">
          We're on a mission to make influencer marketing accessible, transparent, and results-driven for brands of every size.
        </motion.p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading title="Our Values" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {values.map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }} className="glow-card rounded-xl p-8 text-center">
              <v.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display font-semibold text-lg mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="dark-section section-padding">
      <div className="container mx-auto">
        <SectionHeading title="Meet the Team" subtitle="The people behind InfluenceHub" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }} className="glow-card rounded-xl p-8 text-center">
              <div className="w-20 h-20 rounded-full gradient-bg mx-auto mb-4 flex items-center justify-center text-primary-foreground font-bold text-2xl font-display">
                {m.name[0]}
              </div>
              <h3 className="font-display font-semibold">{m.name}</h3>
              <p className="text-primary text-sm mb-2">{m.role}</p>
              <p className="text-muted-foreground text-sm">{m.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
