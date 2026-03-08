import { motion } from "framer-motion";
import { Search, Heart, Megaphone, MessageSquare, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { getBrandSession, getBrandCampaigns, getPublicInfluencers, getSavedInfluencers, getConversationPartners } from "@/lib/adminStore";

const BrandDashboard = () => {
  const brand = getBrandSession();
  if (!brand) return null;

  const campaigns = getBrandCampaigns(brand.id);
  const influencers = getPublicInfluencers();
  const saved = getSavedInfluencers(brand.id);
  const conversations = getConversationPartners(brand.id);

  const stats = [
    { icon: Search, label: "Available Influencers", value: influencers.length, path: "/brand/discover", color: "text-primary" },
    { icon: Heart, label: "Saved Influencers", value: saved.length, path: "/brand/saved", color: "text-pink-500" },
    { icon: Megaphone, label: "Active Campaigns", value: campaigns.filter(c => c.status === "accepted").length, path: "/brand/campaigns", color: "text-emerald-500" },
    { icon: MessageSquare, label: "Conversations", value: conversations.length, path: "/brand/messages", color: "text-accent" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Welcome, {brand.brandName}</h1>
        <p className="text-muted-foreground mt-1">Here's an overview of your activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link to={s.path} className="glow-card rounded-xl p-6 block hover:scale-[1.02] transition-transform">
              <s.icon className={`w-8 h-8 ${s.color} mb-3`} />
              <div className="text-3xl font-display font-bold text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="glow-card rounded-xl p-6">
        <h2 className="font-display font-semibold text-lg mb-4">Recent Campaigns</h2>
        {campaigns.length === 0 ? (
          <p className="text-muted-foreground text-sm">No campaigns yet. <Link to="/brand/discover" className="text-primary hover:underline">Discover influencers</Link> to start.</p>
        ) : (
          <div className="space-y-3">
            {campaigns.slice(0, 5).map(c => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <div className="font-medium text-sm">{c.campaignName}</div>
                  <div className="text-xs text-muted-foreground">with {c.influencerName}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${c.status === "accepted" ? "bg-emerald-500/10 text-emerald-500" : c.status === "rejected" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandDashboard;
