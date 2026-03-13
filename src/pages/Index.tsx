import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AnimatedCounter from "@/components/AnimatedCounter";
import SectionHeading from "@/components/SectionHeading";
import InfluencerCard from "@/components/InfluencerCard";
import { testimonials, trustedBrands } from "@/data/siteData";
import { supabase } from "@/integrations/supabase/client";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

const Index = () => {
  const [featuredInfluencers, setFeaturedInfluencers] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase
        .from("influencer_applications")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(3);
      if (data) {
        setFeaturedInfluencers(data.map(inf => ({
          name: inf.name, niche: inf.category, followers: inf.followers || "0",
          engagement: inf.engagement || "0%", avatar: inf.photo || "", platform: "Instagram",
        })));
      }
    };
    fetchFeatured();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero-section min-h-screen flex items-center pt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 gradient-bg text-primary-foreground text-sm px-4 py-1.5 rounded-full mb-8">
              <Sparkles className="w-4 h-4" /> #1 Influencer Marketing Platform
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight mb-6 text-foreground">
              Connect Brands with{" "}
              <span className="gradient-text">Powerful Influencers</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              We help brands grow using data-driven influencer marketing campaigns.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-bg border-0 text-primary-foreground text-base px-8" asChild>
                <Link to="/for-brands">Hire Influencers <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 text-base px-8" asChild>
                <Link to="/join-influencer">Join as Influencer</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="dark-section section-padding">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <AnimatedCounter end={500} suffix="+" label="Brands Served" />
            <AnimatedCounter end={12000} suffix="+" label="Influencers Onboard" />
            <AnimatedCounter end={850} suffix="M+" label="Campaign Reach" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading title="How It Works" subtitle="Three simple steps to launch your influencer campaign" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Brands Submit Campaign", desc: "Share your campaign goals, budget, and target audience." },
              { step: "02", title: "Influencers Apply", desc: "Relevant influencers review and apply to your campaign." },
              { step: "03", title: "We Manage & Deliver", desc: "We handle execution and deliver measurable results." },
            ].map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="glow-card rounded-xl p-8 text-center">
                <div className="text-4xl font-display font-bold gradient-text mb-4">{item.step}</div>
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Influencers */}
      <section className="dark-section section-padding">
        <div className="container mx-auto">
          <SectionHeading title="Featured Influencers" subtitle="Top creators ready to amplify your brand" />
          {(() => {
            const approved = getPublicInfluencers().map(inf => ({
              name: inf.name, niche: inf.category, followers: inf.followers, engagement: inf.engagement, avatar: inf.photo || "", platform: inf.platform,
            }));
            return approved.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {approved.map((inf, i) => (
                    <InfluencerCard key={i} influencer={inf} index={i} />
                  ))}
                </div>
                <div className="text-center mt-10">
                  <Button variant="outline" className="border-primary/30 hover:bg-primary/10" asChild>
                    <Link to="/marketplace">View All Influencers <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground">No approved influencers available yet.</p>
            );
          })()}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading title="What Brands Say" subtitle="Trusted by leading companies worldwide" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="glow-card rounded-xl p-8">
                <p className="text-muted-foreground mb-6 italic">"{t.quote}"</p>
                <div>
                  <div className="font-display font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="dark-section section-padding">
        <div className="container mx-auto">
          <SectionHeading title="Trusted By" subtitle="Leading brands choose InfluenceHub" />
          <div className="flex flex-wrap justify-center gap-10 items-center">
            {trustedBrands.map((brand, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-2xl font-display font-bold text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="gradient-bg rounded-2xl p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to Scale Your Brand?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Join 500+ brands using InfluenceHub to reach millions of engaged audiences.
            </p>
            <Button size="lg" variant="secondary" className="text-base px-8" asChild>
              <Link to="/contact">Start Your Campaign <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="dark-section section-padding">
        <div className="container mx-auto">
          <SectionHeading title="Frequently Asked Questions" subtitle="Everything you need to know about InfluenceHub" />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {[
                { q: "What is InfluenceHub?", a: "InfluenceHub is a platform that connects brands with verified influencers to collaborate on marketing campaigns and grow their online presence." },
                { q: "Who is InfluenceHub for?", a: "InfluenceHub is designed for brands looking to promote their products and influencers who want to collaborate with brands and monetize their content." },
                { q: "What makes InfluenceHub different from other platforms?", a: "InfluenceHub focuses on verified influencers, simple collaboration tools, and transparent campaign management between brands and creators." },
                { q: "Can I find influencers on the platform?", a: "Yes. Brands can browse and connect with approved influencers based on category, platform, engagement rate, and audience reach." },
                { q: "How does the influencer approval process work?", a: "Influencers can apply to join the platform and their profiles are reviewed by the admin before being approved and displayed publicly." },
                { q: "What kind of analytics does InfluenceHub provide?", a: "The platform provides insights such as follower count, engagement rate, and platform performance to help brands choose the right influencer." },
                { q: "How do influencers join the platform?", a: "Influencers can submit their profile through the application form and wait for admin approval before appearing on the platform." },
                { q: "Is my data secure?", a: "Yes. InfluenceHub follows secure practices to ensure user data and campaign information remain protected." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="glow-card rounded-xl border-border px-6">
                  <AccordionTrigger className="text-left font-display font-semibold text-sm md:text-base hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
