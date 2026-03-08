import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send } from "lucide-react";
import {
  getInfluencerSession, getConversationPartners, getConversation,
  addChatMessage, getBrands
} from "@/lib/adminStore";

const InfluencerMessages = () => {
  const inf = getInfluencerSession();
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [, refresh] = useState(0);

  if (!inf) return null;

  const partnerIds = getConversationPartners(inf.id);
  const allBrands = getBrands();
  const partners = partnerIds.map(id => allBrands.find(b => b.id === id)).filter(Boolean);

  const messages = selectedPartner ? getConversation(inf.id, selectedPartner) : [];

  const sendMessage = () => {
    if (!msg.trim() || !selectedPartner) return;
    addChatMessage({ senderId: inf.id, senderRole: "influencer", receiverId: selectedPartner, message: msg });
    setMsg("");
    refresh(n => n + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground text-sm mt-1">Chat with brands</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[500px]">
        <div className="glow-card rounded-xl p-4 space-y-2 md:col-span-1">
          <h3 className="font-display font-semibold text-sm mb-3">Conversations</h3>
          {partners.length === 0 ? (
            <p className="text-sm text-muted-foreground">No conversations yet</p>
          ) : (
            partners.map(p => p && (
              <button key={p.id} onClick={() => setSelectedPartner(p.id)}
                className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${selectedPartner === p.id ? "gradient-bg text-primary-foreground" : "hover:bg-muted"}`}>
                <div className="font-medium">{p.brandName}</div>
                <div className={`text-xs ${selectedPartner === p.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.industry}</div>
              </button>
            ))
          )}
        </div>

        <div className="glow-card rounded-xl p-4 md:col-span-2 flex flex-col">
          {!selectedPartner ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Select a conversation to start chatting</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto space-y-3 mb-4 max-h-[400px]">
                {messages.map(m => (
                  <div key={m.id} className={`flex ${m.senderId === inf.id ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] rounded-xl px-4 py-2 text-sm ${m.senderId === inf.id ? "gradient-bg text-primary-foreground" : "bg-muted text-foreground"}`}>
                      {m.message}
                      <div className={`text-xs mt-1 ${m.senderId === inf.id ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                        {new Date(m.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type a message..."
                  onKeyDown={e => e.key === "Enter" && sendMessage()} className="bg-background border-border" />
                <Button onClick={sendMessage} className="gradient-bg border-0 text-primary-foreground"><Send className="w-4 h-4" /></Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfluencerMessages;
