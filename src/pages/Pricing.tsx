import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { pricingPlans } from "@/data/siteData";
import { Check } from "lucide-react";

const Pricing = () => (
  <div className="pt-24">
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading title="Simple, Transparent Pricing" subtitle="Choose the plan that fits your influencer marketing goals" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`rounded-2xl p-8 flex flex-col ${plan.popular ? "gradient-bg text-primary-foreground relative scale-105" : "glow-card"}`}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background text-foreground text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-display font-bold text-xl mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-display font-bold">{plan.price}</span>
                <span className={`text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.period}</span>
              </div>
              <p className={`text-sm mb-6 ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{plan.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.popular ? "secondary" : "outline"}
                className={plan.popular ? "" : "border-primary/30 hover:bg-primary/10"} asChild>
                <Link to="/contact">{plan.price === "Custom" ? "Contact Sales" : "Get Started"}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Pricing;
