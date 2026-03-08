import { useState } from "react";
import { motion } from "framer-motion";
import { getApprovedInfluencers, deleteInfluencer } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { Users, Trash2, Edit, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AdminInfluencers = () => {
  const [influencers, setInfluencers] = useState(getApprovedInfluencers());

  const handleDelete = (id: string) => {
    deleteInfluencer(id);
    setInfluencers(getApprovedInfluencers());
    toast.success("Influencer removed");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground text-sm">{influencers.length} influencer(s)</p>
        <Button size="sm" className="gradient-bg border-0 text-primary-foreground" asChild>
          <Link to="/admin/add-influencer">+ Add Influencer</Link>
        </Button>
      </div>

      {influencers.length === 0 ? (
        <div className="glow-card rounded-xl p-12 text-center">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-semibold text-lg mb-2">No Influencers Yet</h3>
          <p className="text-muted-foreground text-sm">Approve applications or add influencers manually.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {influencers.map((inf, i) => (
            <motion.div key={inf.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glow-card rounded-xl p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0 overflow-hidden">
                  {inf.photo ? <img src={inf.photo} alt={inf.name} className="w-full h-full object-cover" /> : inf.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold truncate">{inf.name}</h4>
                  <p className="text-xs text-muted-foreground">{inf.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs gradient-bg text-primary-foreground px-2 py-0.5 rounded-full">{inf.category}</span>
                    <span className="text-xs text-muted-foreground">{inf.platform}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div><span className="text-muted-foreground">Followers:</span> {inf.followers}</div>
                <div><span className="text-muted-foreground">Engagement:</span> {inf.engagement}</div>
              </div>

              {inf.profileLink && (
                <a href={inf.profileLink} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-primary flex items-center gap-1 mb-3 hover:underline">
                  <ExternalLink className="w-3 h-3" /> Profile Link
                </a>
              )}

              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive flex-1" onClick={() => handleDelete(inf.id)}>
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInfluencers;
