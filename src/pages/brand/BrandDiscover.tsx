import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, HeartOff, Users, TrendingUp, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  getPublicInfluencers, getBrandSession,
  isInfluencerSaved, saveInfluencer, unsaveInfluencer,
  addCampaign, addChatMessage
} from "@/lib/adminStore";
import { toast } from "sonner";

const platforms = ["All", "Instagram", "YouTube"];
const categories = ["All", "Fashion", "Tech", "Fitness", "Gaming", "Beauty", "Travel", "Food"];

const BrandDiscover = () => {
  const brand = getBrandSession();
  const [platform, setPlatform] = useState("All");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [, forceUpdate] = useState(0);
  const refresh = () => forceUpdate(n => n + 1);

  const influencers = getPublicInfluencers();

  const filtered = useMemo(() => {
    return influencers.filter(inf => {
      if (platform !== "All" && inf.platform !== platform) return false;
      if (category !== "All" && inf.category !== category) return false;
      if (search && !inf.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [platform, category, search, influencers]);

  const toggleSave = (infId: string) => {
    if (!brand) return;
    if (isInfluencerSaved(brand.id, infId)) {
      unsaveInfluencer(brand.id, infId);
      toast.info("Removed from saved");
    } else {
      saveInfluencer(brand.id, infId);
      toast.success("Saved influencer");
    }
    refresh();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Discover Influencers</h1>
        <p className="text-muted-foreground text-sm mt-1">Find the perfect creators for your brand</p>
      </div>

      <div className="flex flex-col gap-4">
        <Input placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-sm bg-background border-border" />
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center mr-1">Platform:</span>
          {platforms.map(p => (
            <Button key={p} size="sm" variant={platform === p ? "default" : "outline"}
              className={platform === p ? "gradient-bg border-0 text-primary-foreground" : "border-primary/30"}
              onClick={() => setPlatform(p)}>{p}</Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center mr-1">Category:</span>
          {categories.map(c => (
            <Button key={c} size="sm" variant={category === c ? "default" : "outline"}
              className={category === c ? "gradient-bg border-0 text-primary-foreground" : "border-primary/30"}
              onClick={() => setCategory(c)}>{c}</Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((inf, i) => (
          <motion.div key={inf.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glow-card rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold font-display overflow-hidden">
                  {inf.photo ? <img src={inf.photo} alt={inf.name} className="w-full h-full object-cover" /> : inf.name[0]}
                </div>
                <div>
                  <h3 className="font-display font-semibold">{inf.name}</h3>
                  <span className="text-xs text-muted-foreground">{inf.platform} · {inf.category}</span>
                </div>
              </div>
              {brand && (
                <button onClick={() => toggleSave(inf.id)} className="text-muted-foreground hover:text-primary transition-colors">
                  {isInfluencerSaved(brand.id, inf.id) ? <Heart className="w-5 h-5 fill-primary text-primary" /> : <Heart className="w-5 h-5" />}
                </button>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{inf.bio}</p>

            <div className="flex gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{inf.followers}</div>
              <div className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" />{inf.engagement}</div>
            </div>

            <div className="flex gap-2">
              <CampaignDialog brandId={brand?.id || ""} brandName={brand?.brandName || ""} influencer={inf} onSend={refresh} />
              <MessageDialog brandId={brand?.id || ""} influencerId={inf.id} influencerName={inf.name} />
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No influencers found matching your filters.</p>}
    </div>
  );
};

const CampaignDialog = ({ brandId, brandName, influencer, onSend }: { brandId: string; brandName: string; influencer: any; onSend: () => void }) => {
  const [form, setForm] = useState({ campaignName: "", budget: "", deliverables: "", deadline: "", description: "" });
  const [open, setOpen] = useState(false);
  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.campaignName.trim()) { toast.error("Campaign name is required"); return; }
    addCampaign({
      brandId, brandName,
      influencerId: influencer.id,
      influencerName: influencer.name,
      ...form
    });
    toast.success("Campaign request sent!");
    setOpen(false);
    setForm({ campaignName: "", budget: "", deliverables: "", deadline: "", description: "" });
    onSend();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gradient-bg border-0 text-primary-foreground flex-1">
          <Send className="w-3.5 h-3.5 mr-1" /> Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Start Campaign with {influencer.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Campaign Name *</Label>
            <Input value={form.campaignName} onChange={e => update("campaignName", e.target.value)} placeholder="Summer Collection Launch" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Budget</Label>
              <Input value={form.budget} onChange={e => update("budget", e.target.value)} placeholder="$5,000" />
            </div>
            <div className="space-y-2">
              <Label>Deadline</Label>
              <Input type="date" value={form.deadline} onChange={e => update("deadline", e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Deliverables</Label>
            <Input value={form.deliverables} onChange={e => update("deliverables", e.target.value)} placeholder="3 posts, 5 stories" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={e => update("description", e.target.value)} placeholder="Campaign details..." rows={3} />
          </div>
          <Button type="submit" className="w-full gradient-bg border-0 text-primary-foreground">Send Request</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const MessageDialog = ({ brandId, influencerId, influencerName }: { brandId: string; influencerId: string; influencerName: string }) => {
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);

  const send = () => {
    if (!msg.trim()) return;
    addChatMessage({ senderId: brandId, senderRole: "brand", receiverId: influencerId, message: msg });
    toast.success(`Message sent to ${influencerName}`);
    setMsg("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="border-primary/30 flex-1">Message</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader><DialogTitle className="font-display">Message {influencerName}</DialogTitle></DialogHeader>
        <Textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Write your message..." rows={3} />
        <Button onClick={send} className="w-full gradient-bg border-0 text-primary-foreground">Send</Button>
      </DialogContent>
    </Dialog>
  );
};

export default BrandDiscover;
