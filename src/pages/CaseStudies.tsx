import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { caseStudies } from "@/data/siteData";
import { TrendingUp, Eye, BarChart3 } from "lucide-react";

const CaseStudies = () => (
  <div className="pt-24">
    <section className="hero-section section-padding">
      <div className="container mx-auto text-center max-w-3xl">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-bold mb-6">
          Our <span className="gradient-text">Success Stories</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="text-lg text-muted-foreground">
          Real results from real campaigns. See how we've helped brands achieve extraordinary ROI.
        </motion.p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto">
        <div className="space-y-12">
          {caseStudies.map((cs, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }} className="glow-card rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <span className="text-xs gradient-bg text-primary-foreground px-3 py-1 rounded-full">{cs.category}</span>
                  <h3 className="font-display font-bold text-2xl mt-4 mb-2">{cs.title}</h3>
                  <p className="text-muted-foreground mb-4">{cs.description}</p>
                  <p className="text-sm text-muted-foreground">Brand: <span className="font-semibold text-foreground">{cs.brand}</span></p>
                </div>
                <div className="grid grid-cols-3 gap-6 md:w-80 shrink-0">
                  <div className="text-center">
                    <Eye className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-2xl font-display font-bold gradient-text">{cs.reach}</div>
                    <div className="text-xs text-muted-foreground">Reach</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-2xl font-display font-bold gradient-text">{cs.roi}</div>
                    <div className="text-xs text-muted-foreground">ROI</div>
                  </div>
                  <div className="text-center">
                    <BarChart3 className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-2xl font-display font-bold gradient-text">{cs.engagement}</div>
                    <div className="text-xs text-muted-foreground">Engagement</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default CaseStudies;
