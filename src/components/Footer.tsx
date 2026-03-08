import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg" />
              <span className="font-display font-bold text-xl text-foreground">InfluenceHub</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Connecting brands with powerful influencers through data-driven marketing campaigns.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Company</h4>
            <div className="flex flex-col gap-2">
              {[["About", "/about"], ["Case Studies", "/case-studies"], ["Pricing", "/pricing"], ["Contact", "/contact"]].map(([label, path]) => (
                <Link key={path} to={path} className="text-sm text-muted-foreground hover:text-primary transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Services</h4>
            <div className="flex flex-col gap-2">
              {[["Marketplace", "/marketplace"], ["For Brands", "/for-brands"], ["For Influencers", "/for-influencers"], ["Dashboard", "/admin"]].map(([label, path]) => (
                <Link key={path} to={path} className="text-sm text-muted-foreground hover:text-primary transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">Get the latest influencer marketing insights.</p>
            <div className="flex gap-2">
              <Input placeholder="Enter email" className="bg-background border-border text-sm" />
              <Button size="sm" className="gradient-bg border-0 text-primary-foreground shrink-0">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} InfluenceHub. All rights reserved.</span>
          <Link to="/admin-login" className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
