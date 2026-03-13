import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import InfluencerCard from "@/components/InfluencerCard";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const categories = ["All", "Fashion", "Tech", "Fitness", "Gaming", "Beauty", "Travel", "Food"];

const Marketplace = () => {
  const [category, setCategory] = useState("All");
  const [influencers, setInfluencers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("influencer_applications")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      if (data) {
        setInfluencers(data.map(inf => ({
          name: inf.name,
          niche: inf.category,
          followers: inf.followers || "0",
          engagement: inf.engagement || "0%",
          avatar: inf.photo || "",
          platform: "Instagram",
        })));
      }
      setLoading(false);
    };
    fetch();

    const channel = supabase
      .channel("marketplace_updates")
      .on("postgres_changes", { event: "*", schema: "public", table: "influencer_applications" }, () => {
        fetch();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const filtered = useMemo(() => {
    if (category === "All") return influencers;
    return influencers.filter(inf => inf.niche === category);
  }, [category, influencers]);

  if (loading) {
    return (
      <div className="pt-24 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading title="Influencer Marketplace" subtitle="Discover and connect with top creators across all platforms" />

          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <span className="text-sm text-muted-foreground mr-2 self-center">Category:</span>
            {categories.map((c) => (
              <Button key={c} size="sm" variant={category === c ? "default" : "outline"}
                className={category === c ? "gradient-bg border-0 text-primary-foreground" : "border-primary/30"}
                onClick={() => setCategory(c)}>
                {c}
              </Button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((inf, i) => (
              <InfluencerCard key={inf.name + i} influencer={inf} index={i} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground mt-12">No approved influencers available yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
