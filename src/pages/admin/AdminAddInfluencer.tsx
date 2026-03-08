import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addInfluencer } from "@/lib/adminStore";
import { toast } from "sonner";

const categories = ["Fashion", "Tech", "Fitness", "Gaming", "Beauty", "Travel", "Food"];
const platforms = ["Instagram", "YouTube"];

const AdminAddInfluencer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", platform: "", category: "", followers: "", engagement: "", bio: "", photo: "", profileLink: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.platform || !form.category) {
      toast.error("Please fill in required fields.");
      return;
    }
    addInfluencer(form);
    toast.success("Influencer added successfully!");
    navigate("/admin/influencers");
  };

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <form onSubmit={handleSubmit} className="glow-card rounded-xl p-6 max-w-2xl space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground">Name *</Label>
            <Input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Influencer name" className="bg-surface-card border-border" />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Email</Label>
            <Input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="Email" className="bg-surface-card border-border" />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Platform *</Label>
            <Select value={form.platform} onValueChange={v => update("platform", v)}>
              <SelectTrigger className="bg-surface-card border-border"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>{platforms.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Category *</Label>
            <Select value={form.category} onValueChange={v => update("category", v)}>
              <SelectTrigger className="bg-surface-card border-border"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Followers</Label>
            <Input value={form.followers} onChange={e => update("followers", e.target.value)} placeholder="e.g. 150K" className="bg-surface-card border-border" />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Engagement Rate</Label>
            <Input value={form.engagement} onChange={e => update("engagement", e.target.value)} placeholder="e.g. 5.2%" className="bg-surface-card border-border" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground">Profile Photo URL</Label>
          <Input value={form.photo} onChange={e => update("photo", e.target.value)} placeholder="https://..." className="bg-surface-card border-border" />
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground">Social Profile Link</Label>
          <Input value={form.profileLink} onChange={e => update("profileLink", e.target.value)} placeholder="https://instagram.com/..." className="bg-surface-card border-border" />
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground">Bio</Label>
          <Textarea value={form.bio} onChange={e => update("bio", e.target.value)} placeholder="Short bio..." rows={3} className="bg-surface-card border-border" />
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="gradient-bg border-0 text-primary-foreground">Add Influencer</Button>
          <Button type="button" variant="outline" onClick={() => navigate("/admin/influencers")}>Cancel</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AdminAddInfluencer;
