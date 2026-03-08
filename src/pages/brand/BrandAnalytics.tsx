import { BarChart3, Megaphone, Users, TrendingUp } from "lucide-react";
import { getBrandSession, getBrandCampaigns, getSavedInfluencers, getConversationPartners } from "@/lib/adminStore";

const BrandAnalytics = () => {
  const brand = getBrandSession();
  if (!brand) return null;

  const campaigns = getBrandCampaigns(brand.id);
  const saved = getSavedInfluencers(brand.id);
  const conversations = getConversationPartners(brand.id);

  const accepted = campaigns.filter(c => c.status === "accepted").length;
  const pending = campaigns.filter(c => c.status === "pending").length;
  const rejected = campaigns.filter(c => c.status === "rejected").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of your brand's activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glow-card rounded-xl p-6 text-center">
          <Megaphone className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-display font-bold">{campaigns.length}</div>
          <div className="text-sm text-muted-foreground">Total Campaigns</div>
        </div>
        <div className="glow-card rounded-xl p-6 text-center">
          <TrendingUp className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
          <div className="text-2xl font-display font-bold">{accepted}</div>
          <div className="text-sm text-muted-foreground">Accepted</div>
        </div>
        <div className="glow-card rounded-xl p-6 text-center">
          <Users className="w-8 h-8 text-accent mx-auto mb-2" />
          <div className="text-2xl font-display font-bold">{saved.length}</div>
          <div className="text-sm text-muted-foreground">Saved Influencers</div>
        </div>
        <div className="glow-card rounded-xl p-6 text-center">
          <BarChart3 className="w-8 h-8 text-pink-500 mx-auto mb-2" />
          <div className="text-2xl font-display font-bold">{conversations.length}</div>
          <div className="text-sm text-muted-foreground">Conversations</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glow-card rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4">Campaign Status Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Pending</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: campaigns.length ? `${(pending / campaigns.length) * 100}%` : "0%" }} />
                </div>
                <span className="text-sm font-medium w-8 text-right">{pending}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Accepted</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: campaigns.length ? `${(accepted / campaigns.length) * 100}%` : "0%" }} />
                </div>
                <span className="text-sm font-medium w-8 text-right">{accepted}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Rejected</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-destructive rounded-full" style={{ width: campaigns.length ? `${(rejected / campaigns.length) * 100}%` : "0%" }} />
                </div>
                <span className="text-sm font-medium w-8 text-right">{rejected}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glow-card rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4">Account Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Brand Name</span><span className="font-medium">{brand.brandName}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Industry</span><span className="font-medium">{brand.industry}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Website</span><span className="font-medium">{brand.website || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Member Since</span><span className="font-medium">{new Date(brand.date).toLocaleDateString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandAnalytics;
