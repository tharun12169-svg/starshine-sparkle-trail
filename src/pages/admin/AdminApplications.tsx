import { useState } from "react";
import { motion } from "framer-motion";
import { getApplications, approveApplication, rejectApplication } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { Check, X, Eye, UserCheck, Clock } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AdminApplications = () => {
  const [apps, setApps] = useState(getApplications());
  const [viewApp, setViewApp] = useState<typeof apps[0] | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const refresh = () => setApps(getApplications());

  const handleApprove = (id: string) => {
    approveApplication(id);
    refresh();
    toast.success("Influencer approved and added to marketplace!");
  };

  const handleReject = (id: string) => {
    rejectApplication(id);
    refresh();
    toast.success("Application rejected");
  };

  const filtered = filter === "all" ? apps : apps.filter(a => a.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["all", "pending", "approved", "rejected"] as const).map(f => (
          <Button key={f} size="sm" variant={filter === f ? "default" : "outline"}
            className={filter === f ? "gradient-bg border-0 text-primary-foreground" : "border-primary/30"}
            onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="glow-card rounded-xl p-12 text-center">
          <UserCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-semibold text-lg mb-2">No Applications</h3>
          <p className="text-muted-foreground text-sm">Influencer applications will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((app, i) => (
            <motion.div key={app.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glow-card rounded-xl p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0 overflow-hidden">
                  {app.photo ? <img src={app.photo} alt={app.name} className="w-full h-full object-cover" /> : app.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold truncate">{app.name}</h4>
                  <p className="text-xs text-muted-foreground">{app.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs gradient-bg text-primary-foreground px-2 py-0.5 rounded-full">{app.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      app.status === "pending" ? "bg-amber-500/20 text-amber-400" :
                      app.status === "approved" ? "bg-emerald-500/20 text-emerald-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div><span className="text-muted-foreground">Followers:</span> {app.followers}</div>
                <div><span className="text-muted-foreground">Engagement:</span> {app.engagement}</div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{app.bio}</p>

              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => setViewApp(app)} className="flex-1"><Eye className="w-4 h-4 mr-1" /> View</Button>
                {app.status === "pending" && (
                  <>
                    <Button size="sm" onClick={() => handleApprove(app.id)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white border-0">
                      <Check className="w-4 h-4 mr-1" /> Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleReject(app.id)} className="flex-1">
                      <X className="w-4 h-4 mr-1" /> Reject
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={!!viewApp} onOpenChange={() => setViewApp(null)}>
        <DialogContent className="bg-surface-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Application Details</DialogTitle>
          </DialogHeader>
          {viewApp && (
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-2xl overflow-hidden">
                  {viewApp.photo ? <img src={viewApp.photo} alt={viewApp.name} className="w-full h-full object-cover" /> : viewApp.name[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-base">{viewApp.name}</h4>
                  <p className="text-muted-foreground">{viewApp.email} · {viewApp.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-muted-foreground">Category:</span> {viewApp.category}</div>
                <div><span className="text-muted-foreground">Followers:</span> {viewApp.followers}</div>
                <div><span className="text-muted-foreground">Engagement:</span> {viewApp.engagement}</div>
                <div><span className="text-muted-foreground">Applied:</span> {new Date(viewApp.date).toLocaleDateString()}</div>
              </div>
              {viewApp.youtube && <div><span className="text-muted-foreground">YouTube:</span> {viewApp.youtube}</div>}
              {viewApp.youtube && <div><span className="text-muted-foreground">YouTube:</span> {viewApp.youtube}</div>}
              <div className="border-t border-border pt-3">
                <span className="text-muted-foreground">Bio:</span>
                <p className="mt-1 whitespace-pre-wrap">{viewApp.bio}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminApplications;
