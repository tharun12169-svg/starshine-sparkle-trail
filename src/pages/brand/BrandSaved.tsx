import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Users, TrendingUp } from "lucide-react";
import { getBrandSession, getSavedInfluencers, getApprovedInfluencers, unsaveInfluencer } from "@/lib/adminStore";
import { toast } from "sonner";

const BrandSaved = () => {
  const brand = getBrandSession();
  const [, forceUpdate] = useState(0);

  if (!brand) return null;

  const savedIds = getSavedInfluencers(brand.id).map(s => s.influencerId);
  const allInfluencers = getApprovedInfluencers();
  const saved = allInfluencers.filter(i => savedIds.includes(i.id));

  const handleRemove = (infId: string) => {
    unsaveInfluencer(brand.id, infId);
    toast.info("Removed from saved");
    forceUpdate(n => n + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Saved Influencers</h1>
        <p className="text-muted-foreground text-sm mt-1">Your shortlisted creators</p>
      </div>

      {saved.length === 0 ? (
        <div className="glow-card rounded-xl p-12 text-center">
          <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No saved influencers yet. Browse the <a href="/brand/discover" className="text-primary hover:underline">Discover</a> page to save creators.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {saved.map((inf, i) => (
            <motion.div key={inf.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glow-card rounded-xl p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold font-display overflow-hidden">
                    {inf.photo ? <img src={inf.photo} alt={inf.name} className="w-full h-full object-cover" /> : inf.name[0]}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">{inf.name}</h3>
                    <span className="text-xs text-muted-foreground">{inf.platform} · {inf.category}</span>
                  </div>
                </div>
                <button onClick={() => handleRemove(inf.id)} className="text-primary hover:text-destructive transition-colors">
                  <Heart className="w-5 h-5 fill-primary" />
                </button>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{inf.followers}</div>
                <div className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" />{inf.engagement}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandSaved;
