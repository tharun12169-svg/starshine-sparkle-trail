import { useState } from "react";
import { motion } from "framer-motion";
import { getMessages, markMessageRead, deleteMessage } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { Mail, MailOpen, Trash2, Eye, Copy, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

const AdminMessages = () => {
  const [messages, setMessages] = useState(getMessages());
  const [viewMsg, setViewMsg] = useState<typeof messages[0] | null>(null);

  const refresh = () => setMessages(getMessages());

  const handleMarkRead = (id: string) => {
    markMessageRead(id);
    refresh();
    toast.success("Marked as read");
  };

  const handleDelete = (id: string) => {
    deleteMessage(id);
    refresh();
    toast.success("Message deleted");
  };

  const copyWhatsApp = (number: string) => {
    navigator.clipboard.writeText(number);
    toast.success("WhatsApp number copied!");
  };

  const openWhatsApp = (number: string) => {
    const digits = number.replace(/\D/g, "");
    window.open(`https://wa.me/${digits}?text=${encodeURIComponent("Hello, we received your message on InfluenceHub.")}`, "_blank");
  };

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <div className="glow-card rounded-xl p-12 text-center">
          <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-semibold text-lg mb-2">No Messages Yet</h3>
          <p className="text-muted-foreground text-sm">Messages from the Contact page will appear here.</p>
        </div>
      ) : (
        messages.map((msg, i) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`glow-card rounded-xl p-5 ${!msg.read ? "border-l-4 border-l-primary" : ""}`}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {msg.read ? <MailOpen className="w-4 h-4 text-muted-foreground" /> : <Mail className="w-4 h-4 text-primary" />}
                  <span className="font-semibold">{msg.name}</span>
                  <span className="text-xs text-muted-foreground">{msg.email}</span>
                </div>
                {msg.whatsapp && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MessageCircle className="w-3.5 h-3.5 text-primary" />
                    <span>{msg.whatsapp}</span>
                  </div>
                )}
                {msg.subject && <div className="text-sm font-medium mb-1">{msg.subject}</div>}
                <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                <span className="text-xs text-muted-foreground mt-1 block">
                  {new Date(msg.date).toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="ghost" onClick={() => setViewMsg(msg)}><Eye className="w-4 h-4" /></Button>
                {msg.whatsapp && (
                  <>
                    <Button size="sm" variant="ghost" title="Copy WhatsApp" onClick={() => copyWhatsApp(msg.whatsapp)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" title="Contact on WhatsApp" onClick={() => openWhatsApp(msg.whatsapp)}>
                      <MessageCircle className="w-4 h-4 text-primary" />
                    </Button>
                  </>
                )}
                {!msg.read && (
                  <Button size="sm" variant="ghost" onClick={() => handleMarkRead(msg.id)}>
                    <MailOpen className="w-4 h-4" />
                  </Button>
                )}
                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(msg.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))
      )}

      <Dialog open={!!viewMsg} onOpenChange={() => setViewMsg(null)}>
        <DialogContent className="bg-surface-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display">Message from {viewMsg?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="text-sm"><span className="text-muted-foreground">Name:</span> {viewMsg?.name}</div>
            <div className="text-sm"><span className="text-muted-foreground">Email:</span> {viewMsg?.email}</div>
            {viewMsg?.whatsapp && (
              <div className="text-sm flex items-center gap-2">
                <span className="text-muted-foreground">WhatsApp:</span> {viewMsg.whatsapp}
                <Button size="sm" variant="ghost" className="h-6 px-2" onClick={() => copyWhatsApp(viewMsg.whatsapp)}>
                  <Copy className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="ghost" className="h-6 px-2" onClick={() => openWhatsApp(viewMsg.whatsapp)}>
                  <MessageCircle className="w-3 h-3 text-primary" />
                </Button>
              </div>
            )}
            {viewMsg?.subject && <div className="text-sm"><span className="text-muted-foreground">Subject:</span> {viewMsg.subject}</div>}
            <div className="text-sm"><span className="text-muted-foreground">Date:</span> {viewMsg && new Date(viewMsg.date).toLocaleString()}</div>
            <div className="border-t border-border pt-3">
              <span className="text-muted-foreground text-sm">Message:</span>
              <p className="text-sm whitespace-pre-wrap mt-1">{viewMsg?.message}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMessages;
