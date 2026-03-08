import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import InfluencerCard from "@/components/InfluencerCard";
import { influencers } from "@/data/siteData";
import { Button } from "@/components/ui/button";

const platforms = ["All", "Instagram", "YouTube"];
const categories = ["All", "Fashion", "Tech", "Fitness", "Gaming", "Beauty", "Travel", "Food"];

const Marketplace = () => {
  const [platform, setPlatform] = useState("All");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return influencers.filter((inf) => {
      if (platform !== "All" && inf.platform !== platform) return false;
      if (category !== "All" && inf.niche !== category) return false;
      return true;
    });
  }, [platform, category]);

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading title="Influencer Marketplace" subtitle="Discover and connect with top creators across all platforms" />

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-muted-foreground mr-2 self-center">Platform:</span>
              {platforms.map((p) => (
                <Button key={p} size="sm" variant={platform === p ? "default" : "outline"}
                  className={platform === p ? "gradient-bg border-0 text-primary-foreground" : "border-primary/30"}
                  onClick={() => setPlatform(p)}>
                  {p}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-muted-foreground mr-2 self-center">Category:</span>
              {categories.map((c) => (
                <Button key={c} size="sm" variant={category === c ? "default" : "outline"}
                  className={category === c ? "gradient-bg border-0 text-primary-foreground" : "border-primary/30"}
                  onClick={() => setCategory(c)}>
                  {c}
                </Button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((inf, i) => (
              <InfluencerCard key={inf.name} influencer={inf} index={i} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground mt-12">No influencers match your filters. Try adjusting your criteria.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
