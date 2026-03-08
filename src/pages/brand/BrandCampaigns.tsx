import { getBrandSession, getBrandCampaigns } from "@/lib/adminStore";
import { Megaphone } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-primary/10 text-primary",
  accepted: "bg-emerald-500/10 text-emerald-500",
  rejected: "bg-destructive/10 text-destructive",
};

const BrandCampaigns = () => {
  const brand = getBrandSession();
  if (!brand) return null;
  const campaigns = getBrandCampaigns(brand.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">My Campaigns</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your campaign requests and their status</p>
      </div>

      {campaigns.length === 0 ? (
        <div className="glow-card rounded-xl p-12 text-center">
          <Megaphone className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No campaigns yet. Start by discovering influencers.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {campaigns.map(c => (
            <div key={c.id} className="glow-card rounded-xl p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-display font-semibold">{c.campaignName}</h3>
                  <p className="text-sm text-muted-foreground">Influencer: {c.influencerName}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[c.status]}`}>
                  {c.status}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
                <div><span className="text-muted-foreground">Budget:</span> <span className="font-medium">{c.budget || "N/A"}</span></div>
                <div><span className="text-muted-foreground">Deadline:</span> <span className="font-medium">{c.deadline || "N/A"}</span></div>
                <div><span className="text-muted-foreground">Deliverables:</span> <span className="font-medium">{c.deliverables || "N/A"}</span></div>
                <div><span className="text-muted-foreground">Sent:</span> <span className="font-medium">{new Date(c.date).toLocaleDateString()}</span></div>
              </div>
              {c.description && <p className="text-sm text-muted-foreground mt-3">{c.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandCampaigns;
