import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, MessageSquare, Megaphone, Clock } from "lucide-react";
import { getMessages, getApplications, getApprovedInfluencers, getCampaignRequests } from "@/lib/adminStore";

const AdminDashboard = () => {
  const [messages, setMessages] = useState(getMessages());
  const [applications, setApplications] = useState(getApplications());
  const [influencers, setInfluencers] = useState(getApprovedInfluencers());
  const [campaigns, setCampaigns] = useState(getCampaignRequests());

  useEffect(() => {
    const refresh = () => {
      setMessages(getMessages());
      setApplications(getApplications());
      setInfluencers(getApprovedInfluencers());
      setCampaigns(getCampaignRequests());
    };
    refresh();
    const interval = setInterval(refresh, 3000);
    window.addEventListener("focus", refresh);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  const pendingApps = applications.filter(a => a.status === "pending");
  const unreadMessages = messages.filter(m => !m.read);

  const stats = [
    { icon: Users, label: "Total Influencers", value: influencers.length, color: "from-violet-500 to-purple-600" },
    { icon: UserCheck, label: "Pending Applications", value: pendingApps.length, color: "from-amber-500 to-orange-600" },
    { icon: MessageSquare, label: "Total Messages", value: messages.length, color: "from-blue-500 to-cyan-600" },
    { icon: Megaphone, label: "Campaign Requests", value: campaigns.length, color: "from-emerald-500 to-teal-600" },
  ];

  const recentActivities = [
    ...messages.slice(0, 3).map(m => ({ text: `New message from ${m.name}`, time: m.date, type: "message" as const })),
    ...pendingApps.slice(0, 3).map(a => ({ text: `${a.name} applied as influencer`, time: a.date, type: "application" as const })),
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glow-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                <s.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-display font-bold mb-1">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="glow-card rounded-xl p-6">
        <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" /> Recent Activity
        </h3>
        {recentActivities.length === 0 ? (
          <p className="text-muted-foreground text-sm">No recent activity. Data will appear as users interact with the site.</p>
        ) : (
          <div className="space-y-3">
            {recentActivities.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm">{a.text}</span>
                <span className="text-xs text-muted-foreground">{new Date(a.time).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
