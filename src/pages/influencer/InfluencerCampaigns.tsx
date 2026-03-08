import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Megaphone, Check, X } from "lucide-react";
import { getInfluencerSession, getInfluencerCampaigns, updateCampaignStatus } from "@/lib/adminStore";
import { toast } from "sonner";

const InfluencerCampaigns = () => {
  const inf = getInfluencerSession();
  const [, refresh] = useState(0);

  if (!inf) return null;
  const campaigns = getInfluencerCampaigns(inf.id);

  const handleAction = (id: string, status: "accepted" | "rejected") => {
    updateCampaignStatus(id, status);
    toast.success(`Campaign ${status}`);
    refresh(n => n + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Campaign Requests</h1>
        <p className="text-muted-foreground text-sm mt-1">Review and manage campaign requests from brands</p>
      </div>

      {campaigns.length === 0 ? (
        <div className="glow-card rounded-xl p-12 text-center">
          <Megaphone className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No campaign requests yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {campaigns.map(c => (
            <div key={c.id} className="glow-card rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display font-semibold">{c.campaignName}</h3>
                  <p className="text-sm text-muted-foreground">From: {c.brandName}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${c.status === "accepted" ? "bg-emerald-500/10 text-emerald-500" : c.status === "rejected" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
                  {c.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                <div><span className="text-muted-foreground">Budget:</span> <span className="font-medium">{c.budget || "N/A"}</span></div>
                <div><span className="text-muted-foreground">Deadline:</span> <span className="font-medium">{c.deadline || "N/A"}</span></div>
                <div><span className="text-muted-foreground">Deliverables:</span> <span className="font-medium">{c.deliverables || "N/A"}</span></div>
                <div><span className="text-muted-foreground">Received:</span> <span className="font-medium">{new Date(c.date).toLocaleDateString()}</span></div>
              </div>

              {c.description && <p className="text-sm text-muted-foreground mb-3">{c.description}</p>}

              {c.status === "pending" && (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAction(c.id, "accepted")} className="bg-emerald-500 hover:bg-emerald-600 text-primary-foreground">
                    <Check className="w-4 h-4 mr-1" /> Accept
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleAction(c.id, "rejected")} className="border-destructive/30 text-destructive hover:bg-destructive/10">
                    <X className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InfluencerCampaigns;
