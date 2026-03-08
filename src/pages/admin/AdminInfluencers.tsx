import { useState } from "react";
import { motion } from "framer-motion";
import { getApprovedInfluencers, deleteInfluencer, updateInfluencer } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Trash2, Edit, ExternalLink, X, Check, ShieldCheck, Clock, ShieldX } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const statusColors = {
  pending: "bg-amber-500/20 text-amber-400",
  approved: "bg-emerald-500/20 text-emerald-400",
  rejected: "bg-red-500/20 text-red-400",
};

const AdminInfluencers = () => {
  const [influencers, setInfluencers] = useState(getApprovedInfluencers());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: "", category: "", platform: "", followers: "", engagement: "", profileLink: "" });
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const refresh = () => setInfluencers(getApprovedInfluencers());

  const handleDelete = (id: string) => {
    deleteInfluencer(id);
    refresh();
    toast.success("Influencer removed");
  };

  const handleStatusChange = (id: string, status: "pending" | "approved" | "rejected") => {
    updateInfluencer(id, { status });
    refresh();
    toast.success(`Status changed to ${status}`);
  };

  const startEdit = (inf: typeof influencers[0]) => {
    setEditingId(inf.id);
    setEditData({
      name: inf.name, category: inf.category, platform: inf.platform,
      followers: inf.followers, engagement: inf.engagement, profileLink: inf.profileLink || "",
    });
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateInfluencer(editingId, editData);
    setEditingId(null);
    refresh();
    toast.success("Influencer updated");
  };

  const filtered = filter === "all" ? influencers : influencers.filter(i => i.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {(["all", "pending", "approved", "rejected"] as const).map(f => (
            <Button key={f} size="sm" variant={filter === f ? "default" : "outline"}
              className={filter === f ? "gradient-bg border-0 text-primary-foreground" : "border-primary/30"}
              onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
        <Button size="sm" className="gradient-bg border-0 text-primary-foreground" asChild>
          <Link to="/admin/add-influencer">+ Add Influencer</Link>
        </Button>
      </div>

      <p className="text-muted-foreground text-sm">{filtered.length} influencer(s)</p>

      {filtered.length === 0 ? (
        <div className="glow-card rounded-xl p-12 text-center">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-semibold text-lg mb-2">No Influencers</h3>
          <p className="text-muted-foreground text-sm">No influencers match this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((inf, i) => (
            <motion.div key={inf.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glow-card rounded-xl p-5">

              {editingId === inf.id ? (
                <div className="space-y-3">
                  <div><Label className="text-xs">Name</Label><Input value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} className="h-8 text-sm" /></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label className="text-xs">Category</Label><Input value={editData.category} onChange={e => setEditData({ ...editData, category: e.target.value })} className="h-8 text-sm" /></div>
                    <div><Label className="text-xs">Platform</Label><Input value={editData.platform} onChange={e => setEditData({ ...editData, platform: e.target.value })} className="h-8 text-sm" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label className="text-xs">Followers</Label><Input value={editData.followers} onChange={e => setEditData({ ...editData, followers: e.target.value })} className="h-8 text-sm" /></div>
                    <div><Label className="text-xs">Engagement</Label><Input value={editData.engagement} onChange={e => setEditData({ ...editData, engagement: e.target.value })} className="h-8 text-sm" /></div>
                  </div>
                  <div><Label className="text-xs">Contact Link</Label><Input value={editData.profileLink} onChange={e => setEditData({ ...editData, profileLink: e.target.value })} className="h-8 text-sm" /></div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gradient-bg border-0 text-primary-foreground" onClick={saveEdit}><Check className="w-4 h-4 mr-1" /> Save</Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => setEditingId(null)}><X className="w-4 h-4 mr-1" /> Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0 overflow-hidden">
                      {inf.photo ? <img src={inf.photo} alt={inf.name} className="w-full h-full object-cover" /> : inf.name[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold truncate">{inf.name}</h4>
                      <p className="text-xs text-muted-foreground">{inf.email}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs gradient-bg text-primary-foreground px-2 py-0.5 rounded-full">{inf.category}</span>
                        <span className="text-xs text-muted-foreground">{inf.platform}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[inf.status || "pending"]}`}>
                          {inf.status || "pending"}
                        </span>
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

                  {/* Status controls */}
                  <div className="flex gap-1 mb-3">
                    <Button size="sm" variant={inf.status === "approved" ? "default" : "outline"}
                      className={inf.status === "approved" ? "bg-emerald-600 hover:bg-emerald-700 text-white border-0 flex-1" : "border-primary/30 flex-1"}
                      onClick={() => handleStatusChange(inf.id, "approved")}>
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Approve
                    </Button>
                    <Button size="sm" variant={inf.status === "pending" ? "default" : "outline"}
                      className={inf.status === "pending" ? "bg-amber-600 hover:bg-amber-700 text-white border-0 flex-1" : "border-primary/30 flex-1"}
                      onClick={() => handleStatusChange(inf.id, "pending")}>
                      <Clock className="w-3.5 h-3.5 mr-1" /> Pending
                    </Button>
                    <Button size="sm" variant={inf.status === "rejected" ? "default" : "outline"}
                      className={inf.status === "rejected" ? "bg-red-600 hover:bg-red-700 text-white border-0 flex-1" : "border-primary/30 flex-1"}
                      onClick={() => handleStatusChange(inf.id, "rejected")}>
                      <ShieldX className="w-3.5 h-3.5 mr-1" /> Reject
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => startEdit(inf)}>
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive flex-1" onClick={() => handleDelete(inf.id)}>
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInfluencers;
