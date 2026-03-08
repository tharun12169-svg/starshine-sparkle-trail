import { useState } from "react";
import { motion } from "framer-motion";
import { getInfluencerSession, updateInfluencer } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PhotoUpload from "@/components/PhotoUpload";
import { toast } from "sonner";
import { Save } from "lucide-react";

const InfluencerSettings = () => {
  const inf = getInfluencerSession();
  if (!inf) return null;

  const [form, setForm] = useState({
    name: inf.name,
    email: inf.email,
    bio: inf.bio,
    followers: inf.followers,
    engagement: inf.engagement,
    profileLink: inf.profileLink || "",
    photo: inf.photo || "",
  });

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    updateInfluencer(inf.id, form);
    // Update session
    localStorage.setItem("influencer_session", JSON.stringify({ ...inf, ...form }));
    toast.success("Profile updated successfully!");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Update your profile information</p>
      </div>

      <div className="glow-card rounded-xl p-6 max-w-2xl space-y-6">
        <div>
          <Label className="text-muted-foreground mb-3 block">Profile Photo</Label>
          <PhotoUpload
            currentPhoto={form.photo}
            name={form.name}
            size="lg"
            onPhotoChange={(url) => update("photo", url)}
            onPhotoRemove={() => update("photo", "")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground">Name</Label>
            <Input value={form.name} onChange={e => update("name", e.target.value)} className="bg-surface-card border-border" />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Email</Label>
            <Input value={form.email} disabled className="bg-surface-card border-border opacity-60" />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Followers</Label>
            <Input value={form.followers} onChange={e => update("followers", e.target.value)} className="bg-surface-card border-border" />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Engagement Rate</Label>
            <Input value={form.engagement} onChange={e => update("engagement", e.target.value)} className="bg-surface-card border-border" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground">YouTube / Social Link</Label>
          <Input value={form.profileLink} onChange={e => update("profileLink", e.target.value)} className="bg-surface-card border-border" />
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground">Bio</Label>
          <Textarea value={form.bio} onChange={e => update("bio", e.target.value)} rows={3} className="bg-surface-card border-border" />
        </div>

        <Button onClick={handleSave} className="gradient-bg border-0 text-primary-foreground">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
      </div>
    </motion.div>
  );
};

export default InfluencerSettings;
