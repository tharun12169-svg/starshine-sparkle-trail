import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhotoUpload from "@/components/PhotoUpload";
import { Users, Trash2, Edit, ExternalLink, X, Check, ShieldCheck, Clock, ShieldX, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Influencer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  instagram: string;
  category: string;
  followers: string | null;
  engagement: string | null;
  bio: string | null;
  photo: string | null;
  status: string;
  created_at: string;
  reel_promotion_price: string | null;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/20 text-amber-400",
  approved: "bg-emerald-500/20 text-emerald-400",
  rejected: "bg-red-500/20 text-red-400",
};

const AdminInfluencers = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: "", category: "", followers: "", engagement: "", instagram: "", photo: "", phone: "", email: "", reel_promotion_price: "" });
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const fetchInfluencers = useCallback(async () => {
    const { data, error } = await supabase
      .from("influencer_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching influencers:", error);
      return;
    }
    setInfluencers(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchInfluencers();
    const channel = supabase
      .channel("admin_influencers_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "influencer_applications" }, () => {
        fetchInfluencers();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchInfluencers]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("influencer_applications").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete influencer");
      return;
    }
    toast.success("Influencer removed");
    fetchInfluencers();
  };

  const handleStatusChange = async (id: string, status: string) => {
    const { error } = await supabase.from("influencer_applications").update({ status }).eq("id", id);
    if (error) {
      toast.error("Failed to update status");
      return;
    }
    toast.success(`Status changed to ${status}`);
    fetchInfluencers();
  };

  const startEdit = (inf: Influencer) => {
    setEditingId(inf.id);
    setEditData({
      name: inf.name, category: inf.category,
      followers: inf.followers || "", engagement: inf.engagement || "",
      instagram: inf.instagram || "", photo: inf.photo || "",
      phone: inf.phone || "", email: inf.email || "",
      reel_promotion_price: inf.reel_promotion_price || "",
    });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const { error } = await supabase.from("influencer_applications").update({
      name: editData.name, category: editData.category,
      followers: editData.followers, engagement: editData.engagement,
      instagram: editData.instagram, photo: editData.photo,
      phone: editData.phone, email: editData.email,
      reel_promotion_price: editData.reel_promotion_price,
    }).eq("id", editingId);
    if (error) {
      toast.error("Failed to update influencer");
      return;
    }
    setEditingId(null);
    toast.success("Influencer updated");
    fetchInfluencers();
  };

  const filtered = filter === "all" ? influencers : influencers.filter(i => i.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
                  <PhotoUpload
                    currentPhoto={editData.photo}
                    name={editData.name}
                    size="sm"
                    onPhotoChange={(url) => setEditData({ ...editData, photo: url })}
                    onPhotoRemove={() => setEditData({ ...editData, photo: "" })}
                  />
                  <div><Label className="text-xs">Name</Label><Input value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} className="h-8 text-sm" /></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label className="text-xs">Category</Label><Input value={editData.category} onChange={e => setEditData({ ...editData, category: e.target.value })} className="h-8 text-sm" /></div>
                    <div><Label className="text-xs">Instagram</Label><Input value={editData.instagram} onChange={e => setEditData({ ...editData, instagram: e.target.value })} className="h-8 text-sm" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label className="text-xs">Followers</Label><Input value={editData.followers} onChange={e => setEditData({ ...editData, followers: e.target.value })} className="h-8 text-sm" /></div>
                    <div><Label className="text-xs">Engagement</Label><Input value={editData.engagement} onChange={e => setEditData({ ...editData, engagement: e.target.value })} className="h-8 text-sm" /></div>
                  </div>
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
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[inf.status] || statusColors.pending}`}>
                          {inf.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div><span className="text-muted-foreground">Followers:</span> {inf.followers || "—"}</div>
                    <div><span className="text-muted-foreground">Engagement:</span> {inf.engagement || "—"}</div>
                  </div>

                  {inf.instagram && (
                    <a href={`https://instagram.com/${inf.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-primary flex items-center gap-1 mb-3 hover:underline">
                      <ExternalLink className="w-3 h-3" /> {inf.instagram}
                    </a>
                  )}

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
