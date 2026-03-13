import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp } from "lucide-react";

export interface Influencer {
  name: string;
  niche: string;
  followers: string;
  engagement: string;
  avatar: string;
  platform: string;
  reelPrice?: string;
}

interface InfluencerCardProps {
  influencer: Influencer;
  index?: number;
}

const InfluencerCard = ({ influencer, index = 0 }: InfluencerCardProps) => {
  const navigate = useNavigate();

  const handleContact = () => {
    window.open("https://wa.me/918431825949?text=Hello%20I%20would%20like%20to%20know%20more%20about%20InfluenceHub", "_blank");
  };

  return (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="glow-card rounded-xl p-6 flex flex-col items-center text-center"
  >
    <div className="w-20 h-20 rounded-full gradient-bg mb-4 flex items-center justify-center text-primary-foreground font-bold text-2xl font-display overflow-hidden">
      {influencer.avatar ? (
        <img src={influencer.avatar} alt={influencer.name} className="w-full h-full object-cover" />
      ) : (
        influencer.name.split(" ").map(w => w[0]).join("").slice(0, 2)
      )}
    </div>
    <h3 className="font-display font-semibold text-lg mb-1">{influencer.name}</h3>
    <span className="text-xs gradient-bg text-primary-foreground px-3 py-1 rounded-full mb-3">{influencer.niche}</span>
    <div className="flex gap-4 text-sm text-muted-foreground mb-4">
      <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{influencer.followers}</div>
      <div className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" />{influencer.engagement}</div>
    </div>
    <span className="text-xs text-muted-foreground mb-2">{influencer.platform}</span>
    {influencer.reelPrice && (
      <span className="text-xs font-semibold text-primary mb-4">₹{influencer.reelPrice} per Reel</span>
    )}
    {!influencer.reelPrice && <span className="mb-2" />}
    <Button size="sm" variant="outline" className="w-full border-primary/30 hover:bg-primary/10 hover:text-primary" onClick={handleContact}>
      Contact
    </Button>
  </motion.div>
  );
};

export default InfluencerCard;
