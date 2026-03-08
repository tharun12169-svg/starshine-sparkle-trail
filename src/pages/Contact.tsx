import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "@/components/SectionHeading";
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { addMessage } from "@/lib/adminStore";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const digits = form.whatsapp.replace(/\D/g, "");
    if (digits.length < 10) {
      toast.error("Please enter a valid WhatsApp number (minimum 10 digits).");
      return;
    }
    addMessage({ name: form.name, email: form.email, whatsapp: form.whatsapp, subject: form.subject, message: form.message });
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", whatsapp: "", subject: "", message: "" });
  };

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading title="Get in Touch" subtitle="Have a question or ready to start a campaign? We'd love to hear from you." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.form initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Your Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Email *" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input placeholder="WhatsApp No *" type="tel" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
              <Input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              <Textarea placeholder="Your Message *" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <Button type="submit" className="w-full gradient-bg border-0 text-primary-foreground">Send Message</Button>
            </motion.form>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="space-y-8">
              <div>
                <h3 className="font-display font-semibold text-lg mb-4">Contact Information</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary" /> influencehubinsta@gmail.com</div>
                  <a href="https://wa.me/918431825949?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20InfluenceHub." target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <MessageCircle className="w-5 h-5 text-primary" /> WhatsApp: +91 84318 25949
                  </a>
                  <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary" /> +91 84318 25949</div>
                  <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /> Bangalore, India</div>
                </div>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
