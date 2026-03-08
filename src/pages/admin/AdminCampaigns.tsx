import { useState } from "react";
import { motion } from "framer-motion";
import { getCampaignRequests } from "@/lib/adminStore";
import { Megaphone } from "lucide-react";

const AdminCampaigns = () => {
  const [campaigns] = useState(getCampaignRequests());

  return (
    <div className="space-y-4">
      {campaigns.length === 0 ? (
        <div className="glow-card rounded-xl p-12 text-center">
          <Megaphone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-semibold text-lg mb-2">No Campaign Requests</h3>
          <p className="text-muted-foreground text-sm">Campaign requests from brands will appear here.</p>
        </div>
      ) : (
        campaigns.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glow-card rounded-xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{c.brand}</h4>
                <p className="text-sm text-muted-foreground">{c.email}</p>
                <p className="text-sm mt-2">{c.description}</p>
                <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                  <span>Budget: {c.budget}</span>
                  <span>{new Date(c.date).toLocaleDateString()}</span>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === "new" ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                {c.status}
              </span>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default AdminCampaigns;
